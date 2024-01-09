<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive } from 'vue'
import { userInfoStore } from "../store";
import { storeToRefs } from 'pinia';
const userInfo = userInfoStore()
const { age, name } = storeToRefs(userInfoStore())
const dd = () => {
	//  userInfo.$patch({
	// 	age:18,
	// 	name:'x小奶娃娃'
	//  })
	// userInfo.$patch((state) => {
	// 	state.age++,
	// 		state.name = 'wopafaiwfawifa'
	// })
	userInfo.setUser()
	// age.value++
}
const reset=()=>{
	userInfo.$reset()
}
</script>
<template>
	<div>
		{{ userInfo.age }}
		{{ userInfo.name }}
		<button @click="dd">加</button>
		{{ userInfo.getname }}
		<el-button @click="reset">$reset</el-button>
	</div>
</template>

<style lang="scss" scoped></style>
