<template>
	<!-- vue3页面 -->
	<div>
		<!-- 头部搜索框和重置 -->

		<div class="block">
			<el-input v-model="input1" placeholder="输入任务名称搜索" clearable />
			<el-date-picker v-model="input2" type="daterange" range-separator=":" start-placeholder="开始任务"
				end-placeholder="结束日期" :size="size" />

			&emsp;

			<el-button type="success" @click="search">搜索</el-button>
			<el-button type="warning" @click="clear">重置</el-button>
		</div>

		<br />
		<!-- 新增导出等渲染功能 -->
		<el-button type="primary" @click="dialogVisible2 = true">新增</el-button>
		<el-button type="success" disabled>修改</el-button>
		<el-button type="danger" disabled>删除</el-button>
		<el-button type="warning" @click="exportDataToExcel">导出</el-button>
		<el-button type="info">日志</el-button>
		<br />

		<!-- 表格渲染 -->
		<div class="table">
			<el-table :data="mylist" stripe style="width: 100%">
				<el-table-column label="#">
					<el-input type="checkbox" v-model="flag" style="width: 20px;height: 20px;"></el-input>
				</el-table-column>
				<el-table-column prop="id" label="任务ID" />
				<el-table-column prop="jobName" label="任务名称" />
				<el-table-column prop="beanName" label="Bean名称" />
				<el-table-column prop="methodName" label="执行方法" />
				<el-table-column prop="params" label="参数" />
				<el-table-column prop="cronExpression" label="cron表达式" />
				<el-table-column prop="isPause" label="状态">
					<el-button type="warning" plain>已暂停</el-button>
				</el-table-column>
				<el-table-column prop="description" label="描述" />
				<el-table-column prop="createTime" label="创建日期" />
				<el-table-column label="操作">
					<template #default="scope" class="span111">
						<span  @click="edit(scope.row)">编辑</span>
						<span >执行</span>
						<span >恢复</span>
						<el-popconfirm confirm-button-text="Yes" cancel-button-text="No" :icon="InfoFilled" icon-color="#626AEF"
							title="确定停止并删除该任务吗?" @confirm="confirmEvent" @cancel="cancelEvent">
							<template #reference>
								<span >删除</span>

							</template>
						</el-popconfirm>
					</template>

				</el-table-column>
			</el-table>
		</div>
		<!-- 编辑模态框 -->
		<el-dialog v-model="dialogVisible" title="编辑定时任务" width="45%" :before-close="handleClose">
			<span style="display: flex;flex-wrap: wrap;">
				<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
					:size="formSize" status-icon>
					<el-form-item label="任务名称" prop="jobName1">
						<el-input v-model="ruleForm.jobName1" />
					</el-form-item>
					<el-form-item label="任务描述" prop="description1">
						<el-input v-model="ruleForm.description1" />
					</el-form-item>
					<el-form-item label="Bean名称" prop="beanName1">
						<el-input v-model="ruleForm.beanName1" />
					</el-form-item>
					<el-form-item label="执行方法" prop="methodName1">
						<el-input v-model="ruleForm.methodName1" />
					</el-form-item>
					<el-form-item label="Cron表达式" prop="cronExpression1">
						<el-input v-model="ruleForm.cronExpression1" />
					</el-form-item> <el-form-item label="子任务ID" prop="id2">
						<el-input v-model="ruleForm.id2" placeholder="  多个用逗号隔开，按顺序执行" />
					</el-form-item>
					<el-form-item label="任务负责人" prop="id3">
						<el-input v-model="ruleForm.id3" />
					</el-form-item>
					<el-form-item label="告警邮箱" prop="email1">
						<el-input v-model="ruleForm.email1" placeholder="  多个邮箱用逗号隔开" />
					</el-form-item>
					<el-form-item label="失败后暂停">
						是 否

					</el-form-item>
					<el-form-item label="任务状态" prop="isPause1">
						启用 暂停
						<!-- <el-input v-model="ruleForm.isPause1" /> -->
					</el-form-item>
					<el-form-item label="参数内容" prop="params1">
						<el-input v-model="ruleForm.params1" />
					</el-form-item>
				</el-form>






			</span>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="handleClose">
						确定
					</el-button>
				</span>
			</template>
		</el-dialog>
		<!-- 新建模态框 -->
		<el-dialog v-model="dialogVisible2" title="新建定时任务" width="45%" :before-close="handleClose2">
			<span style="display: flex;flex-wrap: wrap;">
				<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
					:size="formSize" status-icon>
					<el-form-item label="任务名称" prop="jobName1">
						<el-input v-model="ruleForm.jobName1" />
					</el-form-item>
					<el-form-item label="任务描述" prop="description1">
						<el-input v-model="ruleForm.description1" />
					</el-form-item>
					<el-form-item label="Bean名称" prop="beanName1">
						<el-input v-model="ruleForm.beanName1" />
					</el-form-item>
					<el-form-item label="执行方法" prop="methodName1">
						<el-input v-model="ruleForm.methodName1" />
					</el-form-item>
					<el-form-item label="Cron表达式" prop="cronExpression1">
						<el-input v-model="ruleForm.cronExpression1" />
					</el-form-item> <el-form-item label="子任务ID" prop="id2">
						<el-input v-model="ruleForm.id2" placeholder="  多个用逗号隔开，按顺序执行" />
					</el-form-item>
					<el-form-item label="任务负责人" prop="id3">
						<el-input v-model="ruleForm.id3" />
					</el-form-item>
					<el-form-item label="告警邮箱" prop="email1">
						<el-input v-model="ruleForm.email1" placeholder="  多个邮箱用逗号隔开" />
					</el-form-item>
					<el-form-item label="失败后暂停">
						是 否

					</el-form-item>
					<el-form-item label="任务状态" prop="isPause1">
						启用 暂停
						<!-- <el-input v-model="ruleForm.isPause1" /> -->
					</el-form-item>
					<el-form-item label="参数内容" prop="params1">
						<el-input v-model="ruleForm.params1" />
					</el-form-item>
				</el-form>






			</span>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogVisible2 = false">取消</el-button>
					<el-button type="primary" @click="handleClose2">
						确定
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import * as XLSX from 'xlsx';

