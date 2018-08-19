interface IWindow extends Window {
    SpeechRecognition?: any,
    webkitSpeechRecognition?: any,
    mozSpeechRecognition?: any,
    msSpeechRecognition?: any
}

export class SpeechToText {
    static timeout_ms: number = 3000;

    public static runSpeechToText() {
        return new Promise((resolve: Function, reject: Function) => {
            // Get the SpeechRecogntion class
            //const {SpeechRecognition}: IWindow = <IWindow>window;
            const {webkitSpeechRecognition}: IWindow = <IWindow>window; // Chrome
            //const {mozSpeechRecognition}: IWindow = <IWindow>window; // Mozilla
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
            }, this.timeout_ms);

            // Output Result
            recognition.onresult = ((event: any) => {
                resolve(event.results[0][0].transcript);
            });
        });
    }
}

