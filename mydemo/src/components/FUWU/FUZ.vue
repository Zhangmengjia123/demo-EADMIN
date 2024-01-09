<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts';
const goods = reactive({
	data: [],
	time: '',
	list: []
})

const CC = () => {
	var chartDom = document.getElementById('div');
	var myChart = echarts.init(chartDom);
	var option;
	option = {
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: goods.data,
			axisLine: { onZero: true }
		},
		yAxis: {
			min: 0,
			max: 100,
			type: 'value',
			axisLine: { onZero: false }
		},
		series: [
			{
				data: goods.list,
				type: 'line',
				areaStyle: {}
			}
		]
	};
	option && myChart.setOption(option);
	const a = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
	goods.time = a
}

function Timeder() {
	goods.data.push(goods.time)
	goods.list.push(localStorage.getItem('cpu'))
	// if (goods.data.length > 8) {
		// goods.list.shift()
	// }
	console.log(goods.list);

	CC()
}

defineExpose({
	Timeder
})

</script>
<template>
	<div id="div">

	</div>
</template>

<style lang="scss" scoped>
#div {
	width: 100%;
	height: 400px;
}
</style>
