<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, watchEffect } from 'vue'
import { CeApi } from '@/api/api'
import { userInfoStore } from '@/store'
import { removeToken, } from '@/utils/auth'
const userInfo = userInfoStore()
const { push } = useRouter()
const route = useRoute()
const isCollapse = ref(false)
const title = ref([])
// tab
watchEffect(() => {
	console.log(route.meta.title);
	title.value.push(route.meta.title)

})

const list = reactive({
	ce: [],
})
const vps = ref()



userInfo.age = 20

console.log(userInfo.list);

// 侧边
// CeApi().then(res => {
// 	console.log(res);
// 	const aa = res
// 	const ss:unknown[] = []
// 	aa.forEach((item) => {
// 		if (item.alwaysShow) {
// 			ss.push(item)
// 		}
// 	});
// 	list.ce = ss
// 	vps.value = res[0].children
// })
const cc = () => {
	console.log(1);
}
// 退出
const outLogin = () => {
	removeToken()
	push('/login')
}
</script>
<template>
	<div>
		<div class="common-layout">
			<el-container>
				<el-aside :width="isCollapse == false ? '210px' : '60px'">
					<p style="margin-top: 10px;"><img src="../assets/logo.381d6a3e.png"
							style="margin-right: 10px; margin-left: 20px;" alt=""> ELADMIN-后台管理
					</p>
					<!-- <el-menu router background-color="#304156" text-color='#ccc' default-active="2" class="el-menu-vertical-demo"
						:collapse="isCollapse" :collapse-transition="true">
						<el-menu-item index="/dashboard">
							<el-icon>
								<setting />
							</el-icon>
							<template #title>首页</template>
						</el-menu-item>
						<el-menu-item index="1" v-for="item in vps">
							<el-icon>
								<setting />
							</el-icon>
							<template #title>{{ item.meta.title }}</template>
						</el-menu-item>
						<el-sub-menu :index="item.path" v-for="item in list.ce">
							<template #title>
								<el-icon>
									<location />
								</el-icon>
								<span>{{ item.meta.title }}</span>
							</template>
							<el-menu-item :index="it.component" v-for="it in item.children">{{ it.meta.title }}</el-menu-item>
						</el-sub-menu>
					</el-menu> -->
					<el-menu active-text-color="#3b93f6" background-color="#304156" class="el-menu-vertical-demo"
						default-active="2" text-color="#fff" @open="handleOpen" @close="handleClose" router>
						<el-menu-item index="/dashboard">
							<el-icon><icon-menu /></el-icon>
							<span>首页</span>
						</el-menu-item>
						<el-menu-item index="2">
							<el-icon>
								<document />
							</el-icon>
							<span>VPS推荐</span>
						</el-menu-item>
						<el-sub-menu index="3">
							<template #title>
								<el-icon>
									<location />
								</el-icon>
								<span>系统管理</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="/system/user">用户管理</el-menu-item>
								<el-menu-item index="/system/role">角色管理</el-menu-item>
								<el-menu-item index="/system/menu">菜单管理</el-menu-item>
								<el-menu-item index="/system/dept">部门管理</el-menu-item>
								<el-menu-item index="/system/job">岗位管理</el-menu-item>
								<el-menu-item index="/system/dict">字典管理</el-menu-item>
								<el-menu-item index="/task">任务调度</el-menu-item>
							</el-menu-item-group>
						</el-sub-menu>
						<el-sub-menu index="4">
							<template #title>
								<el-icon>
									<location />
								</el-icon>
								<span>系统监控</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="1-1">在线用户</el-menu-item>
								<el-menu-item index="1-2">操作日志</el-menu-item>
								<el-menu-item index="1-3">异常日志</el-menu-item>
								<el-menu-item index="/monitor/server/index">服务监控</el-menu-item>
							</el-menu-item-group>
						</el-sub-menu>
						<el-sub-menu index="5">
							<template #title>
								<el-icon>
									<location />
								</el-icon>
								<span>运维管理</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="1-1">服务器</el-menu-item>
								<el-menu-item index="1-2">应用管理</el-menu-item>
								<el-menu-item index="1-2">部署管理</el-menu-item>
								<el-menu-item index="1-2">数据库管理</el-menu-item>
							</el-menu-item-group>
						</el-sub-menu>
						<el-sub-menu index="6">
							<template #title>
								<el-icon>
									<location />
								</el-icon>
								<span>系统工具</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="1-1">代码生成</el-menu-item>
								<el-menu-item index="1-2">存储管理</el-menu-item>
								<el-menu-item index="1-3">邮件工具</el-menu-item>
								<el-menu-item index="1-4">支付宝工具</el-menu-item>
							</el-menu-item-group>
						</el-sub-menu>
						<el-sub-menu index="7">
							<template #title>
								<el-icon>
									<location />
								</el-icon>
								<span>组件管理</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="1-1">图表库</el-menu-item>
								<el-menu-item index="1-2">图标库</el-menu-item>
								<el-menu-item index="/components/tinymce">富文本</el-menu-item>
								<el-menu-item index="1-2">Markdown</el-menu-item>
								<el-menu-item index="1-2">Yaml编辑器</el-menu-item>
							</el-menu-item-group>
						</el-sub-menu>
						<el-sub-menu index="8">
							<template #title>
								<el-icon>
									<location />
								</el-icon>
								<span>多级菜单</span>
							</template>
							<el-menu-item-group>
								<el-sub-menu index="1-4">
									<template #title>二级菜单1</template>
									<el-menu-item index="1-4-1">三级菜单1</el-menu-item>
									<el-menu-item index="1-4-2">三级菜单2</el-menu-item>
								</el-sub-menu>
								<el-menu-item index="1-2">二级菜单2</el-menu-item>
							</el-menu-item-group>
						</el-sub-menu>
					</el-menu>
				</el-aside>
				<el-container>
					<el-header>
						<div class="top">
							<div class="z" style="display: flex; align-items: center;">
								<el-icon style="font-size: 24px;" @click="isCollapse = !isCollapse" v-if="!isCollapse">
									<Fold />
								</el-icon>
								<el-icon style="font-size: 24px;" @click="isCollapse = !isCollapse" v-else>
									<Expand />
								</el-icon>
								<p style="margin-left: 10px;">首页</p>
							</div>
							<div class="y">
								<img class="img" src="../assets//logo.381d6a3e.png" alt="">
								<el-dropdown>
									<el-icon class="el-icon--right">
										<arrow-down />
									</el-icon>
									<template #dropdown>
										<el-dropdown-menu>
											<el-dropdown-item @click="cc">个人中心</el-dropdown-item>
											<el-dropdown-item @click="outLogin">退出登录</el-dropdown-item>
										</el-dropdown-menu>
									</template>
								</el-dropdown>
							</div>
						</div>
						<div class="tab">
							<span v-for="item in title">{{ item }}</span>
						</div>
					</el-header>
					<el-main>
						<router-view></router-view>
					</el-main>
				</el-container>
			</el-container>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.el-main {
	height: 100vh;
}

.el-header {

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		line-height: 40px;

		.y {
			display: flex;
			align-items: center;

			.img {
				width: 40px;
			}

			.el-dropdown {
				margin-top: 40px;
			}
		}
	}
}

.el-aside {
	overflow: hidden;
	background-color: #304156;

	p {
		display: flex;
		color: #fff;
		font-size: 14px;
		font-weight: 700;
		align-items: center;

		img {
			width: 30px;
		}
	}
}

.el-menu {
	width: 100%;

	.el-menu-item {
		.el-icon {
			color: #ccc;
		}
	}

}

.example-showcase .el-dropdown-link {
	cursor: pointer;
	display: flex;
	align-items: center;
}</style>
