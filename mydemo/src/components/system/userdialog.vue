<template>
  <div>
    <el-dialog v-model="pro.dialogFormVisible" title="新增用户">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="岗位" :label-width="formLabelWidth">
          <el-select v-model="form.value1" multiple placeholder="请选择" style="width: 240px">
            <el-option v-for="(item, index) in volumedata" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="form.value1" multiple placeholder="请选择" style="width: 240px">
            <el-option v-for="(item, index) in rolesdata" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="qx">取消</el-button>
          <el-button type="primary" @click="qd"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, defineProps,defineEmits } from 'vue'
import { queryvolume, queryroles } from '../../api/api'
/**子传父 */
const emits = defineEmits()
/**父组件传递过来的 */
const pro = defineProps({
  dialogFormVisible: Boolean
})
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
  value1: ''
})
const volumedata = ref([])
const rolesdata = ref()
const params = reactive({
  page: 0,
  size: 99999,
  enabled: true
})
const formLabelWidth = '140px'
// 获取岗位
const setvolume = () => {
  queryvolume(params).then((res) => {
    volumedata.value = res.content
  })
}
/**取消模态框事件 */
const qx = ()=>{
  emits('qx',pro.dialogFormVisible)
}
/**取消模态框事件 */
const qd = ()=>{
  emits('qd',pro.dialogFormVisible)
}
setvolume()
// 获取角色
const setroles = () => {
  queryroles().then((res) => {
    console.log(res, '角色')
    rolesdata.value = res
  })
}
setroles()
</script>

<style lang="scss" scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
