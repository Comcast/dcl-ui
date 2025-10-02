// Stub module to prevent errors from @starport/vuex
export default function (store: any) {
  const moduleName = 'cosmos.staking.v1beta1'

  if (!store.hasModule([moduleName])) {
    const module = {
      namespaced: true,
      state: () => ({
        params: {
          bond_denom: 'stake'
        }
      }),
      getters: {},
      mutations: {},
      actions: {
        QueryParams: () => {
          // Stub action - returns default params
          return Promise.resolve({
            data: {
              params: {
                bond_denom: 'stake'
              }
            }
          })
        }
      }
    }

    store.registerModule([moduleName], module)
  }
}