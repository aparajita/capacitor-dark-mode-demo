<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Dark mode demo</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content
      class="ion-padding-vertical"
      :fullscreen="true"
    >
      <DarkModeDemo />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue'
import DarkModeDemo from '@/components/DarkModeDemo.vue'
</script>
