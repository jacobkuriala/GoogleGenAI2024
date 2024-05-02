import { defineStore } from "pinia";

export const useStoryStore = defineStore("story", {
  state: () => ({
    author:
      "You are an award-winning science fiction author with a penchant for expansive, intricately woven stories. Your ultimate goal is to write the next award winning adventure story." as string,
    premise: '' as string,
    outline: '' as string,
    finalStory: '' as string,
    guidelines: '' as string,
  }),
  actions: {
    setAuthor(author: string) {
      this.author = author;
    },
    setPremise(premise: string) {
      this.premise = premise;
    },
    setOutline(outline: string) {
      this.outline = outline;
    },
    setFinalStory(finalStory: string) {
      this.finalStory = finalStory;
    },
    setGuidelines(guidelines: string) {
      this.guidelines = guidelines;
    },
    resetStory() {
      this.author =
        "You are an award-winning science fiction author with a penchant for expansive, intricately woven stories. Your ultimate goal is to write the next award winning adventure story.";
      this.premise = '';
      this.outline = '';
      this.finalStory = '';
      this.guidelines = '';
    },
  },
  getters: {
    getAuthor: (state) => state.author,
    getPremise: (state) => state.premise,
    getOutline: (state) => state.outline,
    getFinalStory: (state) => state.finalStory,
    getGuidelines: (state) => state.guidelines,
    hasPremise: (state) => state.premise !== '',
    hasOutline: (state) => state.outline !== '',
    hasFinalStory: (state) => state.finalStory !== '',
    hasGuidelines: (state) => state.guidelines !== '',
    isStoryComplete: (state) =>
      state.finalStory !== '' && state.finalStory.includes("IAMDONE"),
    fullStoryState: (state) => ({
      author: state.author,
      premise: state.premise,
      outline: state.outline,
      finalStory: state.finalStory,
      guidelines: state.guidelines,
    }),
  },
});
