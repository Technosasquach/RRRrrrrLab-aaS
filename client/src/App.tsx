import * as React from "react";

import Axios from "axios";

export default class App extends React.Component {

  handleClick(){
    Axios.post("/api/")
      .then((resp) => {
        console.log(resp)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <div onClick={this.handleClick}>
          Click me
        </div>
        <div>
          Your returned values is:
        </div>
      </div>
    );
  }
}