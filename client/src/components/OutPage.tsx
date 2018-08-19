import * as React from "react";
import * as IO from "socket.io-client";

import "./OutputPage.less";

export default class OutPage extends React.Component {

    render() {
        return (
            <div className="division outputPage">
                <h2>Output</h2>
                <div id="output">
                    <div id="outputError">
                    </div>
                    <div id="outputLexical">
                    </div>
                    <div id="outputNumerical">
                    </div>
                    <div id="outputGraphical">
                    </div>
                </div>
            </div>
        )
    }
}