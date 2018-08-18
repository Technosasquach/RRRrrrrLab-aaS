import * as React from "react";
import Axios from "axios";

import TextDisplay from "./textDisplay";
import TitleBar from "./components/TitleBar";
import Tabs from "./components/Tabs";
import TabElement from "./components/TabElement";
import ListElement from "./components/ListElement";
import ExecuteButton from "./components/ExecuteButton";

import "./App.less"
import "./Animate.css"
import "./components/PageLayout.less";
import "./components/OutputPage.less";
import "./components/CodeInput.less";

interface AppState {
    response: String;
}

export default class App extends React.Component
    // <{}, AppState> 
    {

    // constructor(props: any){
    //     super(props);

    //     this.state = {
    //         response: null
    //     }
        
    //     this.handleClick = this.handleClick.bind(this);
    // }

    // handleClick(){
    //     Axios.post("/api/")
    //     .then((resp) => {
    //         console.log(resp);
    //         this.setState({
    //         response: resp.data.message
    //         });
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // }

    setOutput() {
        const image = document.createElement("img");
        image.src = "https://i.imgur.com/uJxMUy9.jpg";
        document.getElementById("output").appendChild(image);
    }

    render() {
        return (
            <TitleBar>
                <Tabs>
                    <TabElement label="Pre-coded">
                        <ListElement inline={true} title="Cannonball Trajectory Calculator">
                            <span>Yar'rr calculate me cannon trjectorise!</span>
                            <ExecuteButton
                                name="Execute!"
                                execute={()=>{console.log("Clicked Button"); this.setOutput()}}
                            />
                        </ListElement>
                        <ListElement inline={true} title="Ramming Speed">
                            <span>Find out my ramming speed</span>
                            <ExecuteButton
                                name="Execute!"
                                execute={()=>{console.log("Clicked Button"); this.setOutput()}}
                            />
                        </ListElement>
                        <ListElement inline={true} title="Sepsis Calculator">
                            <span>Yar'rr when is my leg going to fall off</span>
                            <ExecuteButton
                                name="Execute!"
                                execute={()=>{console.log("Clicked Button"); this.setOutput()}}
                            />
                        </ListElement>
                        <ListElement inline={true} title="Buoyancy Determinator">
                            <span>Yurrrr, my boat is sinking. How long is it going to take</span>
                            <ExecuteButton
                                name="Execute!"
                                execute={()=>{console.log("Clicked Button"); this.setOutput()}}
                            />
                        </ListElement>
                    </TabElement>
                    <TabElement label="Code Execution">
                        <ListElement inline={false} title="Code Entry">
                            <textarea className="codeTextArea" placeholder="Enterrrr yourrr rum code" cols={30} rows={5}>
                            </textarea>
                            <br/>
                            <br/>
                            <ExecuteButton
                                name="Execute!"
                                execute={()=>{console.log("Clicked Button"); this.setOutput()}}
                            />
                        </ListElement>
                        {/* <ListElement inline={false} title="Output"></ListElement> */}
                    </TabElement>
                </Tabs>
                <div className="division outputPage">
                    <h2>Output</h2>
                    <div id="output">
                    </div>
                </div>
            </TitleBar>
        );
        {/* <div onClick={this.handleClick}> Click me </div> */}
        {/* <TextDisplay placeholder={"Click the button to run a script"} content={this.state.response}/> */}
    }
}