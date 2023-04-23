import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    product:[],
  }),

  getters: {
    getProduct(state) {
      return state.product
    },
  },

  actions: {
    setProductData(productData) {
      this.product = productData
    },
  }
})
