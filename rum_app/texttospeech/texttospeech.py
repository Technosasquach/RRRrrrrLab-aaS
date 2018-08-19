import speech_recognition as sr
import os

def text_to_speech():
	dir_to_audio = ".\\CLI_\\src\\main\\java\\texttospeech\\"
	output_file = ".\\CLI_\\src\\main\\java\\texttospeech\\texttospeech_output.txt"

	# Load Audio
	r = sr.Recognizer()
	audioFile = sr.AudioFile(dir_to_audio+'record.wav')
	with audioFile as a:
		audio = r.listen(a, phrase_time_limit=10)

	# Google Speech Recognition
	out = open(output_file, 'w')
	try:
		out.write("{AUDIOTEXT} "+str(r.recognize_google(audio)))
	except sr.UnknownValueError:
		out.write("{ERROR} Not Understood Error.")
	except sr.RequestError as e:
		out.write("{ERROR} Google Service Error: "+e)

	out.close()

text_to_speech()