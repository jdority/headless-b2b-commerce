import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import { Inspector } from 'react-inspector';

const override = css`
display: block;
margin: 0 auto;
border-color: red;
`;

const responseDiv = {
minHeight : "300px"
}


export default function JsonResponse(props) {
    return (
        <React.Fragment>
            <div className="card" >
                <div className="card-body" style={responseDiv}>
                    <h5 className="card-title">JSON Response</h5>
                    {props.isloading ? (
                        <ClipLoader css={override} size={150} color={"#123abc"} />) :
                        (<Inspector data={props.jsonresponse} />)}
                </div>
            </div>
        </React.Fragment>
    )
}
