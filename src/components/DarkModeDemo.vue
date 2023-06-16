<template>
  <ion-list>
    <ion-item
      v-if="isAndroid"
      lines="full"
    >
      <ion-checkbox
        slot="start"
        v-model="syncStatusBar"
        label-placement="end"
        @ion-change="onSyncStatusBarChange"
      >
        Sync status bar
      </ion-checkbox>
    </ion-item>

    <ion-radio-group
      v-model="appearance"
      @ion-change="updateAppearance"
    >
      <ion-list-header>
        <ion-label>Appearance</ion-label>
      </ion-list-header>

      <ion-item lines="full">
        <ion-radio
          slot="start"
          label-placement="end"
          :value="DarkModeAppearance.system"
        >
          System
        </ion-radio>
      </ion-item>

      <ion-item lines="full">
        <ion-radio
          slot="start"
          label-placement="end"
          :value="DarkModeAppearance.light"
        >
          Light
        </ion-radio>
      </ion-item>

      <ion-item lines="full">
        <ion-radio
          slot="start"
          label-placement="end"
          :value="DarkModeAppearance.dark"
        >
          Dark
        </ion-radio>
      </ion-item>
    </ion-radio-group>
  </ion-list>
</template>

<script setup lang="ts">
import type { DarkModeListenerHandle } from '@aparajita/capacitor-dark-mode'
import { DarkMode, DarkModeAppearance } from '@aparajita/capacitor-dark-mode'
import { Capacitor } from '@capacitor/core'
import {
  alertController,
  IonCheckbox,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRadio,
  IonRadioGroup
} from '@ionic/vue'
import { onMounted, onUnmounted, ref } from 'vue'
import {
  getAppearancePref,
  getSyncStatusBarPref,
  setAppearancePref,
  setSyncStatusBarPref
} from '@/prefs'

const isAndroid = Capacitor.getPlatform() === 'android'
const syncStatusBar = ref(getSyncStatusBarPref())
const appearance = ref(DarkModeAppearance.system)
let appearanceListenerHandle: DarkModeListenerHandle | null = null

async function showAlert(message: string): Promise<void> {
  const alert = await alertController.create({
    header: `Appearance change:`,
    subHeader: '',
    message,
    buttons: ['OK']
  })
  await alert.present()
}

onMounted(async () => {
  appearanceListenerHandle = await DarkMode.addAppearanceListener(
    ({ dark }) => {
      showAlert(`System dark mode is ${dark ? 'on' : 'off'}.`).catch(
        console.error
      )
    }
  )

  const storedAppearance = getAppearancePref()

  if (storedAppearance) {
    appearance.value = storedAppearance
  }

  await DarkMode.update()
})

onUnmounted(() => {
  appearanceListenerHandle?.remove()
})

async function onSyncStatusBarChange(): Promise<void> {
  setSyncStatusBarPref(syncStatusBar.value)
  await DarkMode.init({ syncStatusBar: syncStatusBar.value })
}

async function updateAppearance(): Promise<void> {
  setAppearancePref(appearance.value)
  await DarkMode.update()
}
</script>
