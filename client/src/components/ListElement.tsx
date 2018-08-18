import * as React from "react";

import "./ListElement.less";

export default class ListElement extends React.Component<{title: string, inline: boolean},{}>{
    render(){
        return(
            <div className="listElement animated fadeIn">
                <span className="title">{this.props.title}</span>
                <div className={this.props.inline ? "container" : ""}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}