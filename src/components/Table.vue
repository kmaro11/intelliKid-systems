<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {useFetchData} from "../composables/useFetchData.ts";
import {useListSort} from "../composables/useListSort.ts";
import {useVirtualList} from "@vueuse/core";

const tableColumns = ref<{ label: string, key: number }[]>([])
const tableRows = ref<Record<string, string>[]>([])

const fetchData = async (): Promise<void> => {
  const data: {
    columns: string[],
    rows: Record<string, string>[]
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

const getRowCellText = (row: Record<string, string>, column: string): string => {
  return row[column]
}

const {list, containerProps, wrapperProps} = useVirtualList(
    tableRows,
    {
      itemHeight: 40,
    }
);

onMounted(() => fetchData())
</script>
<template>
  <div class="table">
    <div v-bind="containerProps" style="max-height: 90vh; height: 100%" >
      <div class="table-row--header table-row">
        <div
            v-for="column in tableColumns"
            :key="column.key"
            class="table-cell"
        >
          {{ column.label }}
        </div>
      </div>

      <div v-bind="wrapperProps">
        <div
            v-for="{ index, data } in list"
            :key="index"
            class="table-row"
        >
          <div
              v-for="column in tableColumns"
              :key="column.key"
              class="table-cell"
          >
            {{ getRowCellText(data, column.label) }}
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<style scoped lang="css">
.table{
  --main-grey-color: #ececec;
}

.table-row {
  display: flex;
}

.table-cell {
  width: 80px;
  padding: 8px;
  flex-shrink: 0;
  border-right: 1px solid var(--main-grey-color);
  border-bottom: 1px solid var(--main-grey-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


.table-row--header .table-cell {
  font-weight: 700;
  border-top: 1px solid var(--main-grey-color);
}

.table-row .table-cell:last-of-type {
  border-right: none;
}
</style>
