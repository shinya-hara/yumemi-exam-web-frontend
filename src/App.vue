<template>
  <v-app>
    <v-layout>
      <v-app-bar>
        <v-app-bar-title>ゆめみ フロントエンド試験</v-app-bar-title>
        <v-spacer />
        <v-btn
          icon
          href="https://github.com/shinya-hara/yumemi-exam-web-frontend"
          target="_blank"
        >
          <v-icon>mdi-github</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts"></script>
