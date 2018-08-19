import * as React from "react";
import Axios from "axios";

import TextDisplay from "./textDisplay";

import "./App.less"

interface AppState {
  response: String;
}

export default class App extends React.Component<{}, AppState> {

  constructor(props: any){
    super(props);

    this.state = {
      response: null
    }
    
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    Axios.post("/api/")
      .then((resp) => {
        console.log(resp);
        this.setState({
          response: resp.data.message
        });
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="pageWrapper">
        <div className="titleBar"> ☠️ Swashbuckle</div>
        <div onClick={this.handleClick}>
          Click me
        </div>
        <TextDisplay placeholder={"Click the button to run a script"} content={this.state.response}/>
      </div>
    );
  }
}