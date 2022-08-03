<div class="markdown-body">

# capacitor-dark-mode-demo&nbsp;&nbsp;[![GitHub version](https://badge.fury.io/gh/aparajita%2Fcapacitor-dark-mode-demo.svg)](https://badge.fury.io/gh/aparajita%2Fcapacitor-dark-mode-demo)

This [Ionic](https://ionicframework.com) application provides a demo of all of the capabilities of the [capacitor-dark-mode](https://github.com/aparajita/capacitor-dark-mode) Capacitor 4 plugin. It has been tested on Android API 28-32.

Here is this app running on both iOS and Android.

| iOS                                                                                                                            | Android                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| <video src="https://user-images.githubusercontent.com/22218/180627865-9315f4e6-e0bd-49a7-bf3f-166406e3d22b.mp4" width="352" /> | <video src="https://user-images.githubusercontent.com/22218/180627873-64e677ee-476a-400e-9949-1aef53a5dcaa.mp4" width="365" /> |

## Installation

```shell
git clone https://github.com/aparajita/capacitor-dark-mode-demo.git
cd capacitor-dark-mode-demo
pnpm install # npm install
pnpm build # npm run build
```

## Usage

### Web

To launch the demo in a browser:

```shell
pnpm dev  # npm run dev
```

Once the demo is open, you can switch between appearance modes. When the appearance is `System`, switching the system between dark and light mode will change the appearance of the app and display an alert to confirm the change.

### Native

To launch the demo in Xcode or Android Studio:

```shell
pnpm ios.dev  # npm run ios.dev
pnpm android.dev  # npm run android.dev
```

Once Xcode/Android Studio opens, select the device or simulator you wish to run the demo on (since you are running in Vite’s dev mode, be sure to use a recent OS version). Once the app is open, it behaves as it does on the web.

On Android, you can choose whether to sync the status bar with the appearance. By default they are synced.

Enjoy!

</div>
