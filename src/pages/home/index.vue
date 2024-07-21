<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import SIDEBAR_API from "../../api/sidebar";
import LoadingBackdrop from "../../components/CustLoadingComp/LoadingBackdrop.vue";
import { useRouter } from "vue-router";
import { watch, watchEffect } from "vue";
import { routerPaths } from "../../utils/route-util";

// // hooks
const navigate = useRouter();
const { data, isError, isLoading } = useQuery<ISidebar.IResSidebar>({
  queryKey: ["sidebar"],
  queryFn: SIDEBAR_API.getList,
  select: (data) => data,
});

watch(isError, () => {
  navigate.push({ name: routerPaths.login.name });
});

watchEffect(() => {
  if (data.value?.response) {
    navigate.push({ path: data.value.response[0].route });
  }
});
</script>
<template>
  <LoadingBackdrop :open="isLoading" />
</template>
../../utils/route-util
