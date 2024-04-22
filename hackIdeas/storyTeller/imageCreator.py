import requests
import time
import os
from dotenv import load_dotenv
load_dotenv()
from PIL import Image
from io import BytesIO
import time

headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {os.getenv('MY_MIDJOURNEY_API_KEY')}",
          }
def generateImage(description="Big Sur at sunrise"):
    generatorUrl = "https://api.mymidjourney.ai/api/v1/midjourney/imagine"
    generatorResponse = requests.post(url= generatorUrl,json={
                        "prompt": f"{description}",
                    }, headers=headers)
    print(generatorResponse.json())
    print(generatorResponse.json()['messageId'])
    _waitForImageAndSave(generatorResponse.json()['messageId'])

def _waitForImageAndSave(messageId: str):
    messageUrl = f"https://api.mymidjourney.ai/api/v1/midjourney/message/{messageId}"
    messageResponse = requests.get(messageUrl, headers=headers)
    print(messageResponse.json())
    status = messageResponse.json()['status']
    while status != 'DONE':
        time.sleep(5)
        messageResponse = requests.get(messageUrl, headers=headers)
        print(messageResponse.json())
        status = messageResponse.json()['status']
    imageResponse = requests.get(messageResponse.json()['uri'])

    # save image
    f = open(f"{messageId}.jpg", 'wb')
    f.write(imageResponse.content)
    
    # display image
    img = Image.open(BytesIO(imageResponse.content))
    img.show()
    
    
