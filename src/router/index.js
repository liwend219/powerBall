import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import HistoryList from '@/pages/History'
import BetRecord from '@/pages/BettingRecord'
import Guide from '@/pages/Guide'
import LotteryDetail from '@/pages/LotteryDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HOME',
      component: Home
    },
    {
      path:'/history',
      name:'Historical Winning Records',

      component:HistoryList
    },
    {
      path:'/bet/record',
      name:'Betting History',
      component:BetRecord
    },
    {
      path:'/guide',
      name:'rule',
      component:Guide
    },
    {
      path:'/lottery/detail',
      name:'win_detail',
      component:LotteryDetail
    }
  ]
})
