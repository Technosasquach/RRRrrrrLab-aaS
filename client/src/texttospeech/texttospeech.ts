interface IWindow extends Window {
    SpeechRecognition?: any,
    webkitSpeechRecognition?: any,
    mozSpeechRecognition?: any,
    msSpeechRecognition?: any
}

export class TextToSpeech {
    spRek: any = undefined;
    timeout_ms: number = 10000;

    public static runSpeechToText(callback: Function) {
        // Get the SpeechRecogntion class
        //const {SpeechRecognition}: IWindow = <IWindow>window;
        const {webkitSpeechRecognition}: IWindow = <IWindow>window; // Chrome
        const {mozSpeechRecognition}: IWindow = <IWindow>window; // Mozilla
        //const {msSpeechRecognition}: IWindow = <IWindow>window;
        var recognition = new webkitSpeechRecognition();

        // Configuration
        //recognition.abort();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.continuous = true;

        // Record
        recognition.start();
        //console.log(recognition);
        window.setTimeout(() => {
            recognition.stop()
        }, timeout_ms);

        // Output Result
        recognition.onresult = ((event) => {
            console.log(event.results[0][0].transcript);
            return event.results[0][0].transcript;
        });
    }
}

