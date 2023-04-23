import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: "",
    fullName: ""
  }),

  getters: {
    getUser (state) {
      return {"userId": state.userId, "fullName":state.fullName}
    }
  },

  actions: {
    setUserData (userData) {
      this.userId = userData.userId,
      this.fullName = userData.fullName
    },
  }
})
