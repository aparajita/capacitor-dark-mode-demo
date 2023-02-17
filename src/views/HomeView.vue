<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Dark mode demo</ion-title>
      </ion-toolbar>
    </ion-header>
    <DarkModeDemo />
  </ion-page>
</template>

<script setup lang="ts">
import { IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import DarkModeDemo from '../components/DarkModeDemo.vue'
</script>
