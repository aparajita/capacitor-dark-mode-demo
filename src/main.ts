import { DarkMode } from '@aparajita/capacitor-dark-mode'
import { IonicVue, isPlatform } from '@ionic/vue'
import { createApp } from 'vue'
import App from './App.vue'
import { getAppearancePref, getSyncStatusBarPref } from '@/prefs'
// eslint-disable-next-line import/order
import router from './router'

// Core CSS required for Ionic components to work properly
import '@ionic/vue/css/core.css'

// Basic CSS for apps built with Ionic
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/padding.css'

// Dark mode support
import '@ionic/vue/css/palettes/dark.class.css'

import './theme/variables.css'

const config: Record<string, unknown> = {}

if (!isPlatform('android')) {
  config.mode = 'ios'
}

const app = createApp(App).use(IonicVue, config).use(router)

router
  .isReady()
  .then(() => {
    DarkMode.init({
      getter: getAppearancePref,
      syncStatusBar: getSyncStatusBarPref(),
    })
      .then(() => {
        app.mount('#app')
      })
      .catch(console.error)
  })
  .catch(console.error)
