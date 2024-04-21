# pip install -q -U google-generativeai
# pip install python-dotenv

from search_web import searchWeb, getPageContent
import pathlib
import textwrap

import google.generativeai as genai
import google.ai.generativelanguage as glm
import os
from dotenv import load_dotenv
load_dotenv()

genai.configure(api_key=f"{os.getenv('GEMINI_API_KEY')}")
model = genai.GenerativeModel('gemini-1.5-pro-latest', tools=[searchWeb, getPageContent])

# prints all the models in the gemini api
def printModels():
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(m.name)

# prints the tools that have been provided to the model
def describeTools():
    print(model._tools.to_proto())

# simple generate content request made to gemini
def generateContent(prompt, onlyContent = True):
    response = model.generate_content(prompt)
    if(onlyContent):
        print(response.candidates[0].content.parts[0])
    else:
        print(response)

# chat interface to gemini. Can use tools and has chat history
def generateChatContent(prompt):
    chat = model.start_chat(enable_automatic_function_calling=True)
    response = chat.send_message(prompt)
    print('chat history:')
    for content in chat.history:
        part = content.parts[0]
        print(content.role, '->',type(part).to_dict(part))
        print('-'*80)
    print(response.text)


# printModels()
# generateContent("You are an extreamely resourceful research assistant. Your task is to generate a report on 'The latest solutions for building software agents using LLMs'.Breakdown the task into steps and work on each step. You can use searchWeb  upto 3 times to accomplish your tasks. You can use getPageContent as many times as you like to accomplish your tasks.")
# webresults = searchWeb('different ways to import files in python')
# print(webresults)
# print(getPageContent("https://www.google.com"))

# describeTools()
prompt = """
You are an extreamely resourceful research assistant.
Your task is to generate a report on 'The latest solutions for building software agents using LLMs'.
In order to achieve this do the following:
- Breakdown the task into subtasks and accomplish each subtask. 
- Breakdown the subtasks further, if needed, and accomplish each of those subtasks recursively.
- Use searchWeb upto 3 times to accomplish each of your tasks. 
- Use getPageContent with urls that you obtained from searchWeb as many times as you like to accomplish each of your tasks.
- Finally, consolidate all your findings and display a detailed report on your initial task.
"""
generateChatContent(prompt)