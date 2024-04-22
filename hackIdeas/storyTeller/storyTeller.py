import google.generativeai as genai
import re
import os
from imageCreator import generateImage
from dotenv import load_dotenv
load_dotenv()

genai.configure(api_key=f"{os.getenv('GEMINI_API_KEY')}")
model = genai.GenerativeModel('gemini-1.5-pro-latest')


def generateContent(prompt, onlyContent = True):
    response = model.generate_content(prompt)
    responseText = response.candidates[0].content.parts[0].text
    # Extract Images from placeholders and generate images
    imageDescriptions = re.findall('\[Image:.*\]', responseText)
    print(imageDescriptions)
    for imageDescription in imageDescriptions:
        description = imageDescription[8:len(imageDescription)-2]
        print(description)
        generateImage(description=description)
    if(onlyContent):
        print(response.candidates[0].content.parts[0].text)
    else:
        print(response)

genre = 'science fiction'
ageRangeYears = '5-10'
lengthWords = '1000'

prompt=f'''
You are an amazing storyteller in the likes of Roald Dahl, Charles Dickens, William Shakespeare, JK Rowling, Steven Spielberg, Hans Christian Andersen, Lewis Carroll, Walt Disney, Enid Blyton, and J.R.R Tolkien.
Generate a story using your excellent story telling skills in the {genre} genre for the target reader audience in the age range of {ageRangeYears} years. The length  of the story should be around {lengthWords} words.
The story should have a title. The story should also have placeholders where images related to the story can be placed. The placeholders should be in the format [Image: Image Description].
'''

generateContent(prompt=prompt)
# generateImage()
