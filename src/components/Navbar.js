import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonContainer } from './Button';
import { AuthConsumer } from './auth/AuthProvider';

export default class Navbar extends Component {
    render() {
        return (
            <AuthConsumer>
                {(value) => {
                    return (
                        <FullWrapper>
                            <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm ">
                                <Link to="/">
                                    <img src="/img/cirruslogo.png" alt="store" className="navbar-brand img-fluid logo"></img>
                                </Link>
                                <div className="d-none d-lg-block d-xl-block">
                                    <ul className="navbar-nav align-items-center">
                                        {value.isAuthenticated() ? (<li className="nav-item ml-5 text-truncate"><Link to="/products" className="nav-link">products</Link></li>) : null}
                                        {value.isAuthenticated() ? (<li className="nav-item ml-5 text-truncate"><Link to="/rest" className="nav-link">REST API</Link></li>) : null}
                                    </ul>
                                </div>
                                {value.isAuthenticated() ? (
                                    <Link to="/cart" className="ml-auto">
                                        <ButtonContainer>
                                            <i className="fas fa-cart-plus" />
                                        </ButtonContainer>
                                    </Link>
                                ) : null}
                                {value.isAuthenticated() ? (
                                    <LoginButton onClick={() => { value.logout() }}><i className="fa fa-sign-out" /></LoginButton>
                                ) : (
                                        <LoginButton className="ml-auto" onClick={() => { value.signinRedirect() }}><i className="fa fa-sign-in" /></LoginButton>
                                    )
                                }
                            </NavWrapper>
                            <NavWrapper className="navbar navbar-expand d-block d-sm-block d-md-block d-lg-none d-xl-none">
                                <ul className="navbar-nav align-items-center">
                                    {value.isAuthenticated() ? (<li className="nav-item text-truncate"><Link to="/products" className="nav-link">products</Link></li>) : null}
                                    {value.isAuthenticated() ? (<li className="nav-item ml-5 text-truncate"><Link to="/rest" className="nav-link">REST API</Link></li>) : null}
                                </ul>
                            </NavWrapper>
                        </FullWrapper>
                    )
                }}
            </AuthConsumer>
        )
    }
}

const FullWrapper = styled.div`
    border-bottom : solid 2px;
    border-color : var(--darkBlue);
`

const NavWrapper = styled.nav`
    background: var(--mainWhite);
    .nav-link {
        color : var(--darkBlue)!important;
        font-size:1.3rem;
        text-transform:capitalize;
    }
    .logo {
        max-width: 200px;
    }
`

export const LoginButton = styled.button`
    text-transform:capitalize;
    font-size:1.4rem;
    background:transparent;
    border:0.05rem solid var(--lightBlue);
    border-color:var(--lightBlue);
    color:var(--lightBlue);
    border-radius: 0.5rem;
    padding: 0.2rem 0.5rem;
    cursor:pointer;
    margin:0.2rem 0.5rem 0.2rem 0;
    transition:all 0.5s ease-in-out;
    &:hover {
        background:var(--lightBlue);
        color: var(--mainBlue);
    }
    &:focus {
        outline:none;
    }
`