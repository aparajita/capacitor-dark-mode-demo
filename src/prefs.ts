import type {
  DarkModeGetterResult,
  DarkModeSyncStatusBar
} from '@aparajita/capacitor-dark-mode'
import { DarkModeAppearance } from '@aparajita/capacitor-dark-mode'

export function getAppearancePref(): DarkModeGetterResult {
  const item = localStorage.getItem('appearance')

  if (item) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return item as DarkModeAppearance
  }

  return DarkModeAppearance.system
}

export function getSyncStatusBarPref(): DarkModeSyncStatusBar {
  const sync = localStorage.getItem('syncStatusBar')
  return sync === 'textOnly' ? 'textOnly' : sync === 'true'
}

export function setAppearancePref(appearance: DarkModeAppearance): void {
  localStorage.setItem('appearance', appearance)
}

export function setSyncStatusBarPref(
  syncStatusBar: DarkModeSyncStatusBar
): void {
  localStorage.setItem('syncStatusBar', String(syncStatusBar))
}

if (localStorage.getItem('syncStatusBar') === null) {
  setSyncStatusBarPref(true)
}
