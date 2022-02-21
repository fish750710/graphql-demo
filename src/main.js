import { createApp, provide, h } from 'vue'
import { createApolloProvider } from '@vue/apollo-option'
import { DefaultApolloClient } from '@vue/apollo-composable'


import { apolloClient } from './apollo'

import App from './App.vue'


const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

const app = createApp({
  setup() {
    // Install Vue Apollo: Composition (Advanced) API
    // Vue 3 https://v4.apollo.vuejs.org/guide-composable/setup.html#vue-3
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})


app
// Install Vue Apollo: Option (Classic) API 
// https://v4.apollo.vuejs.org/guide-option/setup.html#_1-install-vue-apollo-option
.use(apolloProvider) 
.mount('#app')
