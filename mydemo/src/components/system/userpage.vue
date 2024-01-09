<template>
	<div class="pages">
		<el-pagination
      :current-page="params.page+1"
      :page-size="params.size"
      :page-sizes="[2, 10, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalElements"
			style="margin-top: 8px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
	</div>
</template>

<script setup lang="ts">
defineProps(['totalElements','params'])
const emit=defineEmits()
const handleSizeChange=(val:number)=>{
console.log(val);
emit('handleSizeChange',val)
}
const handleCurrentChange=(val:number)=>{
console.log(val);
emit('handleCurrentChange',val-1)
}
</script>

<style lang="scss" scoped>

</style>
