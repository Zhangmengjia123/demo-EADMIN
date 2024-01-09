<script setup lang="ts">
import Mentime from '@/components/systemMenu/Mentime.vue'
import Mentabel from '@/components/systemMenu/Mentabel.vue'
import { useRouter, useRoute } from 'vue-router'
import { wa } from '@/api/api'
import { ref, reactive } from 'vue'
const input = ref('')
const data = reactive({
	beanName: "testTask",
	createBy: "admin",
	createTime: "2020-05-05 20:35:41",
	cronExpression: "0 0/1 * * * ?",
	description: "测试323",
	email: "", id: 6,
	isPause: true,
	jobName: "测试888888",
	methodName: "run2",
	params: null,
	pauseAfterFailure: true,
	personInCharge: "Zheng Jie",
	subTask: null,
	updateBy: "admin",
	updateTime: "2023-12-27 22:14:01",
})
wa(data).then(res => {
	console.log(res, '4545445445454444444444444444');

})
</script>
<template>
	<div>
		<div class="top">
			<el-input v-model="input" placeholder="模糊搜索" clearable />
			<Mentime></Mentime>
			<el-button type="success">
				<el-icon>
					<Search />
				</el-icon>
				搜索
			</el-button>
			<el-button type="warning">
				<el-icon>
					<RefreshLeft />
				</el-icon>
				重置
			</el-button>
		</div>
		<div class="top1">
			<el-button type="primary">
				<el-icon>
					<Plus />
				</el-icon>
				新增
			</el-button>
			<el-button type="success">
				<el-icon>
					<EditPen />
				</el-icon>
				搜索
			</el-button>
			<el-button type="danger">
				<el-icon>
					<DeleteFilled />
				</el-icon>
				删除
			</el-button>
			<el-button type="warning">
				<el-icon>
					<Download />
				</el-icon>
				导出
			</el-button>
		</div>
		<div class="tab">
			<Mentabel></Mentabel>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.top {
	display: flex;
	width: 50%;
	justify-content: space-around;

	.el-input {
		width: 200px;
	}
}

.top1 {
	margin-top: 10px;
}
</style>
