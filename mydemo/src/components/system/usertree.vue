<template>
	<div>
		<div class="seatree">
			<el-input v-model="name" placeholder="请输入部门名称" clearable @blur="treesearch"  :prefix-icon="Search"/>
		</div>
		<el-tree :props="props" :data="treedata" :load="loadNode" lazy  @node-click="handleNodeClick"/>
	</div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import { Search} from '@element-plus/icons-vue'
import {queryErtree,queryTree,querysearchdata} from '../../api/api'
import type Node from 'element-plus/es/components/tree/src/model/node'
const emit=defineEmits()
const treedata=ref([])
const name = ref('')
interface Tree {
  name: string
  leaf?: boolean
  }
const props = {
  label: 'name',
  children: [],
}
const loadNode = (node: Node, resolve: (data: Tree[]) => void) => {
	console.log(node.data.id ,'node.level ');
	// 第二层
	if(node.data.id){
		queryErtree(node.data.id).then((res)=>{
     console.log(res,'err');
		 const data: Tree[]=res.content
		 resolve(data)
	})
	}
}
// 左边树状 获取第一层接口
const setTree = () => {
  queryTree().then((res) => {
    treedata.value = res.content
  })
}
const treesearch = () => {
    querysearchdata(name.value).then((res) => {
      console.log(res, 'search')
      treedata.value = res.content
    })
}
const handleNodeClick=(data: { id: string; })=>{
emit('djtree',data.id)
}
setTree()
</script>

<style lang="scss" scoped>

</style>
