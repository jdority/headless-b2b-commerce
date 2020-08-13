import React, { Component } from 'react';

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: {},
        cart: [],
        ccproduct: [],
        cartEncId: "",
        cartId: "",
        ccproductLoaded: false,
        modalOpen: false,
        modalProduct: {},
        cartSubtotal: 0,
        cartTax: 0,
        cartTotal: 0,
        changingCart : false,
    }

    makeAPIcall = (auth, verb, uri, body, callback) => {
        auth.getUser().then(user => {
            const url = process.env.REACT_APP_AUTH_URL + uri;
            const props = {
                method: verb,
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.access_token
                },
                body : JSON.stringify(body)
            }
            if (verb.toUpperCase() === 'GET') {
                delete props.body;
            }
            console.log("makeAPICall: ", verb, url, props);

            fetch(url, props).then(
                response => response.json()
            ).then(callback)
        });
    }

    createCart = (auth, callback) => {
        const body = {
            name: "My Demo Cart",
            cartType: "Cart",
            storefront: "Default Storefront",
            note: "Create by headless site"
        }
        if (callback === null)
            callback = () => { }

        this.makeAPIcall(auth, 'POST', '/services/apexrest/ccrz/cccart/v9/create', body,
            data => {
                console.log("add cart response", data);
                this.setState(() => {
                    return {
                        cartId: data.cartId,
                        cartEncId: data.cartEncId
                    }
                }, () => { callback() })
            });
        console.log("createCart called", this.state.ccproductLoaded);

    }

    deleteCart = (auth, callback) => {
        const body = {
            ENCID: this.state.cartEncId
        }
        if (callback === null)
            callback = () => { }

        this.makeAPIcall(auth, 'POST', '/services/apexrest/ccrz/cccart/v9/delete', body,
            data => {
                console.log("add cart response", data);
                this.setState(() => {
                    return {
                        cartId: "",
                        cartEncId: ""
                    }
                }, () => { callback() }
                )
            });
        console.log("deleteCart called");
    }

    //https://cloudcraze.atlassian.net/wiki/spaces/CCRZDOCS48/pages/377226742/Cart+REST+API#CartRESTAPI-create
    addto = (auth, items, callback) => {
        //items can be an array of items.
        const body = {
            ENCID: this.state.cartEncId,
            LINEITEMS: items
        }
        if (callback === undefined)
            callback = () => { }

        this.makeAPIcall(auth, 'POST', '/services/apexrest/ccrz/cccart/v9/addto', body,
            data => {
                console.log("addto response", data);
                callback();
                
                this.setState(() => {
                    return {
                        changingCart : false
                    };
                })
            });
        console.log("addto called");
    }

    removefrom = (auth, items, callback) => {
        //items can be an array of items.
        const body = {
            ENCID: this.state.cartEncId,
            LINEITEMS: items
        }
        if (callback === undefined)
            callback = () => { }

        this.makeAPIcall(auth, 'POST', '/services/apexrest/ccrz/cccart/v9/removefrom', body,
            data => {
                console.log("removefrom response", data);
                callback()
            });
        console.log("removefrom called");
    }


    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    }

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return { detailProduct: product }
        });
    }

    addToCart = (id,auth) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        let newCartNeeded = (this.state.cart.length === 0)
        this.setState(() => {
            return {
                products: tempProducts,
                cart: [...this.state.cart, product]
            };
        }, () => { 
            this.addTotals();
            if (newCartNeeded) {
                this.createCart(auth, () => {
                    this.addto(auth,
                        [{
                            SKU : id,
                            QUANTITY : 1
                        }]
                    )
                })
            } else {
                this.addto(auth,
                    [{
                        SKU : id,
                        QUANTITY : 1
                    }]
                )
            }
         });


    }

    openModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return { modalProduct: product, modalOpen: true }
        })
    }

    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false }
        })
    }

    increment = (id,auth) => {
        if (this.state.changingCart) return;
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count + 1;
        product.total = product.count * product.price;
        this.setState(() => {
            return {
                cart: [...tempCart],
                changingCart : true
            }
        }, () => {
            this.addTotals();
            this.addto(auth,[{
                    SKU : id,
                    QUANTITY : 1
                }]
            )
        })

    }

    decrement = (id,auth) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count - 1;
        if (product.count === 0) {
            this.removeItem(id);
        } else {
            product.total = product.count * product.price;
            this.setState(() => {
                return {
                    cart: [...tempCart]
                }
            }, () => {
                this.addTotals();
                //bizarrely, you can add quantity to a cart, but not remove it
                this.removefrom(auth,[{
                        SKU : id,
                        QUANTITY : 1
                    }], () => {
                        console.log("**** too fast? ****");
                    this.addto(auth, [{
                        SKU : id,
                        QUANTITY : product.count
                    }])
                }
                )
            })
        }
    }

    removeItem = (id,auth) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id !== id);
        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        let quantityToDelete = removedProduct.count;
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;
        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            }
        }, () => { 
            this.addTotals();
            this.removefrom(auth,[{
                    SKU : id,
                    QUANTITY : quantityToDelete
                }]
            ) })
    }

    clearCart = (auth) => {
        this.setState(() => {
            return {
                cart: []
            }
        }, () => {
            this.setProducts();
            this.addTotals();
            this.deleteCart(auth,() => {});
        })
    }

    addTotals = () => {
        let subtotal = 0;
        this.state.cart.map(item => (subtotal += item.total));
        const tempTax = subtotal * 0.075;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subtotal + tax;
        this.setState(() => {
            return {
                cartSubtotal: subtotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }

    transformCCProducts = () => {
        if (!this.state.ccproductLoaded) return;
        console.log("ccproduct:", this.state.ccproduct);
        let ccproductList = [...this.state.ccproduct.productList];
        const tempProducts = ccproductList.map(item => {

            let img = "";
            if (item.EProductMediasS) {
                let images = item.EProductMediasS.filter(i => i.mediaType === "Product Image");
                if (images.length > 0) {
                    img = images[0].URI;
                }
            }

            return {
                id: item.SKU,
                title: item.sfdcName,
                img: img,
                info: item.shortDesc,
                price: item.price,
                inCart: false,
                count: 0,
                total: 0
            }
        })
        this.setState(() => {
            return {
                products: tempProducts
            }
        });

    }

    loadProductsFromSalesforce = (auth, callback) => {
        console.log("loadeProductsFromSalesforce called", this.state.ccproductLoaded);
        if (this.state.ccproductLoaded) {
            callback();
            return;
        }
        console.log("load products from salesforce");
        auth.getUser().then(user => {
            const url = process.env.REACT_APP_AUTH_URL + '/services/apexrest/ccrz/ccproduct/v9/fetch?ISPRICED=true';
            const props = {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.access_token
                }
            }
            console.log(url, props);

            fetch(url, props).then(
                response => response.json()
            ).then(
                data => {
                    console.log("setting state!");
                    this.setState(() => {
                        return {
                            ccproduct: data,
                            ccproductLoaded: true
                        }
                    }, () => { this.transformCCProducts(); callback() }
                    )
                })
        });
    }


    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart,
                loadProductsFromSalesforce: this.loadProductsFromSalesforce
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer, ProductContext };