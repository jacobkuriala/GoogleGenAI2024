# pip install serpapi
# pip install python-dotenv
# pip install beautifulsoup4

import requests
from bs4 import BeautifulSoup
import os
import google.ai.generativelanguage as glm
from dotenv import load_dotenv
load_dotenv()

def searchWeb(searchTerm:str):
    url = f"https://serpapi.com/search.json?q={searchTerm}&api_key={os.getenv('SERP_API_KEY')}"
    response = getUrl(url)
    data = response.json()['organic_results']
    print(data)
    return data

def getPageContent(url:str):
    responseHtml = getUrl(url).content
    soup = BeautifulSoup(responseHtml, features="html.parser")
    # kill all script and style elements
    for script in soup(["script", "style"]):
        script.extract()    # rip it out
    # get text
    text = soup.get_text()
    # break into lines and remove leading and trailing space on each
    lines = (line.strip() for line in text.splitlines())
    # break multi-headlines into a line each
    chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
    # drop blank lines
    text = '\n'.join(chunk for chunk in chunks if chunk)
    print(text)
    return text

def getUrl(url):
    return requests.get(url)

searchWebTools = glm.Tool(
    function_declarations=[
        glm.FunctionDeclaration(
            name="searchWeb",
            description="Searches the web for the input searchTerm.",
            parameters=glm.Schema(
                type=glm.Type.OBJECT,
                properties={
                    'searchTerm':glm.Schema(type=glm.Type.STRING, description="input serach text")
                },
                required=['searchTerm']
            )         
        ),
        glm.FunctionDeclaration(
            name="getPageContent",
            description="Retrieves the web page text for the input url.",
            parameters=glm.Schema(
                type=glm.Type.OBJECT,
                properties={
                    'url':glm.Schema(type=glm.Type.STRING, description="The url of the web page. A valid URL must use a standard URI format and cannot exceed 1024 characters.")
                },
                required=['url']
            )         
        ),
    ]
)

searchWebConfig = glm.ToolConfig(
    function_calling_config=glm.FunctionCallingConfig(
        mode=glm.FunctionCallingConfig.Mode.AUTO,
        # allowed_function_names=["searchWeb", "getPageContent"]
    )
)

searchWebConfigForceFunction = glm.ToolConfig(
    function_calling_config=glm.FunctionCallingConfig(
        mode=glm.FunctionCallingConfig.Mode.ANY,
        allowed_function_names=["searchWeb", "getPageContent"]
    )
)