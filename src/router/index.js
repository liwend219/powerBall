import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import HistoryList from '@/pages/History'
import BetRecord from '@/pages/BettingRecord'
import Guide from '@/pages/Guide'
import LotteryDetail from '@/pages/LotteryDetail'


Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [
    {
        path: '/',
        name: 'HOME',
        component: Home
    },
    {
        path:'/history',
        name:'',
        component:HistoryList,
        meta: {
            keepAlive: true
        }
    },
    {
        path:'/bet/record',
        name:'',
        component:BetRecord,
        meta: {
            keepAlive: true
        }
    },
    {
        path:'/guide',
        name:'',
        component:Guide,
        meta: {
            keepAlive: true
        }
    },
    {
        path:'/lottery/detail',
        name:'win_detail',
        component:LotteryDetail,
        meta: {
            keepAlive: true
        }
    }
  ]
})


router.beforeEach((to, from, next) => {
    if(to.path == '/' && from.path != '/'){
        //后退
        from.meta.keepAlive = false
        to.meta.keepAlive = true
    }
    next()
})
export default router
