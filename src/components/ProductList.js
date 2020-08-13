import React, { Component } from 'react'
import Product from './Product';
import Title from './Title';
import { ProductConsumer, ProductContext } from '../context';
import { AuthConsumer } from './auth/AuthProvider';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";

var authCtx = null;

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

//https://www.npmjs.com/package/react-spinners

export default class ProductList extends Component {

    static contextType = ProductContext;

    state = {
        loading: true
    }

    componentDidMount() {
        const ctx = this.context;
        
        if (!ctx.ccproductLoaded) {
            ctx.loadProductsFromSalesforce(authCtx, () => {
                console.log("products loaded");
                this.setState(() => {
                    return { loading: false }
                })
            });
        } else {
            this.setState(() => {
                return { loading: false }
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="energy" title="products"></Title>
                        <ClipLoader
                            css={override}
                            size={150}
                            color={"#123abc"}
                            loading={this.state.loading}
                        />
                        <AuthConsumer>
                            {auth => {
                                authCtx = auth;
                                return (
                                    <div className="row">
                                    <ProductConsumer>
                                        {(value) => {
                                            return value.products.map(product => {
                                                return <Product key={product.id} product={product}></Product>
                                            })
                                        }}
                                    </ProductConsumer>
                                    </div>
                                )
                            }
                            }
                        </AuthConsumer>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
