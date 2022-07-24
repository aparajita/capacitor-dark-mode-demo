<template>
  <ion-list>
    <ion-item v-if="isAndroid">
      <ion-label>Sync status bar</ion-label>
      <ion-checkbox
        slot="start"
        v-model="syncStatusBar"
        @ion-change="onSyncStatusBarChange"
      ></ion-checkbox>
    </ion-item>

    <ion-radio-group
      v-model="appearance"
      @ion-change="updateAppearance"
    >
      <ion-list-header>
        <ion-label>Appearance</ion-label>
      </ion-list-header>

      <ion-item>
        <ion-label>System</ion-label>
        <ion-radio
          slot="start"
          :value="DarkModeAppearance.system"
        ></ion-radio>
      </ion-item>

      <ion-item>
        <ion-label>Light</ion-label>
        <ion-radio
          slot="start"
          :value="DarkModeAppearance.light"
        ></ion-radio>
      </ion-item>

      <ion-item>
        <ion-label>Dark</ion-label>
        <ion-radio
          slot="start"
          :value="DarkModeAppearance.dark"
        ></ion-radio>
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
} from '@/dark-mode'

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

  const storedAppearance = await getAppearancePref()

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
  await DarkMode.configure({ syncStatusBar: syncStatusBar.value })
}

async function updateAppearance(): Promise<void> {
  setAppearancePref(appearance.value)
  await DarkMode.update()
}
</script>
