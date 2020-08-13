import React, { Component } from 'react';
import RestPresets from './RestPresets';

export default class RestControls extends Component {
    state = {
        verb: "get",
        uri: "/services/apexrest/ccrz/ccproduct/v9/fetch",
        json_payload: ""
    }

    getState = () => this.state;

    changeVerb = e => {
        this.setState({ verb: e.target.value })
    }

    changeURI = e => {
        this.setState({ uri: e.target.value })
    }

    changePayload = (e) => {
        this.setState({ json_payload: e.target.value })
    }

    componentDidMount() {
        this.fire = this.props.sendCallback;
    }

    presetHandler = value => {

    }
    render() {
        return (
            <React.Fragment>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">REST Explorer</h5>
                        <div className="row">
                            <div className="col-12 col-md-6">
                            <div className="form-group">
                            <label htmlFor="verbs">http verb</label>
                            <div id="verbs">
                                <RestRadioButton verb="get" checked={this.state.verb === 'get'} handler={this.changeVerb} />
                                <RestRadioButton verb="post" checked={this.state.verb === 'post'} handler={this.changeVerb} />
                                <RestRadioButton verb="patch" checked={this.state.verb === 'patch'} handler={this.changeVerb} />
                                <RestRadioButton verb="delete" checked={this.state.verb === 'delete'} handler={this.changeVerb} />
                            </div>
                        </div>

                            </div>
                            <div className="col-12 col-md-6">
                            <RestPresets handler={this.presetHandler} />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="uri">rest uri</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" id="uri" value={this.state.uri} onChange={this.changeURI}></input>
                                <div className="input-group-append">
                                    <button type="button" className="btn btn-outline-secondary float-right" onClick={this.fire}>Send</button>
                                </div>
                            </div>
                        </div>
                        {
                            this.state.verb !== 'get' ? (
                                <div className="form-group">
                                    <label htmlFor="jsonpayload">JSON Payload</label>
                                    <textarea className="form-control" id="jsonpayload" rows="3" value={this.state.json_payload} onChange={this.changePayload}></textarea>
                                </div>
                            ) : null
                        }
                    </div>
                </div>

            </React.Fragment >
        )
    }
}

function RestRadioButton(props) {
    return (
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name={props.verb} id={props.verb} value={props.verb} checked={props.checked} onChange={props.handler} />
            <label className="form-check-label" htmlFor={props.verb}>{props.verb}</label>
        </div>
    )
}
