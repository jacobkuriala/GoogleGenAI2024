import { defineStore } from "pinia";

export const useStoryStore = defineStore("story", {
  state: () => ({
    persona:
      "You are an award-winning science fiction author with a penchant for expansive, intricately woven stories. Your ultimate goal is to write the next award winning adventure story." as string,
    premise: null as string | null,
    outline: null as string | null,
    finalStory: null as string | null,
  }),
  actions: {
    setPersona(persona: string) {
      this.persona = persona;
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
      this.persona =
        "You are an award-winning science fiction author with a penchant for expansive, intricately woven stories. Your ultimate goal is to write the next award winning adventure story.";
      this.premise = null;
      this.outline = null;
      this.finalStory = null;
    },
  },
  getters: {
    getPersona: (state) => state.persona,
    getPremise: (state) => state.premise,
    getOutline: (state) => state.outline,
    getFinalStory: (state) => state.finalStory,
    hasPremise: (state) => state.premise !== null,
    hasOutline: (state) => state.outline !== null,
    hasFinalStory: (state) => state.finalStory !== null,
    isStoryComplete: (state) =>
      state.finalStory !== null && state.finalStory.includes("IAMDONE"),
    fullStoryState: (state) => ({
      persona: state.persona,
      premise: state.premise,
      outline: state.outline,
      finalStory: state.finalStory,
    }),
  },
});
