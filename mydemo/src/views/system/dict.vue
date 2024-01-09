<template>
	<div>
		<el-row>
			<el-col :span="10">
				<el-card class="box-card">
					<div class="top">
						<el-input v-model="input" placeholder="输入部门名称搜索" clearable />
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
					<!-- tab表格 -->
					<el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @row-click="getSelectionRows">
						<el-table-column type="selection" />
						<el-table-column property="name" label="名称" />
						<el-table-column property="description" label="描述" />
						<el-table-column label="操作" show-overflow-tooltip>
							<template #default="scoped">
								<el-button :icon="Edit" type="primary"></el-button>
								<el-button :icon="Delete" type="danger"></el-button>
							</template>
						</el-table-column>
					</el-table>
					<!-- 分页 -->
					<el-pagination v-model:current-page="list.page" v-model:page-size="list.size" :page-sizes="[3, 7, 9, 10]"
						layout="total, prev, pager, next,sizes" :total="total" @size-change="handleSizeChange"
						@current-change="handleCurrentChange" />
				</el-card>
			</el-col>
			<el-col :span="13" style="margin-left: 10px;">
				<el-card class="box-card">
					<template #header>
						<div class="card-header">
							<span>字典详细</span>
						</div>
					</template>
					<div class="ziti" v-if="tableData1.length==0">
						点击字典查看详细
					</div>
				<div class="fot" v-else>
						<!-- tab表格 -->
						<el-table  ref="multipleTableRef" :data="tableData1" style="width: 100%" >
						<el-table-column property="name" label="所属字典" />
						<el-table-column property="label" label="字典标签" />
						<el-table-column property="value" label="字典值" />
						<el-table-column property="dictSort" label="排序" />
						<el-table-column label="操作" show-overflow-tooltip>
							<template #default="scoped">
								<el-button :icon="Edit" type="primary"></el-button>
								<el-button :icon="Delete" type="danger"></el-button>
							</template>
						</el-table-column>
					</el-table>
					<!-- 分页 -->
					<el-pagination v-model:current-page="list.page" v-model:page-size="list.size" :page-sizes="[3, 7, 9, 10]"
						layout="total, prev, pager, next,sizes" :total="2" @size-change="handleSizeChange"
						@current-change="handleCurrentChange" />
				</div>
				</el-card>
			</el-col>
		</el-row>

		<div class="tab">
			<cdtable></cdtable>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import { ZiIndex, YouIndex } from '@/api/api'
const input = ref('')
const value = ref('')
const total = ref(0)
const list = reactive({
	page: 0,
	size: 10,
	dictName: ''
})
const tableData = ref([])
const tableData1 = ref([])
const name = reactive({
	name1: [
		{ na: '' },
		{ na: '' }
	]
})


// 表格
const getSelectionRows = (row: { name: string; }) => {

	list.dictName = row.name
	YouIndex(list).then(res => {
		tableData1.value = res.content
		tableData1.value.forEach((item:{name:string})=>{
			item.name=''
			item.name=row.name
		})
		console.log(tableData1.value);


	})

}
// 分页
const handleCurrentChange = () => {

}
const handleSizeChange = () => {

}




const getIndex = () => {
	ZiIndex(list).then(res => {
		console.log(res);
		tableData.value = res.content
		total.value = res.totalElements
	})
}
getIndex()
</script>

<style lang="scss" scoped>
.ziti {
	height: 40px;
	border-left: 5px solid #ccc;
	line-height: 40px;
	padding-left: 10px;
}

.top {
	display: flex;

	.el-input {
		margin-right: 10px;
		width: 200px;
	}
}

.top1 {
	margin-top: 10px;
}
</style>
