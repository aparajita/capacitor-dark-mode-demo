<template>
  <ion-content
    class="ion-padding-vertical"
    :fullscreen="true"
  >
    <ion-list>
      <ion-item>
        <ion-label>Appearance:</ion-label>
        <ion-select
          v-model="appearance"
          interface="popover"
        >
          <ion-select-option :value="DarkModeAppearance.system">
            System
          </ion-select-option>
          >
          <ion-select-option :value="DarkModeAppearance.light">
            Light
          </ion-select-option>
          >
          <ion-select-option :value="DarkModeAppearance.dark">
            Dark
          </ion-select-option>
          >
        </ion-select>
      </ion-item>

      <ion-item>
        <ion-checkbox
          v-model="disableTransitions"
          @ion-change="onConfigChange"
        />
        <ion-label>Disable transitions</ion-label>
      </ion-item>

      <div v-if="isAndroid">
        <ion-item>
          <ion-label>Sync status bar</ion-label>
          <ion-select
            v-model="syncStatusBar"
            interface="popover"
            @ion-change="onConfigChange"
          >
            <ion-select-option :value="true"> Yes </ion-select-option>
            <ion-select-option :value="false"> No </ion-select-option>
            <ion-select-option value="textOnly"> Text only </ion-select-option>
          </ion-select>
        </ion-item>

        <div v-if="syncStatusBar">
          <ion-item>
            <ion-checkbox
              v-model="useCustomStatusBarBackground"
              @ion-change="onConfigChange"
            />
            <ion-label>Custom status bar background</ion-label>
          </ion-item>

          <div v-if="useCustomStatusBarBackground">
            <ion-item>
              <ion-checkbox
                v-model="useCustomStyleGetter"
                @ion-change="DarkMode.update()"
              />
              <ion-label>Custom style getter (reverses)</ion-label>
            </ion-item>

            <ion-item>
              <ion-label>Light status bar color:</ion-label>
              <ion-input
                v-model="lightStatusBarColor"
                @ion-change="onColorChange(lightStatusBarColor)"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label>Dark status bar color:</ion-label>
              <ion-input
                v-model="darkStatusBarColor"
                @ion-change="onColorChange(darkStatusBarColor)"
              ></ion-input>
            </ion-item>
          </div>
        </div>
      </div>
    </ion-list>
  </ion-content>
</template>

<script setup lang="ts">
import {
  DarkMode,
  DarkModeAppearance,
  isDarkColor,
  isValidHexColor
} from '@aparajita/capacitor-dark-mode'
import type {
  DarkModeListenerData,
  DarkModeListenerHandle,
  DarkModeOptions,
  StatusBarStyleGetterResult,
  DarkModeSyncStatusBar
} from '@aparajita/capacitor-dark-mode'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import {
  alertController,
  IonCheckbox,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption
} from '@ionic/vue'
import { useLocalStorage } from '@vueuse/core'
import { onMounted, onUnmounted, ref, watch } from 'vue'

/* eslint-disable @typescript-eslint/no-magic-numbers */
const isAndroid = Capacitor.getPlatform() === 'android'
// const syncStatusBar = ref(getSyncStatusBarPref())
const lightStatusBarColor = ref('#011c55')
const darkStatusBarColor = ref('#ccffc0')
const appearance = useLocalStorage<DarkModeAppearance>(
  'dark-mode',
  DarkModeAppearance.system
)
const syncStatusBar = useLocalStorage<DarkModeSyncStatusBar>(
  'sync-status-bar',
  true
)
const disableTransitions = ref(true)
const useCustomStatusBarBackground = ref(false)
const useCustomStyleGetter = ref(false)
const kStatusBarBackgroundVariable = '--statusBarBackground'
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

function getDarkModeConfig(): DarkModeOptions {
  return {
    getter: () => appearance.value,
    setter: (newAppearance: DarkModeAppearance): void => {
      appearance.value = newAppearance
    },
    syncStatusBar: syncStatusBar.value,
    statusBarBackgroundVariable: useCustomStatusBarBackground.value
      ? kStatusBarBackgroundVariable
      : '',
    statusBarStyleGetter: statusBarStyle,
    disableTransitions: disableTransitions.value
  }
}

onMounted(async () => {
  appearanceListenerHandle = await DarkMode.addAppearanceListener(
    (data: DarkModeListenerData) => {
      // eslint-disable-next-line @typescript-eslint/padding-line-between-statements
      ;(async (): Promise<void> => {
        console.log('appearance listener', data)
        const style = statusBarStyle(data.dark ? Style.Light : Style.Dark)

        if (style) {
          await StatusBar.setStyle({ style })
        }

        await showAlert(`System dark mode is ${data.dark ? 'on' : 'off'}.`)
      })()
    }
  )

  await DarkMode.configure(getDarkModeConfig())
})

onUnmounted(() => {
  appearanceListenerHandle?.remove()
})

function statusBarStyle(
  style?: Style,
  color?: string
): StatusBarStyleGetterResult {
  if (color && useCustomStatusBarBackground.value) {
    const dark = isDarkColor(color)

    if (useCustomStyleGetter.value) {
      return dark ? Style.Light : Style.Dark
    }

    return dark ? Style.Dark : Style.Light
  }

  return null
}

async function onColorChange(color: string): Promise<void> {
  if (useCustomStatusBarBackground.value && isValidHexColor(color)) {
    await DarkMode.update()
  }
}

async function onConfigChange(): Promise<void> {
  await DarkMode.configure(getDarkModeConfig())
}

watch(appearance, async () => {
  console.log('appearance changed', appearance.value)
  await DarkMode.update()
})
</script>

<style>
ion-content {
  --statusBarBackground: v-bind(lightStatusBarColor);
}

body.dark ion-content {
  --statusBarBackground: v-bind(darkStatusBarColor);
}
</style>
