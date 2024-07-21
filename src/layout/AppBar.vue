<script lang="ts" setup>
import { useRoute } from "vue-router";
import { useAuthStore } from "../store/authStore";

const { onClick, username } = defineProps<{
  onClick: () => void;
  username?: string;
}>();

// hooks
const { logout } = useAuthStore();
const location = useRoute();
</script>

<template>
  <v-app-bar class="border-b-sm" elevation="0">
    <template v-slot:prepend>
      <v-btn icon="mdi-menu" @click="onClick"></v-btn>
      <div class="text-h6">
        {{ location.path.slice(1).replace(/_/g, " ").toUpperCase() }}
      </div>
    </template>
    <template v-slot:append>
      <div class="text-body-1 font-weight-medium">{{ username }}</div>
      <v-btn
        class="text-green-accent-4"
        density="default"
        icon="mdi-power"
        @click="
          () => {
            logout();
          }
        "
      ></v-btn>
    </template>
  </v-app-bar>
</template>
