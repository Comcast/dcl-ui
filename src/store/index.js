import { createStore } from 'vuex'
import init from './config'

const store = createStore({
  state () {
    return {
			packageVersion: process.env.PACKAGE_VERSION || '0'
		}
  },
  mutations: {},
  actions: {},
	getters: {
		appVersion: (state) => {
			return state.packageVersion;
		}
	}
})
init(store)
export default store
