import * as React from "react";

import "./TitleBar.less";

export default class TabElement extends React.Component<{label: string},{}>{
    render(){
        return(
            <div className="inputElement">
                {this.props.children}
            </div>
        )
    }
}