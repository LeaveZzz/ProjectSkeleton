import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')

const NotFound = () => import('views/notfound/NotFound')

Vue.use(VueRouter)

const routes = [{
		path: '/',
		redirect: '/home'
	},
	{
		path: '/home',
		component: Home,
		// meta: {
		// 	showHeaderTop: true
		// }
	},{
		path: '/notfound',
		component: NotFound
	}
]

const router = new VueRouter({
	mode: 'history',
	routes
})

router.beforeEach((to, from, next) => {
	if (to.matched.length === 0) {
		//路由不存在则跳转到自定义404页面
		next('/notfound');
	} else {
		next();
	}
})

export default router
