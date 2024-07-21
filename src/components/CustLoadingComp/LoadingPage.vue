<script lang="ts" setup>
import {defineComponent} from "vue";

defineComponent({name: 'LoadingPage'})
// prop
defineProps<{
  open: boolean
}>()
</script>

<template>
  <div v-if="open" class="w-100 h-100 d-flex justify-center align-center">
    <v-progress-circular
        :size="64"
        :width="12"
        color="primary"
        indeterminate
    ></v-progress-circular>
  </div>
</template>

