/* Python Code
import speech_recognition as sr

dir_to_audio = ""
output_file = "texttospeech_output.txt"

# Load Audio
r = sr.Recognizer()
audioFile = sr.AudioFile(dir_to_audio+'record.wav')
with audioFile as a:
    audio = r.listen(a, phrase_time_limit=10)

# Google Speech Recognition
out = open(output_file, 'w')
try:
    out.writeline("{AUDIOTEXT} "+str(r.recognize_google(audio)))
except sr.UnknownValueError:
    out.writeline("{ERROR} Not Understood Error.")
except sr.RequestError as e:
    out.writeline("{ERROR} Google Service Error: "+e)

out.close()
 */

package texttospeech;

import python.Python;

public class Texttospeech {
    public static void main(String[] args) throws Exception {
        Python python = new Python(".\\CLI_\\src\\main\\java\\texttospeech\\texttospeech.py", "0");
        python.run();
    }
}
