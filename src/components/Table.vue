<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useFetchData } from '../composables/useFetchData.ts';
import { useVirtualList } from '@vueuse/core';
import TableCell from './TableCell.vue';

const tableColumns = ref<string[]>([]);
const tableRows = ref<Record<string, string>[]>([]);

const fetchData = async (): Promise<void> => {
	const data: {
		columns: string[];
		rows: Record<string, string>[];
	} = await useFetchData('./src/data/huge.json');

	if (data) {
		tableColumns.value = data.columns.sort((a, b) =>
			a.localeCompare(b, undefined, { numeric: true }),
		);

		tableRows.value = data.rows;
	}
};

const getRowCellText = (
	row: Record<string, string>,
	column: string,
): string => {
	return row[column];
};

const { list, containerProps, wrapperProps } = useVirtualList(tableRows, {
	itemHeight: 40,
});

onMounted(() => fetchData());
</script>
<template>
	<div class="table">
		<div v-bind="containerProps" style="max-height: 90vh; height: 100%">
			<div class="table-row--header table-row">
				<TableCell
					v-for="column in tableColumns"
					:key="column"
					:text="column"
				/>
			</div>

			<div v-bind="wrapperProps">
				<div
					v-for="{ index, data } in list"
					:key="index"
					class="table-row"
				>
					<TableCell
						v-for="column in tableColumns"
						:key="column"
						:text="getRowCellText(data, column)"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="css">
.table {
	--main-grey-color: #ececec;
}

.table-row {
	display: flex;
}

.table-row--header .table-cell {
	font-weight: 700;
	border-top: 1px solid var(--main-grey-color);
}

.table-row .table-cell:last-of-type {
	border-right: none;
}
</style>
