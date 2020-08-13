import React from 'react';

export default function IntegrationDetailsCard(props) {
    return (
        <React.Fragment>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title text-capitalize">integration details</h5>
                </div>
                <ul className="list-group list-group-flush" >
                    <Item name="access token" value={props.access_token} />
                    <Item name="rest endpoint" value={props.endpoint} />
                    <Item name="encrypted cart id" value={props.encid !== "" ? props.encid : "No cart created"} />
                </ul>
                <div className="card-body">
                    <a target="_blank" rel="noopener noreferrer" href="https://cloudcraze.atlassian.net/wiki/spaces/B2BDOCS410/pages/890405031/Available+REST+APIs">API documentation</a>
                    &nbsp;&nbsp;
                    <a target="_blank" rel="noopener noreferrer" href={process.env.REACT_APP_AUTH_URL+"/ccrz__MyAccount?viewState=viewAccount"}>{props.userinfo.name}</a>
                </div>
            </div>
        </React.Fragment>
    )
}

function Item(props) {
    return (
        <li className="list-group-item text-break">{props.name}<br />{props.value}</li>
    )
}

