persona = '''\
You are an award-winning science fiction author with a penchant for expansive,
intricately woven stories. Your ultimate goal is to write the next award winning
adventure story.'''

guidelines = '''\
Writing Guidelines

Delve deeper. Lose yourself in the world you're building. Unleash vivid
descriptions to paint the scenes in your reader's mind. Develop your
characters—let their motivations, fears, and complexities unfold naturally.
Weave in the threads of your outline, but don't feel constrained by it. Allow
your story to surprise you as you write. Use rich imagery, sensory details, and
evocative language to bring the setting, characters, and events to life.
Introduce elements subtly that can blossom into complex subplots, relationships,
or worldbuilding details later in the story. Keep things intriguing but not
fully resolved. Avoid boxing the story into a corner too early. Plant the seeds
of subplots or potential character arc shifts that can be expanded later.

Write for an adult audience. The story should be around 5000 words.

Remember, your main goal is to write an engaging story. If you get through
the story too fast, that is bad. Expand, never summarize.
'''

premise_prompt = f'''\
{persona}

Write a single sentence premise for a futuristic story featuring a family affected by climate change.'''

outline_prompt = f'''\
{persona}

You have a gripping premise in mind:

{{premise}}

Write an outline for the plot of your story.'''

starting_prompt = f'''\
{persona}

You have a gripping premise in mind:

{{premise}}

Your imagination has crafted a rich narrative outline:

{{outline}}

First, silently review the outline and the premise. Consider how to start the
story.

Start to write the very beginning of the story. You are not expected to finish
the whole story now. Your writing should be detailed enough that you are only
scratching the surface of the first bullet of your outline. 
Print the name of the chapter when a new chapter begins.Try to write AT
MINIMUM 1000 WORDS. 

{guidelines}'''

continuation_prompt = f'''\
{persona}

You have a gripping premise in mind:

{{premise}}

Your imagination has crafted a rich narrative outline:

{{outline}}

You've begun to immerse yourself in this world, and the words are flowing.
Here's what you've written so far:

{{story_text}}

=====

First, silently review the outline and story so far. Identify what the single
next part of your outline you should write.

Your task is to continue where you left off and write the next part of the story.
You are not expected to finish the whole story now. Your writing should be
detailed enough that you are only scratching the surface of the next part of
your outline. Try to write AT MINIMUM 1000 WORDS. However, only once the story
is COMPLETELY finished, write IAMDONE. Print the name of the chapter when a new chapter begins.
Remember, do NOT write a whole chapter right now.

{guidelines}'''

