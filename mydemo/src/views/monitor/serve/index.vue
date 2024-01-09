<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, onUnmounted,watchEffect,provide } from 'vue'
import FUZ from '@/components/FUWU/FUZ.vue'
import FUY from '@/components/FUWU/FUY.vue'
import { FuWu } from '@/api/api'
const GetFu = () => {
	FuWu().then(res => {
		list.sys = res.sys
		cpu.cpu1 = Number(res.cpu.used)
		cpu.memory = Number(res.memory.usageRate)
		cpu.swap = res.swap.usageRate
		cpu.disk = Number(res.disk.usageRate)
		list.cup11 = res.cpu
		list.memory = res.memory
		list.swap = res.swap
		list.disk = res.disk
	})
}
const list = reactive({
	sys: {},
	cup11: {},
	memory: {},
	swap: {},
	disk: {}
})
const cpu = reactive({
	cpu1: 0,
	memory: 0,
	swap: 0,
	disk: 0
})
const id = ref(null)
const ID = ref(null)

let TIM = setInterval(() => {
	GetFu()
	id.value.Timeder()
	ID.value.TimeDER()
}, 1000)

watchEffect(()=>{
	localStorage.setItem('cpu',cpu.cpu1)
	localStorage.setItem('cpu1',cpu.memory)
})

onUnmounted(() => {
	clearInterval(TIM)
})
</script>
<template>
	<div>
		<el-card class="box-card">
			<div class="to">系统：{{ list.sys.os }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>IP：{{ list.sys.ip
			}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>项目已不间断运行{{ list.sys.day }}</span> </div>
		</el-card>

		<el-card class="card">
			<template #header>
				<div class="card-header">
					<span>状态</span>
				</div>
			</template>
			<div class="box">
				<div class="box-list">
					<p>CPU使用率</p>
					<el-progress type="dashboard" :percentage="cpu.cpu1" />
					<p>{{ list.cup11.coreNumber }}核心</p>
				</div>
				<div class="box-list">
					<p>内存使用率</p>
					<el-progress type="dashboard" :percentage="cpu.memory" />
					<p>{{ list.memory.used }}/{{ list.memory.total }}</p>
				</div>
				<div class="box-list">
					<p>交换区使用率</p>
					<el-progress type="dashboard" :percentage="cpu.swap" />
					<p>{{ list.swap.used }}/{{ list.swap.total }}</p>
				</div>
				<div class="box-list">
					<p>磁盘使用率</p>
					<el-progress type="dashboard" :percentage="cpu.disk" />
					<p>{{ list.disk.used }}/{{ list.disk.total }}</p>
				</div>
			</div>
		</el-card>
		<div class="fot">
			<div id="z">
				<el-card class="box-card">
					<template #header>
						<div class="card-header">
							<span>CPU使用率监控</span>
						</div>
					</template>
					<FUZ ref="id"></FUZ>
				</el-card>
			</div>
			<div id="y">
				<el-card class="box-card">
					<template #header>
						<div class="card-header">
							<span>内存使用率监控</span>
						</div>
					</template>
					<FUY ref="ID"></FUY>
				</el-card>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.fot {
	display: flex;
	margin-top: 10px;

	#z {
		width: 50%;
		height: 200px;
	}

	#y {
		width: 49%;
		margin-left: 10px;
		height: 200px;
	}
}

.to {
	font-size: 13px;
}

.box-card {
	margin-bottom: 10px;
}

.card {
	height: 40%;
}

.box {
	p {
		margin-bottom: 10px;
	}

	text-align: center;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
</style>
