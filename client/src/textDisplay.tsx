import * as React from "react";

interface TextDisplayProps {
  placeholder: String;
  content: String; 
}

interface TextDisplayState {
  content: String;
}

export default class TextDisplay extends React.Component<TextDisplayProps, TextDisplayState>{

  constructor(props: TextDisplayProps){
    super(props);

    this.state = {
      content: this.props.placeholder
    }
  }

  componentDidUpdate(prevProps: any){
    // console.log("content: " + this.props.content)
    // console.log("placeholder: " + this.props.placeholder)
    // console.log("content prev: " + prevProps.content)
    // console.log("placeholder prev: " + prevProps.placeholder)
    if (this.props.content !== prevProps.content) {
      if(this.props.content == null){
        this.setState({
          content: this.props.placeholder
        })
      } else {
        this.setState({
          content: this.props.content
        })
      }
    }
  }

  render(){
    return(
      <div className="wrapper">
        {this.state.content}
      </div>
    )
  }
}