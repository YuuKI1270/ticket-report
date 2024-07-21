<script lang="ts" setup>
import LoadingPage from "../../components/CustLoadingComp/LoadingPage.vue";

// props
const { data } = defineProps<{
  data?: IReport.IResReport;
  loading: boolean;
}>();
</script>

<template>
  <div v-if="data?.response.data.length === 0" class="cus-table">
    <div class="d-flex flex-column justify-center align-center h-100">
      <v-icon color="grey" icon="mdi-inbox-outline" size="100" />
      <div class="text-grey">No Data...</div>
    </div>
  </div>
  <div v-if="loading" class="cus-table">
    <LoadingPage :open="loading" />
  </div>
  <v-table
    v-if="!loading"
    :fixed-header="true"
    class="cus-table"
    density="compact"
  >
    <thead>
      <tr>
        <th
          v-for="(_value, key) in data?.response.data[0]"
          :key="key"
          class="px-6 py-1 text-uppercase text-no-wrap text-black bg-grey-lighten-3 text-caption"
          scope="col"
          :class="
            `${key}` == 'ticket_id' ||
            `${key}` == 'account_id' ||
            `${key}` == 'username' ||
            `${key}` == 'status' ||
            `${key}` == 'days' ||
            `${key}` == 'monthly_fee' ||
            `${key}` == 'subscribe_plan' ||
            `${key}` == 'priority'
              ? 'head-id'
              : 'head-other'
          "
        >
          {{ key.toString().replace(/_/g, " ") }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="value in data?.response.data"
        :key="value.ticket_id"
        class="bg-white border-b text-black-500 text-caption"
      >
        <td
          v-for="(item, key) in value"
          :key="key"
          class="px-6 py-0 font-medium text-black-500 whitespace-nowrap"
        >
          <a
            v-if="`${key}` == 'ticket_id'"
            :id="value.ticket_id"
            :href="`https://ticket.cogetel.com.kh/staff/index.php?/Tickets/Ticket/View/${value.ticket_id}`"
            target="_blank"
            >{{ item }}</a
          >
          <span v-if="`${key}` != 'ticket_id'"> {{ item }}</span>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<style scoped>
.cus-table {
  height: calc(100vh - 184px);
}

.cus-table ::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}
.cus-table ::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  border-radius: 10px;
}

.cus-table ::-webkit-scrollbar-thumb {
  background-color: #9f9f9f6c; /* Dark gray thumb */
  border-radius: 10px;
}
.cus-table ::-webkit-scrollbar-thumb:hover {
  background-color: #999;
}
.pointer-row:hover {
  cursor: pointer;
}
.v-table.v-table--fixed-header
  > .v-table__wrapper
  > table
  > thead
  > tr
  > th:first-of-type {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  max-width: 10px;
}

.v-table.v-table--fixed-header
  > .v-table__wrapper
  > table
  > thead
  > tr
  > th:last-of-type {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.head-id {
  min-width: 10px;
}
.head-other {
  min-width: 220px;
}
</style>
