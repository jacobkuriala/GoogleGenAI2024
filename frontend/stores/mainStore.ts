import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    isAppLoaded: false,
    storyPrompt: "",
  }),
  actions: {
    setAppLoaded(loaded: boolean) {
      this.isAppLoaded = loaded;
    },
    setStoryPrompt(prompt: string) {
      this.storyPrompt = prompt;
    },
  },
  getters: {
    isAppLoaded: (state) => state.isAppLoaded, // Usa una función que retorna el estado
    getStoryPrompt: (state) => state.storyPrompt,
  },
});
