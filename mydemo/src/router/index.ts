import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  createMemoryHistory
} from 'vue-router'
import { getToken } from '@/utils/auth'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: '/dashboard',
    component: HomeView,
    children: [
      {
        path: 'dashboard',
				meta:{title:'首页'},
        name: 'dashboard',
        component: () => import('../layout/dashboard.vue')
      },
			{
        path: 'monitor/server/index',
				meta:{title:'服务监控'},
        name: 'monitor/server/index',
        component: () => import('../views/monitor/serve/index.vue')
      }, 
			{
        path: 'system/user',
				meta:{title:'用户管理'},
        name: 'system/user',
        component: () => import('../views/system/user.vue')
      },
			{
        path: 'system/role',
				meta:{title:'角色管理'},
        name: 'system/role',
        component: () => import('../views/system/role.vue')
      },
			{
        path: 'system/menu',
				meta:{title:'菜单管理'},
        name: 'system/menu',
        component: () => import('../views/system/menu.vue')
      },
			{
        path: 'system/dept',
				meta:{title:'部门管理'},
        name: 'system/dept',
        component: () => import('../views/system/dept.vue')
      },
			{
        path: 'system/job',
				meta:{title:'岗位管理'},
        name: 'system/job',
        component: () => import('../views/system/job.vue')
      },
			{
        path: 'system/dict',
				meta:{title:'岗位管理'},
        name: 'system/dict',
        component: () => import('../views/system/dict.vue')
      },
			// {
      //   path: 'system/timing',
			// 	meta:{title:'任务调度'},
      //   name: 'system/timing',
      //   component: () => import('../views/system/timing.vue')
      // },
			// {
      //   path: 'components/tinymce',
			// 	meta:{title:'任务调度'},
      //   name: 'components/tinymce',
      //   component: () => import('../views/components/tinymce.vue')
      // },
			{
        path: 'task',
        name: 'task',
        component: () => import('../views/task.vue')
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../layout/login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// router.beforeEach((to, form, next) => {
//   if (getToken() && to.path == '/login') {
//     next('/')
//   }else if(!getToken()&&to.path!='/login'){
// 		next('/login')
// 	}else{
// 		next()
// 	}
// })

export default router
