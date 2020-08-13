import React from 'react';
import {Link} from 'react-router-dom';

export default function CartTotals({value}) {
    const {cartSubtotal, cartTax, cartTotal, clearCart, cartEncId} = value;
    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                        
                        
                            <a className="btn btn-outline-primary text-uppercase mb-3 px-5" target="_blank" rel="noopener noreferrer" href={process.env.REACT_APP_AUTH_URL+"/ccrz__Cart?cartID="+cartEncId+"&portalUser=&store=&cclcl=en_US"} type="button">B2B Commerce Cart</a>
                        
                        <h5><span className="text-title">subtotal : </span><strong>$ {cartSubtotal.toFixed(2)}</strong></h5>
                        <h5><span className="text-title">tax : </span><strong>$ {cartTax.toFixed(2)}</strong></h5>
                        <h5><span className="text-title">total : </span><strong>$ {cartTotal.toFixed(2)}</strong></h5>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
