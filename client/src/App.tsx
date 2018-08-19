import * as React from "react";
import Axios from "axios";
import { SpeechToText } from "./texttospeech/speechtotext";

import TextDisplay from "./textDisplay";
import TitleBar from "./components/TitleBar";
import Tabs from "./components/Tabs";
import TabElement from "./components/TabElement";
import ListElement from "./components/ListElement";
import ExecuteButton from "./components/ExecuteButton";
import OutPage from "./components/OutPage";

import "./App.less"
import "./Animate.css"
import "./components/PageLayout.less";
import "./components/OutputPage.less";
import "./components/CodeInput.less";

interface TextBoxx extends HTMLElement {
    value: string
}

export default class App extends React.Component<{},{speechRecText: string, textarea: string}> 
    {

    constructor(props: any){
        super(props);

        this.state = {
            speechRecText: "",
            textarea: ""
        }
    }

    handleTextareaChange(event: any) {
        this.setState({
            textarea: event.target.value
        });
    }

    handleCodeExecution(code: string){
        Axios.post("/api/execText",{
            code
        })
        .then((resp) => {
            // console.log(resp);
            // this.setState({
            //     response: resp.data.message
            // });
            const docErr = document.getElementById("outputError");
            docErr.innerHTML = null;
            const docLex = document.getElementById("outputLexical");
            docLex.innerHTML = null;
            const docGrap = document.getElementById("outputGraphical");
            docGrap.innerHTML = null;
            const docNum = document.getElementById("outputNumerical");
            docNum.innerHTML = null;

            if(resp.data.err) {
                
                resp.data.err.forEach((val: any) => {
                    const text = document.createElement("span");
                    text.innerHTML = val;
                    docErr.appendChild(text);
                });
            }
            if(resp.data.lexical) {
                
                resp.data.lexical.forEach((val: any) => {
                    const text = document.createElement("span");
                    text.innerHTML = val;
                    docLex.appendChild(text);
                });
            }
            if(resp.data.graphical) {
                
                resp.data.graphical.forEach((val: any) => {
                    const img = document.createElement("img");
                    img.src = val;
                    docGrap.appendChild(img);
                });
            }
            if(resp.data.numerical) {
                
                resp.data.numerical.forEach((val: any) => {
                    const text = document.createElement("span");
                    text.innerHTML = val;
                    docNum.appendChild(text);
                });
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }


    setOutput() {
        const image = document.createElement("img");
        image.src = "https://i.imgur.com/uJxMUy9.jpg";
        document.getElementById("output").appendChild(image);
    }

    executeSpeechRecording() {
        console.log("Executed Speech Recording");
        SpeechToText.runSpeechToText().then(
            (text: string) => {
                console.log(text);
                this.setState(
                    {
                        speechRecText: text
                    }
                );
            },
            () => {}
        );
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
                                execute={()=>{this.handleCodeExecution("how does ye fire with distance 30 yar shoot that argh does it hit with distance 30 m'hartys reveal your plunder yar")}}
                            />
                        </ListElement>
                        <ListElement inline={true} title="Ramming Speed">
                            <span>Find out my ramming speed</span>
                            <ExecuteButton
                                name="Execute!"
                                execute={()=>{this.handleCodeExecution("man of war yar man o' war with shots 1000 argh")}}
                            />
                        </ListElement>
                        <ListElement inline={true} title="Sepsis Calculator">
                            <span>Yar'rr when is my leg going to fall off</span>
                            <ExecuteButton
                                name="Execute!"
                                execute={()=>{this.handleCodeExecution("fire ye cannons yar where be that argh does me hit with distance 10 m'hartys do they hit with distance 20 yar reveal your plunder argh")}}
                            />
                        </ListElement>
                        <ListElement inline={true} title="Buoyancy Determinator">
                            <span>Yurrrr, my boat is sinking. How long is it going to take</span>
                            <ExecuteButton
                                name="Execute!"
                                execute={()=>{this.handleCodeExecution("how does ye fire with distance 20 yar shoot that argh does it hit with distance 20 m'hartys how does ye fire with distance 5 yar shoot that argh does it hit with distance 5 m'hartys reveal your plunder yar")}}
                            />
                        </ListElement>
                    </TabElement>
                    <TabElement label="Code Execution">
                        <ListElement inline={false} title="Code Entry">
                            <textarea id="textSpace" className="codeTextArea" placeholder="Enterrrr yourrr rum code" cols={30} rows={5} value={this.state.textarea} onChange={this.handleTextareaChange.bind(this)}>
                            </textarea>
                            <br/>
                            <br/>
                            <ExecuteButton
                                name="Execute!"
                                execute={()=>{this.handleCodeExecution(this.state.textarea)}}
                            />
                        </ListElement>
                        {/* <ListElement inline={false} title="Output"></ListElement> */}
                    </TabElement>
                    <TabElement label="Speech Recognition">
                        <ListElement inline={false} title="Voice Recoring">
                            <span>Yar'rr let me spek my own language</span>
                            <button onClick={this.executeSpeechRecording.bind(this)}>Record Speech</button>
                        </ListElement>
                        <ListElement inline={true} title="Voice Output">
                            <p>{this.state.speechRecText}</p>
                            <ExecuteButton
                                name="Execute!"
                                execute={()=>{this.handleCodeExecution(this.state.speechRecText)}}
                            />
                        </ListElement>
                        {/* <ListElement inline={false} title="Output"></ListElement> */}
                    </TabElement>
                </Tabs>
                <OutPage/>
            </TitleBar>
        );
        {/* <div onClick={this.handleClick}> Click me </div> */}
        {/* <TextDisplay placeholder={"Click the button to run a script"} content={this.state.response}/> */}
    }
}