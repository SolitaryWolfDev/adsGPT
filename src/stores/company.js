import { defineStore } from 'pinia'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    companyId:"",
    companyName: "",
    companyDescription: ""
  }),

  getters: {
    getCompany (state) {
      return {"companyId": state.companyId, "companyName":state.companyName, 
      "companyDescription":state.companyDescription}
    },
  },

  actions: {
    setCompanyData (companyData) {
      this.companyId = companyData.companyId,
      this.companyName = companyData.companyName,
      this.companyDescription = companyData.companyDescription
    },
  }
})
