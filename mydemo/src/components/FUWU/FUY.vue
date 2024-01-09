<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive,onMounted } from 'vue'
import * as echarts from 'echarts';
interface TT{
	data:string[]
	time:string
	list:null[]|string[]
}
const goods = reactive<TT>({
	data: [],
	time: '',
	list: []
})


const CC = () => {
	var chartDom = document.getElementById('Y');
	var myChart = echarts.init(chartDom);
	var option;
	option = {
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: goods.data
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

function TimeDER() {
	goods.data.push(goods.time)
	goods.list.push(localStorage.getItem('cpu1'))
// 	if(goods.list.length>=8){
// 	goods.data.splice(0,1)
// }
	CC()
}

defineExpose({
	TimeDER
})

</script>
<template>
	<div id="Y">

	</div>
</template>

<style lang="scss" scoped>
#Y {
	width: 100%;
	height: 400px;
}
</style>
