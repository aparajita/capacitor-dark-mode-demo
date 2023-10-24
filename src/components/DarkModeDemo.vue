<template>
  <ion-list>
    <ion-list-header v-if="isAndroid">
      <ion-label>Sync</ion-label>
    </ion-list-header>

    <ion-item
      v-if="isAndroid"
      lines="full"
    >
      <ion-radio-group
        v-model="syncStatusBar"
        style="display: flex; flex-direction: column"
        @ion-change="onSyncStatusBarChange"
      >
        <ion-radio
          :value="false"
          label-placement="end"
          style="width: fit-content"
        >
          Off
        </ion-radio>
        <ion-radio
          :value="true"
          label-placement="end"
          style="width: fit-content"
        >
          Everything
        </ion-radio>
        <ion-radio
          value="textOnly"
          label-placement="end"
          style="width: fit-content"
        >
          Text only
        </ion-radio>
      </ion-radio-group>
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
import type {
  DarkModeListenerHandle,
  DarkModeSyncStatusBar,
} from '@aparajita/capacitor-dark-mode'
import { DarkMode, DarkModeAppearance } from '@aparajita/capacitor-dark-mode'
import { Capacitor } from '@capacitor/core'
import {
  alertController,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRadio,
  IonRadioGroup,
} from '@ionic/vue'
import { onMounted, onUnmounted, ref } from 'vue'
import {
  getAppearancePref,
  getSyncStatusBarPref,
  setAppearancePref,
  setSyncStatusBarPref,
} from '@/prefs'

const isAndroid = Capacitor.getPlatform() === 'android'
const syncStatusBar = ref<DarkModeSyncStatusBar>(getSyncStatusBarPref())
const appearance = ref(DarkModeAppearance.system)
let appearanceListenerHandle: DarkModeListenerHandle | null = null

async function showAlert(message: string): Promise<void> {
  const alert = await alertController.create({
    header: `Appearance change:`,
    subHeader: '',
    message,
    buttons: ['OK'],
  })
  await alert.present()
}

onMounted(async () => {
  appearanceListenerHandle = await DarkMode.addAppearanceListener(
    ({ dark }) => {
      showAlert(`System dark mode is ${dark ? 'on' : 'off'}.`).catch(
        console.error,
      )
    },
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
  await DarkMode.configure({ syncStatusBar: syncStatusBar.value })
}

async function updateAppearance(): Promise<void> {
  setAppearancePref(appearance.value)
  await DarkMode.update()
}
</script>
