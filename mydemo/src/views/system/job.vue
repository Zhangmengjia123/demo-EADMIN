<template>
  <div>
    <div style="display: flex">
      <el-input style="width: 200px; margin-right: 10px" v-model="input" placeholder="输入岗位名称搜索" />
      <!-- <el-date-picker  v-model="input1" type="daterange" value-format="YYYY-MM-DD h:m:s" :shortcuts="shortcuts"
				range-separator=":" start-placeholder="开始日期" end-placeholder="结束日期" /> -->

      <!-- <el-date-picker
        style="margin-right: 10px"
        v-model="input1"
        type="daterange"
        value-format="YYYY-MM-DD h:m:s"
        range-separator=":"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :shortcuts="shortcuts"
      /> -->
			<Mentime></Mentime>
      <el-select v-model="value1" placeholder="状态">
        <el-option label="激活" :value="true" />
        <el-option label="失用" :value="false" />
      </el-select>

      <el-button type="success" :icon="Search">搜索</el-button>
      <el-button type="warning" :icon="RefreshLeft">重置</el-button>
    </div>
    <div style="margin-top: 20px">
      <el-button type="primary" :icon="Search">添加</el-button>
      <el-button type="success" :icon="Edit">修改</el-button>
      <el-button type="danger" :icon="Delete">删除</el-button>
      <el-button type="warning" :icon="Grid">导出</el-button>
    </div>
    <!-- tab表格 -->
    <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column property="name" label="名称" width="120" />
      <el-table-column property="jobSort" label="排序" show-overflow-tooltip />
      <el-table-column property="enabled" label="状态" show-overflow-tooltip>
        <template #default="scoped">
          <el-switch v-model="scoped.row.value1" />
        </template>
      </el-table-column>
      <el-table-column property="createTime" label="创建时间" show-overflow-tooltip />
      <el-table-column label="操作" show-overflow-tooltip>
        <template #default="scoped">
          <el-button :icon="Edit" type="primary"></el-button>
          <el-button :icon="Delete" type="danger"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-model:current-page="page"
      v-model:page-size="size"
      :page-sizes="[3, 7, 9, 10]"
      layout="total, prev, pager, next,sizes"
      :total="4"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { Delete, Edit, Search, Share, Upload, Download, Refresh, Grid, RefreshLeft } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import {gangIndex} from '@/api/api'
import Mentime from '@/components/systemMenu/Mentime.vue'
import { number } from 'echarts';
const input = ref('')
const input1 = ref('')
const value1 = ref('')
const tableData = ref([])
const total1 = ref(0)
const gwlb = reactive<{page:number,size:number}>({
  page: 0,
  size: 10
})
/**岗位列表 */
const getlist = () => {
  gangIndex(gwlb).then((res) => {
    console.log(res, '1212312313213213213213213')
    tableData.value = res.content
    total1.value =res.content.totalElements
  })
}

/**分页事件 */
const handleSizeChange = (val: number) => {
    gwlb.size=val
getlist()

}
const handleCurrentChange = (val: number) => {
    gwlb.page=val
getlist()

}


getlist()
</script>
<style lang="scss" scoped>
.el-date-editor el-date-editor--daterange el-input__wrapper el-range-editor el-tooltip__trigger el-tooltip__trigger {
  width: 200px !important;
}
</style>
