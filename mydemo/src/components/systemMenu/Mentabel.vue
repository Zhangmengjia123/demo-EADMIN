<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive } from 'vue'
import { Delete, EditPen } from '@element-plus/icons-vue'
import { CaiIndex, CaiChil } from '@/api/api'
const data = reactive<{ page: number, size: number, sort: string }>({
	page: 0,
	size: 10,
	sort: 'id' + ',' + 'desc'
})

interface User {
	id: number
	date: string
	name: string
	address: string
	hasChildren?: boolean
	children?: User[]
}
const chil = ref([])
const load = (row: User, treeNode: unknown, resolve: (data: User[]) => void) => {
	setTimeout(() => {
		CaiChil(row.id).then(res => {
			console.log(res);
			chil.value = res.content
			resolve(chil.value)
		})
	}, 1000)
}
const goods: User[] = reactive({
	list: []
})

CaiIndex(data).then(res => {
	console.log(res.content);
	goods.list = res.content
})
</script>
<template>
	<div>
		<el-table :data="goods.list" style="width: 100%; font-size: 14px;" row-key="id" lazy :load="load"
			:tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
			<el-table-column type="selection" />
			<el-table-column prop="title" label="菜单标题" />
			<el-table-column prop="address" label="图标" />
			<el-table-column prop="menuSort" label="排序" />
			<el-table-column prop="address" label="权限表示" />
			<el-table-column prop="address" label="组件路径" />
			<el-table-column prop="hasChildren" label="外链">
				<template #default="scope">
					{{ scope.row.hasChildren == true ? '是' : '否' }}
				</template>
			</el-table-column>
			<el-table-column prop="cache" label="缓存">
				<template #default="scope">
					{{ scope.row.cache == true ? '是' : '否' }}
				</template>
			</el-table-column>
			<el-table-column prop="hidden" label="可见">
				<template #default="scope">
					{{ scope.row.hidden == true ? '是' : '否' }}
				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="创建日期" />
			<el-table-column label="操作">
				<template #default="scope">
					<el-button type="primary" :icon="EditPen" />
					<el-button type="danger" :icon="Delete" />
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<style lang="scss" scoped></style>

