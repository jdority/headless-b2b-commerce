import React, { Component } from 'react'

export default class RestPresets extends Component {

    fetchProductsPreset = () => {
        this.props.handler({
            verb: "get",
            uri: "/services/apexrest/ccrz/ccproduct/v9/fetch",
            json_payload: ""
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="form-group">
                    <label>presets</label>
                    <div>
                        <PresetButton label="Fetch Products" click={this.fetchProductsPreset} />
                        <PresetButton label="Fetch Carts" click={this.fetchProductsPreset} />
                        <PresetButton label="Add Item to Cart" click={this.fetchProductsPreset} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function PresetButton(props) {
    return (
        <React.Fragment>
            <button className="btn btn-secondary mx-1 my-1" type="button" onClick={props.click}>{props.label}</button>
        </React.Fragment>
    )
}