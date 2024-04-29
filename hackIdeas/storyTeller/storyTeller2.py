import google.generativeai as genai
from google.api_core import retry
import os
import time
from dotenv import load_dotenv
load_dotenv()

from st2prompts import premise_prompt, outline_prompt, starting_prompt, continuation_prompt

genai.configure(api_key=f"{os.getenv('GEMINI_API_KEY')}")
model = genai.GenerativeModel('gemini-1.5-pro-latest')

# For convenience, a simple wrapper to let the SDK handle error retries
def generate_with_retry(model, prompt):
  print('generate Content called')
  try:
    return model.generate_content(prompt, request_options={'retry':retry.Retry()}, safety_settings={
            'HATE': 'BLOCK_NONE',
            'HARASSMENT': 'BLOCK_NONE',
            'SEXUAL' : 'BLOCK_NONE',
            'DANGEROUS' : 'BLOCK_NONE'
        })
  except Exception as e:
    print('Exception while generating content: Probably rate limited so sleeping and continuing.')
    print(e)
    time.sleep(120)
    print('generate Content called from exception handler')
    return model.generate_content(prompt, request_options={'retry':retry.Retry()}, safety_settings={
        'HATE': 'BLOCK_NONE',
        'HARASSMENT': 'BLOCK_NONE',
        'SEXUAL' : 'BLOCK_NONE',
        'DANGEROUS' : 'BLOCK_NONE'
    })


premise = generate_with_retry(model, premise_prompt).text
print('\nPremise:')
print(premise)

outline = generate_with_retry(model, outline_prompt.format(premise=premise)).text
print('\nOutline:')
print(outline)

starting_draft = generate_with_retry(model, starting_prompt.format(premise=premise, outline=outline)).text
print('\nStarting Draft:')
print(starting_draft)

draft=starting_draft
continuation = generate_with_retry(model, continuation_prompt.format(premise=premise, outline=outline, story_text=draft)).text
print(continuation)

# Add the continuation to the initial draft, keep building the story until we see 'IAMDONE'
draft = draft + '\n\n' + continuation

storyFile = open(r".\myStory.txt", 'w')

while 'IAMDONE' not in continuation:
  continuation = generate_with_retry(model, continuation_prompt.format(premise=premise, outline=outline, story_text=draft)).text
  draft = draft + '\n\n' + continuation
  storyFile.truncate()

  storyFile.write(draft)

storyFile.close()

# Remove 'IAMDONE' and print the final story
final = draft.replace('IAMDONE', '').strip()
print('\nFinal Story:')
print(final)
     
