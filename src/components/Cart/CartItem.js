import React from 'react';
import { AuthConsumer } from '../auth/AuthProvider';


export default function CartItem({ item, value }) {
    const { id, title, img, price, total, count } = item;
    const { increment, decrement, removeItem } = value;

    return (
        <AuthConsumer>
            {auth => {
                return (
                    <div className="row my-2 text-capitalize text-center">
                        <div className="col-10 mx-auto col-lg-2">
                            <img src={img} alt="product" style={{ width: '5rem', height: '5rem' }} className="img-fluid"></img>
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                            <span className="d-lg-none">product : </span>{title}
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                            <span className="d-lg-none">price : </span>{price.toFixed(2)}
                        </div>

                        <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                            <div className="d-flex justify-content-center">
                                <div>
                                    <span className="btn btn-black mx-1" onClick={() => decrement(id,auth)}>-</span>
                                    <span className="btn btn-black mx-1">{count}</span>
                                    <span className="btn btn-black mx-1" onClick={() => increment(id,auth)}>+</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                            <div className="cart-icon">
                                <i className="fas fa-trash" onClick={() => { removeItem(id,auth) }}></i>
                            </div>
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                            <strong>item total : ${total.toFixed(2)} </strong>
                        </div>

                    </div>
                )
            }}
        </AuthConsumer>
    )
}
