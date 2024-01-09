<script setup lang="ts">
import { useRouter,useRoute } from 'vue-router'
import { ref,reactive } from 'vue'
const input1 = ref('')
const shortcuts = [
	{
		text: '今天',
		value: () => {
			const end = new Date()
			const start = new Date()
			start.setTime(start.getTime() - 3600 * 1000)
			return [start, end]
		},
	}, {
		text: '咋天',
		value: () => {
			const end = new Date()
			const start = new Date()
			start.setTime(start.getTime() - 3600 * 1000 * 24)
			return [start, end]
		},
	},
	{
		text: '本周',
		value: () => {
			const end = new Date()
			const start = new Date()
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
			return [start, end]
		},
	}, {
		text: '这个月',
		value: () => {
			const end = new Date()
			const start = new Date()
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 26)
			return [start, end]
		},
	},{
		text: '当前季度',
		value: () => {
			const end = new Date()
			const start = new Date()
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
			return [start, end]
		},
	},
	{
		text: '最近30天',
		value: () => {
			const end = new Date()
			const start = new Date()
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
			return [start, end]
		},
	},{
		text: '<往前一天',
		value: () => {
			const end = new Date()
			const start = new Date()
			console.log(new Date().getTime());
			start.setTime((start.getTime() - 3600 * 1000 * 24)-(24*1000))
			return [start, end]
		},
	},{
		text: '<往后一天',
		value: () => {
			const end = new Date()
			const start = new Date()
			console.log(new Date().getTime());
			start.setTime((start.getTime() - 3600 * 1000 * 24)-(24*1000))
			return [start, end]
		},
	},
]
</script>
<template>
	<div>
		<el-date-picker v-model="input1" type="daterange" value-format="YYYY-MM-DD h:m:s" :shortcuts="shortcuts"
				range-separator=":" start-placeholder="开始日期" end-placeholder="结束日期" />
	</div>
</template>

<style lang="scss" scoped>

</style>

