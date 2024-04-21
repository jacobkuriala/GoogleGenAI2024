# pip install -q -U google-generativeai
# pip install python-dotenv

from search_web import searchWeb, getPageContent, searchWebTools, searchWebConfig, searchWebConfigForceFunction
import pathlib
import textwrap
import time

import google.generativeai as genai
import google.ai.generativelanguage as glm
import os
from dotenv import load_dotenv
load_dotenv()

genai.configure(api_key=f"{os.getenv('GEMINI_API_KEY')}")
model = genai.GenerativeModel('gemini-1.5-pro-latest')
chat = model.start_chat(enable_automatic_function_calling=False)
chatStep = 0
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
def generateChatContent(prompt, tools=searchWebTools, tool_config=searchWebConfig):
    global chat
    global chatStep
    if(chatStep!=0):
        time.sleep(40)
    response = chat.send_message(prompt, tools=tools, tool_config=tool_config)
    print('chat history:')
    for content in chat.history:
        part = content.parts[0]
        print(content.role, '->',type(part).to_dict(part))
        print('-'*80)

    print('response:')
    # for part in response.candidates[0].content.parts:
    if response.candidates[0].content.parts[0]:
        part=response.candidates[0].content.parts[0]
        print(part)
        if(part.text):
            print(part.text)
            if(chatStep==0):
                generateChatContent('Now respond with all the function calls for performing the subtasks.', tool_config=searchWebConfigForceFunction)
                chatStep = chatStep + 1
        elif(part.function_call):
            print('Handle function call:')
            handleFunctionCall(part=part)
        print('-'*80)

def handleFunctionCall(part):
    functionName = part.function_call.name
    if (functionName == 'searchWeb'):
        response = searchWeb(searchTerm=part.function_call.args['searchTerm'])
    else:
        response = getPageContent(url=part.function_call.args['url'])
    functionResponse = glm.Content(
                        parts=[glm.Part(
                        function_response = glm.FunctionResponse(
                        name=functionName,
                        response={'result': response}))])
    generateChatContent(functionResponse)

# printModels()
# generateContent("You are an extreamely resourceful research assistant. Your task is to generate a report on 'The latest solutions for building software agents using LLMs'.Breakdown the task into steps and work on each step. You can use searchWeb  upto 3 times to accomplish your tasks. You can use getPageContent as many times as you like to accomplish your tasks.")
# webresults = searchWeb('different ways to import files in python')
# print(webresults)
# print(getPageContent("https://www.google.com"))

# describeTools()
prompt = """
You are an extreamely resourceful research assistant.
Your task is to generate a report on 'Effects of LLMs on Climate'.
In order to achieve this do the following:
- Breakdown the task into subtasks and perform each subtask using searchWeb and getPageContent functions. 
- Use searchWeb upto 3 times to perform each of the tasks. 
- Use getPageContent using urls that you obtained from searchWeb to perform each of the tasks.
- Generate a detailed report on your initial task using the information that you obtained from the subtasks. The report must include a Abstract, Introduction, Methods, Results, Discussion, and References sections.
"""
generateChatContent(prompt)