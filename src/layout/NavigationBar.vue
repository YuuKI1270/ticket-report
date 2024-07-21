<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { routerPaths } from "../utils/route-util";

// props
const { data, drawer } = defineProps<{
  data?: ISidebar.IResSidebar;
  drawer: boolean;
  onClick: () => void;
}>();

// hooks
const location = useRoute();
const navigate = useRouter();
</script>

<template>
  <v-navigation-drawer
    :style="
      drawer
        ? 'transform:translateX(-110%);position:fixed'
        : 'transform:translateX(0%)'
    "
    :temporary="drawer"
    class="px-4 py-6 scroll"
  >
    <v-img
      class="h-10 mx-auto"
      src="https://online.com.kh/wp-content/uploads/2018/06/online_logo.png"
      @click="
        () => {
          navigate.push({ name: routerPaths.root.name });
          onClick();
        }
      "
    />

    <v-list style="height: calc(100vh - 200px); overflow: auto">
      <v-list-item
        v-for="item in data?.response"
        :key="item.id"
        :active="item.route.includes(location.path)"
        :link="true"
        append-icon=""
        class="my-2 rounded-lg text-body-1"
        @click="
          () => {
            navigate.push(item.route);
            onClick();
          }
        "
      >
        <template v-slot:title>
          <div class="text-subtitle-2">{{ item.title }}</div>
        </template>
        <template v-slot:prepend>
          <v-icon
            v-if="item.route.includes(location.path)"
            icon="mdi-folder"
          ></v-icon>
          <v-icon
            v-if="!item.route.includes(location.path)"
            icon="mdi-folder-outline"
          ></v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<style scoped>
.scroll ::-webkit-scrollbar {
  height: 100vh;
  display: none;
}
.v-card-title {
  font-size: 0.875rem;
}
</style>
