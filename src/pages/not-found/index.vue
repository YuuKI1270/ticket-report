<script lang="ts" setup>
import { useRouter } from "vue-router";
import { routerPaths } from "../../utils/route-util";

const navigate = useRouter();
</script>
<template>
  <v-container
    :fluid="true"
    class="d-flex justify-center align-center"
    style="height: 100vh; width: 100vw"
  >
    <div class="d-flex flex-column justify-center">
      <h1 class="text-h1 pa-4">404</h1>
      <h2 class="text-body-1 pa-4">Oops! Page not found.</h2>
      <v-btn
        style="border-radius: 0"
        color="primary"
        variant="flat"
        @click="navigate.push({ name: routerPaths.root.name })"
        >Go to Home</v-btn
      >
    </div>
  </v-container>
</template>
../../utils/route-util.ts ../../utils/route-util
