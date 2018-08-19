import * as React from "react";

import "./TitleBar.less";
import ProcessMonitor from "./ProcessMonitor";

export default class TitleBar extends React.Component<{},{showProcess: boolean}>{

    constructor(props: any) {
        super(props);
        this.state = {
            showProcess: false
        }
    }

    readonly changeProcessShowing = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Changed processor monitor from " + this.state.showProcess + " to " + !this.state.showProcess);
        this.setState({showProcess: !this.state.showProcess})
    };

    render(){
        return(
            <div>
                <nav>
                    <span>☠️ Swashbuckle</span>
                    <button 
                        className={this.state.showProcess ? 
                            "open processMonitorButton" : "closed processMonitorButton" 
                        } 
                        onClick={this.changeProcessShowing}
                    >
                        🖥️ 
                        {/* : {!this.state.showProcess ? "❎" : "✅"} */}
                    </button>
                </nav>
                <div 
                    className={this.state.showProcess ? 
                        "pageWrapper full" : "pageWrapper full" 
                    } >
                    {this.props.children}
                </div>
                { this.state.showProcess ? <ProcessMonitor>
                    <span>Hello World</span>
                </ProcessMonitor> : null }
            </div>
        )
    }
}