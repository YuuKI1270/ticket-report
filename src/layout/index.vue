<script lang="ts" setup>
import { defineComponent, ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import SIDEBAR_API from "../api/sidebar.ts";
import NavigationBar from "./NavigationBar.vue";
import AppBar from "./AppBar.vue";
import { getPersistedState } from "../utils/persist-util";

defineComponent({ name: "AppLayout" });
// state
const drawer = ref(true);

// hooks
const user = getPersistedState(import.meta.env.VITE_APP_PERSIST_AUTH);
const { data } = useQuery<ISidebar.IResSidebar>({
  queryKey: ["sidebar"],
  queryFn: SIDEBAR_API.getList,
  select: (data) => data,
  refetchOnWindowFocus: true,
});

function handleClose() {
  drawer.value = !drawer.value;
}
</script>

<template>
  <v-layout>
    <NavigationBar :data="data" :drawer="drawer" :onClick="handleClose" />
    <AppBar :onClick="handleClose" :username="user.username" />
    <v-main>
      <div class="px-4 pt-0 pb-4" style="height: calc(100vh - 64px)">
        <slot></slot>
      </div>
    </v-main>
  </v-layout>
</template>
