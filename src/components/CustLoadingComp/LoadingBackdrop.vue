<template>
  <div v-if="open" class="d-flex justify-center align-center" style="height: 100vh; width: 100vw">
    <v-progress-circular
        :size="64"
        :width="12"
        color="primary"
        indeterminate
    ></v-progress-circular>
  </div>
</template>

<script lang="ts" setup>
import {defineComponent} from "vue";

defineComponent({name: 'LoadingBackdrop'})
defineProps<{
  open: boolean
}>()
</script>
