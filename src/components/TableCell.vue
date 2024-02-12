<script lang="ts" setup>
defineProps<{
	text: string;
}>();
</script>

<template>
	<div class="table-cell">{{ text }}</div>
</template>

<style lang="css">
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
</style>
