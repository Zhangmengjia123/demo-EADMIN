<script setup lang="ts">
// import { JSEncrypt } from 'jsencrypt'
import { encrypt } from '../utils/rsaEncrypt'
import { CodeApi, LoginApi } from '@/api/api'
import { useRouter } from "vue-router";
import { ref, reactive } from 'vue'
import { Relu } from '@/api/defind'
import { setToken } from '@/utils/auth'
import { userInfoStore } from '@/store';
const userInfo = userInfoStore()
const { push } = useRouter()
const fits = 'contain'
const relu = reactive<Relu>({
	username: 'admin',
	password: '123456',
	uuid: '',
	code: ''
})
const url = ref('')

// 验证码
const cd = () => {
	CodeApi().then(res => {
		relu.uuid = res.uuid
		url.value = res.img
	})
}
// 登录
const login = () => {
	relu.password = encrypt(relu.password)
	LoginApi(relu).then(res => {
		setToken(res.token)
		userInfo.$patch((state) => {
			state.list.data = res.user.user
		})
		push('/')
	})


}
cd()
</script>
<template>
	<div class="body">
		<div class="box">
			<h2>ELADMIN 后台管理系统</h2>
			<el-input v-model="relu.username" class="w-50 m-2" placeholder="请输入用户名">
				<template #prefix>
					<svg-icon icon-class="yonghufill"></svg-icon>
				</template>
			</el-input>
			<el-input v-model="relu.password" class="w-50 m-2" placeholder="请输入密码">
				<template #prefix>
					<svg-icon icon-class="tianchongxing-"></svg-icon>

				</template>
			</el-input>
			<div class="ys">
				<el-input v-model="relu.code" class="w-50 m-2" placeholder="验证码">
					<template #prefix>
						<svg-icon icon-class="24gf-shieldCheck"></svg-icon>
					</template>
				</el-input>
				<div class="demo-image">
					<div class="block">
						<el-image style="width: 100px; height: 40px" :src="url" :fit="fits" />
					</div>
				</div>
			</div>
			<p style="margin: 10px;"><input type="checkbox"> 记住我</p>
			<el-button type="primary" style="width: 100%;" @click="login">登录</el-button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.body {
	overflow: hidden;
	width: 100%;
	height: 100vh;
	background-image: url(../assets/background.df9c4cdb.webp);
}

.box {
	margin: 10% auto;
	background-color: #fff;
	width: 20%;
	height: 50%;
	padding: 20px;

	.el-input {
		margin: 10px 0;
	}

	h2 {
		text-align: center;
		margin: 20px 0;
		color: #ccc;
		font-size: 18px;
	}

	.ys {
		display: flex;
		height: 40px;
		align-items: center;
	}
}

.demo-image .block {
	padding: 30px 0;
	text-align: center;
	border-right: solid 1px var(--el-border-color);
	display: inline-block;
	width: 20%;
	box-sizing: border-box;
	vertical-align: top;
}

.demo-image .block:last-child {
	border-right: none;
}

.demo-image .demonstration {
	display: block;
	color: var(--el-text-color-secondary);
	font-size: 14px;
	margin-bottom: 20px;
}
</style>