import { ElMessageBox, ElNotification } from 'element-plus'
import { defineComponent, reactive, ref, computed } from 'vue'
import { Calendar, Search } from '@element-plus/icons-vue'
import { listApi, editApi, searchApi } from '../api/api'
import type { FormInstance, FormRules } from 'element-plus'
import { InfoFilled } from '@element-plus/icons-vue'
import { getToken, setToken } from '@/utils/auth';
//日期

// import { id } from 'element-plus/es/locale'
const input1 = ref('')
const input2 = ref('')
const flag = ref(['true'])
const mylist = ref([])
const page = ref('0')
const size = ref('10')
// 表单类型定义
interface RuleForm {
	jobName1: string
	description1: string
	beanName1: string
	methodName1: string
	cronExpression1: string
	// delivery: boolean
	// type: string[]
	id2: string
	email1: string
	isPause1: string
	id3: string
	params1: string
}


const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
	jobName1: '',
	description1: '',
	beanName1: '',
	methodName1: '',
	cronExpression1: '',
	id2: '',
	id3: '',
	email1: '',
	isPause1: '',
	params1: '',

})
//正则
const rules = reactive<FormRules<RuleForm>>({
	jobName1: [
		{ required: true, message: '请输入任务名称', trigger: 'blur' }
		// { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
	],
	description1: [
		{ required: true, message: '请输入任务描述', trigger: 'blur' }
		// { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
	],
	beanName1: [
		{ required: true, message: '请输入Bean名称', trigger: 'blur' }
		// { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
	],
	methodName1: [
		{ required: true, message: '请输入执行方法', trigger: 'blur' }
		// { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
	],
	cronExpression1: [
		{ required: true, message: '请输入Cron表达式', trigger: 'blur' }
		// { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
	],
	id2: [
		{ required: true, message: '请输入子任务ID', trigger: 'blur' }
		// { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
	],
	id3: [
		{ required: true, message: '请输入任务负责人', trigger: 'blur' }
		// { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
	],
	email1: [
		{ required: true, message: '请输入告警邮箱', trigger: 'blur' }
		// { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
	],
	isPause1: [
		{ required: true, message: '请选择失败后暂停', trigger: 'blur' }
		// { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
	],
	params1: [
		{ required: true, message: '请输入参数内容', trigger: 'blur' }
		// { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
	]
})
// 获取表格数据  接口参数
const li = () => {
	listApi({
		page: page.value,
		size: size.value,
		id: '',
		desc: ''
	}).then((res) => {
		// console.log(res)
		mylist.value = res.content
		// console.log(mylist.value, '1112')
	})
}
li()
let dialogVisible = ref(false)
let dialogVisible2 = ref(false)
//编辑按钮
const datas = reactive({
	jobName1: '',
	description1: '',
	beanName1: '',
	methodName1: '',
	cronExpression1: '',
	id2: '',
	id3: '',
	email1: '',
	isPause1: '',
	params1: '',
})
const edit = (row) => {
	dialogVisible.value = true
	console.log(row)
	ruleForm.jobName1 = row.jobName
	ruleForm.beanName1 = row.beanName
	ruleForm.methodName1 = row.methodName
	ruleForm.params1 = row.params
	ruleForm.cronExpression1 = row.cronExpression
	ruleForm.isPause1 = row.isPause
	ruleForm.createTime1 = row.createTime
	ruleForm.description1 = row.description
}
console.log(datas, '我是datas')
// 确定关闭/编辑
const handleClose = () => {
	ElMessageBox.confirm('确定关闭/编辑吗?')
		.then(() => {
			dialogVisible.value = false
			editApi(datas.value).then((res) => {
				console.log(res,'222')
				// mylist.jobName	=ruleForm.jobName1
				// mylist.beanName=ruleForm.beanName1
				// mylist.methodName=ruleForm.methodName1
				// mylist.params=ruleForm.params1
				// mylist.cronExpression=ruleForm.cronExpression1
				// mylist.isPause=ruleForm.isPause1
				// mylist.createTime=	ruleForm.createTime1
				// mylist.description=ruleForm.description1
				// console.log(mylist.jobName)


			})
		})
		.catch(() => {
			dialogVisible.value = true

		})
}
// 新增
const handleClose2 = () => {
	ElMessageBox.confirm('确定关闭/编辑吗?')
		.then(() => {
			ElNotification({
				title: 'Error',
				message: '演示环境不支持新增任务！',
				type: 'error',
			})

			dialogVisible2.value = false
		})
		.catch(() => {
			dialogVisible2.value = true

		})
}
//删除
const confirmEvent = () => {
	console.log('确定!')
	ElNotification({
		title: 'Error',
		message: '演示环境不支持删除任务！',
		type: 'error',
	})
}
const cancelEvent = () => {
	console.log('取消!')
}
//导出
const exportDataToExcel = () => {
	const data = mylist.value
	console.log(data)
	const ws = XLSX.utils.json_to_sheet(data);
	const wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

	XLSX.writeFile(wb, 'data.xlsx');
}




//搜索
const search = () => {
	console.log(input1.value)
	searchApi({
		page: page.value,
		size: size.value,
		id: '',
		desc: '',
		jobName: input1.value
	}).then((res) => {
		console.log(res, '搜索')
		mylist.value = res.content
	})
}




</script>

<style scoped>
.el-input {
	width: 250px;
	margin: 15px;
}

.el-button {
	/* color: #fff; */
	font-size: 12px;
}

a {
	color: #1890ff;
	text-decoration: none;
	font-size: 12px;
	margin-left: 5px;
}

span {
	width: 100%;
	display: inline-block;
}
.span111{
	display: flex;
	font-size: 12px;
	align-items: center;
	justify-content: space-around;
}
</style>
