import * as React from "react";
import * as IO from "socket.io-client";

import "./ProcessMonitor.less";

export default class ProcessMonitor extends React.Component<{},{console: string[]}> {

    socket: any = undefined;

    constructor(props: any) {
        super(props);

        this.state = {
            console: [
                `RUM Executional System Log 1457-2018© | Output Level: Yeet...`
            ]
        }

        this.socket = IO();
        this.socket.on("broadcast", (object: any) => {
            this.addToConsole(object.msg);
        });
    }

    addToConsole(text: string) {
        this.setState({
            console: [
                ...this.state.console,
                text
            ]
        });
    }

    componentDidUpdate() {
        document.getElementById("processMonitor").scrollTo(0,document.getElementById("processMonitor").scrollHeight);
        document.getElementById("termText").style.top = document.getElementById("processMonitor").scrollHeight - 150 + "px";
    }

    render() {
        return (
            <div id="processMonitor" className="processMonitor animated fadeInUp">
                <div id="termText"><span>Yar'rr Terminal Window™®</span></div>
                {this.state.console.map((val: string, index: number) => {
                    return(
                        <span>{index + ". > " + val}</span>
                    )
                })}
            </div>
        )
    }
}