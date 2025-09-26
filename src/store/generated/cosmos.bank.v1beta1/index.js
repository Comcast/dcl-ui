// Stub module to prevent errors from @starport/vuex
export default function (store) {
  const moduleName = 'cosmos.bank.v1beta1';

  if (!store.hasModule([moduleName])) {
    const module = {
      namespaced: true,
      state: () => ({
        supply: []
      }),
      getters: {},
      mutations: {},
      actions: {
        QueryTotalSupply: () => {
          // Stub action - returns empty supply
          return Promise.resolve({
            data: {
              supply: []
            }
          });
        }
      }
    };

    store.registerModule([moduleName], module);
  }
}