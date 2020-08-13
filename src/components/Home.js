import React, { Component } from 'react';
import styled from 'styled-components'; 

export default class Home extends Component {
    render() {
        return (
            <Hero>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h1 className="text-justify">Welcome to Cirrus</h1>
                            <h3><span>Headless B2B Commerce Demo Site</span></h3><br/>
                            <h5><span>This is a simple headless B2B commerce site to illustrate how an headless commerce site would work with Salesforce B2B Commerce</span></h5><br/>
                            <p><button className="btn btn-primary btn-large">Learn more »</button></p>
                        </div>
                    </div>
                </div>
            </Hero>
        )
    }
}

const Hero = styled.section`
width:100%;
  height:500px;
  background: url('/img/herobackground.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size:cover;
  background-attachment: fixed;
  h1 {
    color:white;
    text-shadow:2px 2px #333;
    padding-left:0.5rem;
  },
  h3 span {
    color:lightgreen;
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    text-shadow:2px 2px #333;
  }
  h5 span {
    color:lightgreen;
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    background-color: rgba(0,0,255,0.6);
    text-shadow:2px 2px #333;
  }
`;