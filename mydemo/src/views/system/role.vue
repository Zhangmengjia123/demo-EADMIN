<template>
	<div class="app-container">
		<div class="head-container">
			<div class="TOP" v-show="searchBox">
				<div class="filterInput" style="width: 200px">
					<el-input v-model="input" placeholder="输入名称或者描述搜索" clearable />
				</div>
				<div class="DateSelect">
					<el-date-picker v-model="DateValue" type="daterange" unlink-panels range-separator=":" start-placeholder="开始日期"
						end-placeholder="结束日期" :shortcuts="shortcuts" />
				</div>
				<span>
					<el-button type="success" :icon="Search">搜索</el-button>
					<el-button type="warning" :icon="RefreshLeft">重置</el-button>
				</span>
			</div>
			<div class="crud-opts">
				<el-row>
					<el-col :span="16">
						<div class="crud-opts-left">
							<el-button type="primary" :icon="Plus">新增</el-button>
							<el-button type="success" disabled :icon="Edit">修改</el-button>
							<el-button type="danger" disabled :icon="Delete">删除</el-button>
							<el-button type="warning" :icon="Download">导出</el-button>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="crud-opts-right">
							<el-button type="info" plain @click="searchBox = !searchBox">
								<el-icon>
									<Search />
								</el-icon>
							</el-button>
							<el-button>
								<el-icon>
									<Refresh />
								</el-icon>
							</el-button>
							<el-button>
								<el-icon>
									<Grid />
								</el-icon>
							</el-button>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>

		<el-row :gutter="20">
			<el-col :span="16">
				<el-card class="box-card">
					<template #header>
						<div class="card-header">
							<p>角色列表</p>
						</div>
					</template>
					<div class="body">
						<el-table :data="tableData"  style="width: 100%;font-size: 11px;">
							<el-table-column type="selection"  />
							<el-table-column prop="name" label="名称"  />
							<el-table-column prop="dataScope" label="数据权限" />
							<el-table-column prop="level" label="角色级别"  />
							<el-table-column prop="description" label="描述"  />
							<el-table-column prop="createTime" label="创建日期"  />
							<el-table-column fixed="right" label="操作" >
								<template #default>
									<el-button type="primary" :icon="Edit"> </el-button>
									<el-button type="danger" :icon="Delete"> </el-button>
								</template>
							</el-table-column>
						</el-table>

						<el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4"
							:page-sizes="[10, 20, 30, 40, 50, 100]" :disabled="disabled" :total="total"
							layout="total, prev, pager, next ,sizes" @size-change="handleSizeChange"
							@current-change="handleCurrentChange" />
					</div>
				</el-card>
			</el-col>
			<el-col :span="8">
				<div class="crud-opts-left">
					<el-card class="box-card">
						<template #header>
							<div class="card-header">
								<p>菜单分配</p>
								<el-button type="primary" :icon="Check" disabled->保存</el-button>
							</div>
						</template>
						<div class="body">
							<el-tree :props="props" :data="data.list" :load="loadNode" lazy show-checkbox
								@check-change="handleCheckChange" />
						</div>
					</el-card>
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<script setup lang='ts'>
import {
	Search,
	RefreshLeft,
	Delete,
	Edit,
	Download,
	Plus,
	Refresh,
	Grid,
	Check
} from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'

import { getTable, getMenu, RlueZi } from '@/api/api'

const DateValue = ref('')

const shortcuts = [
	{
		text: '今天',
		value: () => {
			const end = new Date()
			const start = new Date()
			start.setTime(start.getTime())
			return [start, end]
		}
	},
	{
		text: '昨天',
		value: () => {
			const end = new Date()
			const start = new Date()
			start.setTime(start.getTime() - 3600 * 1000 * 24)
			end.setTime(start.getTime() - 3600 * 1000 * 24 * 0)
			return [start, end]
		}
	},
	{
		text: '本周',
		value: () => {
			const end = new Date()
			const start = new Date()
			start.setTime(start.getTime())
			return [start, end]
		}
	}
]
// 控制搜索框显示隐藏
const searchBox = ref(true)
interface Tree {
	id: number
	label: string
	children?: Tree[]
}
const table = reactive<{
	page: number
	size: number
	sort: string
}>({
	page: 0,
	size: 10,
	sort: 'level,asc'
})
const tableData = ref([])
const loadNode = (node: {level:number}, resolve: (data: Tree[]) => void) => {
	console.log(node.level, 'node.level ');
	// 第二层
	if (node.level) {
		RlueZi(node.level).then((res) => {
			const data: Tree[] = res
			resolve(data)
		})
	}
}

const total = ref()

const getTableInfo = async () => {
	const res = await getTable(table)
	tableData.value = res.content
	total.value = res.totalElements
}
getTableInfo()

const data = reactive<object>({
	list: []
})

const props = {
	label: 'label',
	isLeaf: 'leaf',
	children: 'children',
}

const getMenuInfo = () => {
	getMenu(0).then((res) => {
		console.log(res)
		data.list = res
	})
}
getMenuInfo()
</script>
<style scoped lang='scss'>
.app-container {
	padding: 20px 20px 45px 20px;
}

.head-container {
	padding-bottom: 10px;

	.TOP {
		display: flex;
		margin-bottom: 10px;
	}

	.DateSelect {
		margin: 0px 10px;
	}

	.crud-opts {
		padding: 4px 0;
	}

	.crud-opts-left {
		.el-icon {
			color: white !important;
		}
	}

	.crud-opts-right {
		width: 100%;
		display: flex;
		justify-content: right;

		.el-button {
			margin: 0px;
			border-radius: 0px;
			border: 1px solid #eee;
		}
	}
}

.box-card .card-header p {
	font-weight: 700;
	color: #303133;
	font-size: 15px;
}

.crud-opts-left .card-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>
