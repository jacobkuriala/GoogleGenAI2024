import { defineStore } from "pinia";

export const useStoryStore = defineStore("story", {
  state: () => ({
    author:
      "You are an award-winning science fiction author with a penchant for expansive, intricately woven stories. Your ultimate goal is to write the next award winning adventure story." as string,
    premise: null as string | null,
    outline: null as string | null,
    finalStory: null as string | null,
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
    resetStory() {
      this.author =
        "You are an award-winning science fiction author with a penchant for expansive, intricately woven stories. Your ultimate goal is to write the next award winning adventure story.";
      this.premise = null;
      this.outline = null;
      this.finalStory = null;
    },
  },
  getters: {
    getAuthor: (state) => state.author,
    getPremise: (state) => state.premise,
    getOutline: (state) => state.outline,
    getFinalStory: (state) => state.finalStory,
    hasPremise: (state) => state.premise !== null,
    hasOutline: (state) => state.outline !== null,
    hasFinalStory: (state) => state.finalStory !== null,
    isStoryComplete: (state) =>
      state.finalStory !== null && state.finalStory.includes("IAMDONE"),
    fullStoryState: (state) => ({
      author: state.author,
      premise: state.premise,
      outline: state.outline,
      finalStory: state.finalStory,
    }),
  },
});
