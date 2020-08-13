import React, {
    Component
} from 'react';
import {
    AuthContext
} from '../auth/AuthProvider';
import {
    ProductConsumer
} from "../../context";
import JsonResponse from './JsonResponse';
import IntegrationDetailsCard from './IntegrationDetailsCard';
import RestControls from './RestControls';

export default class RestExplorer extends Component {
    state = {
        access_token: "",
        json_response: {},
        endpoint: process.env.REACT_APP_AUTH_URL,
        loading: false,
        userinfo : {}
    }

    static contextType = AuthContext;

    componentDidMount() {
        const auth = this.context;
        auth.getUser().then(
            response => {this.setState({
                access_token: response.access_token
            }, () => {
                auth.userinfo(this.state.access_token, userinfo => {
                    console.log(userinfo);
                    this.setState(() => {return { userinfo }})
                })
            }
            )})
    }

    presetHandler = value => {
        const {
            verb,
            json_payload,
            uri
        } = value;
        this.setState(() => {
            return {
                json_payload,
                verb,
                uri
            }
        })
    }

    

    fire = () => {
        
        const { verb, uri, json_payload } = this._restControls.getState();
        console.log('control state = ',verb, uri, json_payload );
        this.setState(() => {
            return {
                loading: true
            }
        }, this.makeApiCall(verb, uri, json_payload));
    }

    makeApiCall = (verb, uri, json_payload) => {
        const url = this.state.endpoint + uri;
        const props = {
            method: verb,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.access_token
            }
        }
        console.log('call props',url,props);
        if (verb !== 'get') {
            props.body = json_payload
        }
        fetch(url, props).then(
            response => response.json()
        ).then(
            data => {
                this.setState({
                    json_response: data,
                    loading: false
                })
                console.log(data);
            },
            error => {
                this.setState({
                    json_response: error,
                    loading: false
                })
                console.log(error);

            }
        );
    }

    render() {
        return (
            <ProductConsumer>
                {
                    (value) => {
                        return (<div className="container-fluid" >
                            <div className="row" >
                                <div className="col-10 mx-auto my-3" >
                                    <IntegrationDetailsCard access_token={this.state.access_token}
                                        endpoint={this.state.endpoint}
                                        encid={value.cartEncId}
                                        userinfo={this.state.userinfo}
                                    />
                                   
                                </div>
                                <div className="col-10 mx-auto my-3" >
                                    <RestControls ref={ref => this._restControls = ref} sendCallback={this.fire} /> </div> <div className="col-10 mx-auto my-3" >
                                    <JsonResponse isloading={this.state.loading} jsonresponse={this.state.json_response} />
                                </div>
                            </div>
                        </div>
                        )
                    }
                }
            </ProductConsumer>
        )
    }
}