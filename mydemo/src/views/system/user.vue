<template>
  <div class="use">
    <div class="buttom">
      <el-row :gutter="23" justify="space-between">
        <el-col :span="5">
          <div class="grid-content ep-bg-purple">
            <!-- 树形结构 -->
            <usertree @djtree="djtree"></usertree>
          </div>
        </el-col>

        <el-col :span="18">
          <div class="grid-content ep-bg-purple">
            <userseach @namesearch="namesearch"></userseach>
            <div class="btn">
              <el-button type="primary" :icon="Plus" @click="add">新增</el-button>
              <el-button type="success" :icon="EditPen" @click="edit">修改</el-button>
              <el-button type="danger" :icon="Delete" @click="delall">删除</el-button>
              <el-button type="warning" :icon="Download" @click="xlsx">导出</el-button>
              <el-button type="primary" :icon="RefreshLeft" @click="Apassword">重置密码</el-button>
            </div>
            <!-- 表格 -->
            <usertabel :tableData="tableData" @del="del"></usertabel>
            <!-- 分页 -->
            <div class="paging">
              <userpage
                :totalElements="totalElements"
                :params="params"
                @handleCurrentChange="handleCurrentChange"
                @handleSizeChange="handleSizeChange"
              >
              </userpage>
            </div>
          </div>
        </el-col>
      </el-row>
      <userdialog :dialogFormVisible="dialogFormVisible" @qd="qd"  @qx="qx"></userdialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import userseach from '../../components/system/userseach.vue'
import usertabel from '../../components/system/usertabel.vue'
import usertree from '@/components/system/usertree.vue'
import userpage from '@/components/system/userpage.vue'
import userdialog from '@/components/system/userdialog.vue'
import { ref, reactive } from 'vue'
import { Plus, Delete, EditPen, RefreshLeft, Download } from '@element-plus/icons-vue'
  import {querynametable } from '../../api/api'
// 右侧表格
const dialogFormVisible = ref(false)
/**表格数据 */
const tableData = ref([])
const totalElements = ref(0)
const params = reactive({
  page: 0,
  size: 10,
  blurry: '',
  enabled: true,
  createTime: [],
  deptId: 0
})
/**修改显示模态框事件 */
const edit = ()=>{}
/**选中删除事件 */
const delall = ()=>{}
/**导出事件 */
const xlsx = ()=>{}
/**重置密码事件 */
const Apassword = ()=>{}
/**新增显示模态框 */
const add = ()=>{
    dialogFormVisible.value = true

}
/**列表删除事件 */
const del =(id:number)=>{

}
const djtree = (val: number) => {
  params.deptId = val
  querynametable(params).then((res) => {
		console.log(res.content,'564165165165165151651')
    tableData.value = res.content
    totalElements.value = res.totalElements
  })
  settable(params)
}
//右侧表格接口
const settable = () => {
  querynametable(params).then((res) => {
    tableData.value = res.content
    totalElements.value = res.totalElements
  })
}
settable()
const handleCurrentChange = (val: number) => {
  params.page = val
  settable()
}
const handleSizeChange = (val: number) => {
  params.size = val
  settable()
}
// 表格搜索
const namesearch = (val: { blurry: string; enabled: boolean; createTime: never[] }) => {
  params.blurry = val.blurry
  params.enabled = val.enabled
  params.createTime = val.createTime
  settable(params)
  querynametable(params).then((res) => {
    tableData.value = res.content
    totalElements.value = res.totalElements
  })
}
/**关闭模态框事件 */
const qx = ()=>{
    dialogFormVisible.value = false
}
const qd = ()=>{
    dialogFormVisible.value = false
}
</script>
<style lang="scss" scoped>
.use {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 10px;
}
.btn {
  margin-bottom: 10px;
}
</style>
