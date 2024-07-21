<script lang="ts" setup>
import LayoutVue from "../../layout/index.vue";
import { watch, ref, onMounted } from "vue";
import TableData from "./TableData.vue";
import { useMutation } from "@tanstack/vue-query";
import REPORT_API from "../../api/report";
import moment from "moment";
import { useRoute, useRouter } from "vue-router";
import { routerPaths } from "../../utils/route-util";

export interface IFilterDate {
  start: string;
  end: string;
  page: string;
}

// variable
const startDate = moment().startOf("month");
const endDate = moment();

// hooks
const location = useRoute();
const navigate = useRouter();

// state
const state = ref<{
  startDate: string | null;
  endDate: string | null;
  route: string;
  page: string;
}>({
  startDate: moment(startDate).format("DD-MM-YYYY"),
  endDate: moment(endDate).format("DD-MM-YYYY"),
  route: location.path,
  page: "1",
});
const pageRef = ref(1);
const selectStartDate = ref(null);
const selectEndDate = ref(null);

// fetching
const {
  mutate: fecthFilter,
  data: resData,
  isPending: isLoading,
  isError,
} = useMutation({
  mutationKey: [`report-${location.path}`],
  mutationFn: (payload: {
    start: string;
    end: string;
    route: string;
    page: string;
  }) =>
    REPORT_API.getList({
      start: payload.start,
      end: payload.end,
      route: payload.route,
      page: payload.page,
      size: "500",
    }),
});

const { mutate: download, isPending: downloading } = useMutation({
  mutationKey: [`export-${location.path}`],
  mutationFn: (payload: { start: string; end: string; route: string }) =>
    REPORT_API.exportExcel({
      start: payload.start,
      end: payload.end,
      route: payload.route,
    }),
});

// methods
const onSubmit = () => {
  const start = moment(state.value.startDate, "DD-MM-YYYY").format(
    "YYYY-MM-DD"
  );
  const end = moment(state.value.endDate, "DD-MM-YYYY").format("YYYY-MM-DD");
  fecthFilter({
    start: start,
    end: end,
    route: location.path,
    page: "1",
  });
};

// check error
watch(isError, () => {
  navigate.push({ name: routerPaths.login.name });
});

watch(selectStartDate, (value) => {
  state.value.startDate = moment(value).format("DD-MM-YYYY");
});

watch(selectEndDate, (value) => {
  state.value.endDate = moment(value).format("DD-MM-YYYY");
});

watch(pageRef, (page) => {
  fecthFilter({
    start: moment(state.value.startDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
    end: moment(state.value.endDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
    route: location.path,
    page: `${page}`,
  });
});

watch(location, (route) => {
  fecthFilter({
    start: moment(state.value.startDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
    end: moment(state.value.endDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
    route: route.path,
    page: "1",
  });
});
// methods

function exportExcel() {
  download({
    end: moment(state.value.endDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
    start: moment(state.value.startDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
    route: location.path,
  });
}

onMounted(() => {
  fecthFilter({
    start: moment(state.value.startDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
    end: moment(state.value.endDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
    route: location.path,
    page: "1",
  });
});
</script>
<template>
  <LayoutVue>
    <div class="flex justify-end py-4 w-full">
      <v-row>
        <v-col cols="12" sm="6">
          <v-btn
            :loading="downloading"
            append-icon="mdi-download-outline"
            class="text-capitalize rounded-lg"
            color="success"
            elevation="0"
            style="height: 40px"
            variant="flat"
            @click="exportExcel"
          >
            Excel
            <template v-slot:append>
              <v-icon color="white"></v-icon>
            </template>
          </v-btn>
        </v-col>
        <v-col cols="12" sm="6">
          <form @submit.prevent="onSubmit">
            <div class="d-flex justify-end h-100">
              <!-- start date -->
              <v-menu
                transition="scale-transition"
                :close-on-content-click="false"
              >
                <template v-slot:activator="{ props }">
                  <v-text-field
                    v-model="state.startDate"
                    :error="false"
                    :hide-details="true"
                    density="compact"
                    variant="outlined"
                    readonly
                    v-bind="props"
                    rounded="lg"
                  ></v-text-field>
                </template>

                <v-container>
                  <v-row justify="center">
                    <v-date-picker
                      v-model="selectStartDate"
                      elevation="4"
                      show-adjacent-months
                    ></v-date-picker>
                  </v-row>
                </v-container>
              </v-menu>
              <div class="mr-2 ml-2"></div>
              <!-- end date -->
              <v-menu
                transition="scale-transition"
                :close-on-content-click="false"
              >
                <template v-slot:activator="{ props }">
                  <v-text-field
                    v-model="state.endDate"
                    :error="false"
                    :hide-details="true"
                    density="compact"
                    variant="outlined"
                    readonly
                    v-bind="props"
                    rounded="lg"
                  ></v-text-field>
                </template>
                <v-container>
                  <v-row justify="center">
                    <v-date-picker
                      elevation="4"
                      v-model="selectEndDate"
                      show-adjacent-months
                    ></v-date-picker>
                  </v-row>
                </v-container>
              </v-menu>
              <v-btn
                prepend-icon="mdi-magnify"
                class="ml-4 h-auto text-capitalize rounded-lg"
                color="primary"
                elevation="0"
                type="submit"
                variant="flat"
              >
                Filter
                <template v-slot:prepend>
                  <v-icon color="white" size="18"></v-icon>
                </template>
              </v-btn>
            </div>
          </form>
        </v-col>
      </v-row>
    </div>

    <TableData :data="resData" :loading="isLoading" />
    <div class="text-center">
      <v-pagination
        :length="resData?.response.total_pages"
        density="compact"
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
        variant="text"
        :total-visible="5"
        v-model="pageRef"
      ></v-pagination>
    </div>
  </LayoutVue>
</template>
