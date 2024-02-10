<script lang="ts" setup>
import {ref} from 'vue'
import {useFetchData} from "../composables/useFetchData.ts";
import {useListSort} from "../composables/useListSort.ts";

const tableColumns = ref<{ label: string, key: number }[]>([])
const tableRows = ref<string[]>([])

const fetchData = async (): Promise<void> => {
  const data: {
    columns: string[],
    rows: string[]
  } = await useFetchData('./src/data/huge.json');

  if (data) {
    tableColumns.value = useListSort(data.columns.map(column => {
      return {
        label: column,
        key: parseInt(column.split('_')[1]),
      }
    }), "key")

    tableRows.value = data.rows
  }
}

fetchData()
</script>
<template>
  <div>

    <table>
      <tr>
        <th
          v-for="column in tableColumns"
          :key="column.key"
        >
          {{ column.label }}
        </th>
      </tr>
      <tr
        v-for="row in tableRows"
        :key="row"
      >
        <td
          v-for="column in tableColumns"
          :key="column.key"
        >
          {{ row[column.label] }}
        </td>
      </tr>
    </table>

  </div>
</template>
<style scoped lang="css">

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}


</style>
