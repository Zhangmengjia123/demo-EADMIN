<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive } from 'vue'
import Mentime from '@/components/systemMenu/Mentime.vue';
import { Delete, EditPen } from '@element-plus/icons-vue'
import {Bumen,Zimen} from '@/api/api'
interface User {
  id: number
  date: string
  name: string
  address: string
  hasChildren?: boolean
  children?: User[]
}
const input = ref('')
const value = ref('')
const good=ref([])
const list=reactive({
	page:0,
	size:10
})
const goods: User[] = reactive({
	list: []
})
const load = (
  row: User,
  treeNode: unknown,
  resolve: (date: User[]) => void
) => {
  setTimeout(() => {

		Zimen(row.id).then(res=>{
     console.log(res);
      good.value=res.content
			resolve(good.value)
		})
  }, 1000)
}
const getIndex=()=>{
	Bumen(list).then(res=>{
   goods.list=res.content
	})
}
getIndex()
</script>
<template>
	<div>
		<div class="top">
			<el-input v-model="input" placeholder="输入部门名称搜索" clearable />
			<Mentime style="margin-right: 10px;"></Mentime>
			<el-select v-model="value" class="m-2" placeholder="状态">
				<el-option style="width: 100px;" key="item.value" label="label" value="value" />
			</el-select>
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
			<el-table :data="goods.list" style="width: 100%" row-key="id"  lazy :load="load"
				:tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
				<el-table-column type="selection" />
				<el-table-column prop="name" label="名称" width="300" />
				<el-table-column prop="deptSort" label="排序" width="500" />
				<el-table-column prop="enabled" label="状态">
					<template #default="scope">
						<el-switch v-model="scope.row.enabled" :active-value="1" :inactive-value="0" />
					</template>
				</el-table-column>

				<el-table-column prop="createTime" label="创建时间"></el-table-column>
				<el-table-column prop="address" label="操作">
					<template #default="scope">
						<el-button type="primary" :icon="EditPen" />
						<el-button type="danger" :icon="Delete" />
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.top {
	display: flex;
	// width: 60%;

	.el-input {
		margin-right: 10px;
		width: 200px;
	}
}

.top1 {
	margin-top: 10px;
}
</style>
