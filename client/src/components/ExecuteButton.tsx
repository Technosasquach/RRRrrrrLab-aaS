import * as React from "react";

import "./ExecuteButton.less";

export default class ExecuteButton extends React.Component<{name: string, execute: any},{}>{
    render(){
        return(
            <a className="executeButton" onClick={this.props.execute}>{this.props.name}</a>
        )
    }
}