import { IonicVue, isPlatform } from '@ionic/vue'
import { createApp } from 'vue'
import App from './App.vue'
// eslint-disable-next-line import/order
import router from './router'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css'

import './theme/variables.css'
import './assets/css/styles.pcss'

const config: Record<string, unknown> = {}

if (!isPlatform('android')) {
  config.mode = 'ios'
}

const app = createApp(App).use(IonicVue, config).use(router)
await router.isReady()
app.mount('#app')
