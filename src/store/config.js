import { env, blocks, wallet, transfers, relayers } from '@starport/vuex'

export default function init(store) {
  transfers(store)
  blocks(store)
  env(store)
  wallet(store)
  relayers(store)
}
