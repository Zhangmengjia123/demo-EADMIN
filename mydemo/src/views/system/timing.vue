<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive } from 'vue'
import Mentime from '@/components/systemMenu/Mentime.vue';
import { Delete, EditPen } from '@element-plus/icons-vue'
import { h } from 'vue'
import { ElNotification } from 'element-plus'
import { RenIndex } from '@/api/api'
import { fa } from 'element-plus/es/locale';
const input = ref('')
const tableData = ref()
const list = reactive({
	page: 0,
	size: 10
})
const visible = ref(false)
const total = ref()
// 分页
const handleCurrentChange = () => {

}
const handleSizeChange = () => {

}
// 表格数据
const Getindex = () => {
	RenIndex(list).then(res => {
		console.log(res);
		tableData.value = res.content
		total.value = res.totalElements
	})
}
Getindex()

// 按钮
const Hui = () => {
	ElNotification({
		message: '演示环境请使用执行按钮运行任务！',
		duration: 2000,
		type: 'error',
	})
}
const Zhi = () => {
	ElNotification({
		message: '执行成功',
		type: 'success',
	})
}
const Que=()=>{
	ElNotification({
		message: '演示环境请不支持删除定时任务！',
		duration: 2000,
		type: 'error',
	})

}
</script>
<template>
	<div>
		<div class="box">
			<div class="top">
				<el-input v-model="input" placeholder="输入部门名称搜索" clearable />
				<Mentime style="margin:0 10px;"></Mentime>
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
				<el-button type="info">
					<el-icon>
						<Tickets />
					</el-icon>
					导出
				</el-button>
			</div>
			<!-- tab表格 -->
			<el-table ref="multipleTableRef" :data="tableData" style="width: 100%">
				<el-table-column type="selection" />
				<el-table-column property="id" label="任务ID" />
				<el-table-column property="jobName" label="任务名称" />
				<el-table-column property="beanName" label="Bean名称" />
				<el-table-column property="methodName" label="执行方法" />
				<el-table-column property="params" label="参数" />
				<el-table-column property="cronExpression" label="cron表达式" />
				<el-table-column property="isPause" label="状态">
					<template #default="scope">
						<el-button type="warning" plain>{{ scope.row.isPause ? '已暂停' : '启用' }}</el-button>
					</template>
				</el-table-column>
				<el-table-column property="description" label="描述" />
				<el-table-column property="createTime" label="创建日期" />
				<el-table-column label="操作" width="160" align="center" show-overflow-tooltip>
					<template #default="scoped">
						<span>编辑</span>
						<span @click="Zhi">执行</span>
						<span @click="Hui">恢复</span>
						<el-popconfirm title="确定停止并删除该任务吗？" @confirm="Que" confirm-button-text="确定" cancel-button-text="取消">
							<template #reference>
								<span>删除</span>
							</template>
						</el-popconfirm>

					</template>
				</el-table-column>
			</el-table>
			<el-pagination v-model:current-page="list.page" v-model:page-size="list.size" :page-sizes="[3, 7, 9, 10]"
				layout="total, prev, pager, next,sizes" :total="total" @size-change="handleSizeChange"
				@current-change="handleCurrentChange" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.top {
	display: flex;

	.el-input {
		width: 200px;
	}
}

.el-table {
	font-size: 11px;
}

.top1 {
	margin: 10px 0 20px 0;
}

span {
	color: rgb(12, 72, 238);
	margin: 0 5px;
}
</style>
