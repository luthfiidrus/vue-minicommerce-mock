import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import routeMock from '../api-mock'

// axios mock method
const mock = new MockAdapter(axios)

mock.onGet("/api/products").reply(200, {
  ...routeMock[0].response.data
})

let index = 1
for (index; index < 6; index++) {
  const res = routeMock[index]
  mock['on' + res.method](res.url).reply(res.status, {
    ...res.response.data
  })
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    product:{},
    products:[],
    carts:[],
    shipping:{},
    payment: {}
  },
  mutations: {
    setProduct (state, value) {
      state.product = value
    },
    setProducts (state, value) {
      state.products = value
    }
  },
  actions: {
    getProducts ({ commit }) {
      axios.get("/api/products").then(function (response) {
        commit('setProducts', response.data)
      });
    },
    getProduct({ commit }, id) {
      axios.get("/api/product/" + id.id).then(function (response) {
        commit('setProduct', response.data)
      });
    }
  },
  getters: {
    products: state => state.products,
    product: state => state.product
  }

})
