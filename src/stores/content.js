import { defineStore } from "pinia";

export const useContentStore = defineStore("content", {
  state: () => ({
    content:
      "<b>You can edit the text here, or use the left panel to enter the Facebook advertisement content you want to generate.</b>",
  }),

  getters: {
    getContent(state) {
      return state.content;
    },
  },

  actions: {
    generateContent(generatedContent) {
      this.content = generatedContent;
    },
    setContentByUser(generatedContent) {
      this.content = generatedContent;
    },
  },
});
