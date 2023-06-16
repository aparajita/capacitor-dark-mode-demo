import type { DarkModeGetterResult } from '@aparajita/capacitor-dark-mode'
import { DarkModeAppearance } from '@aparajita/capacitor-dark-mode'

export function getAppearancePref(): DarkModeGetterResult {
  const item = localStorage.getItem('appearance')

  if (item) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return item as DarkModeAppearance
  }

  return DarkModeAppearance.system
}

export function getSyncStatusBarPref(): boolean {
  return localStorage.getItem('syncStatusBar') === 'true'
}

export function setAppearancePref(appearance: DarkModeAppearance): void {
  localStorage.setItem('appearance', appearance)
}

export function setSyncStatusBarPref(syncStatusBar: boolean): void {
  localStorage.setItem('syncStatusBar', syncStatusBar ? 'true' : 'false')
}

if (localStorage.getItem('syncStatusBar') === null) {
  setSyncStatusBarPref(true)
}
