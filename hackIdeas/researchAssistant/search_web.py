# pip install serpapi
# pip install python-dotenv

import requests
import os
from dotenv import load_dotenv
load_dotenv()

def searchWeb(searchTerm:str):
    url = f"https://serpapi.com/search.json?q={searchTerm}&api_key={os.getenv('SERP_API_KEY')}"
    response = getUrl(url)
    data = response.json()
    print(data)
    return data

def getPageContent(url:str):
    responseContent = getUrl(url).content
    print(responseContent)
    return responseContent

def getUrl(url):
    return requests.get(url)

