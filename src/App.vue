<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    
    <Header></Header>
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
import {getSupportCion,getToken,userLogin,getAssets} from './common/init.js'
import Header from '@/components/Header.vue'
import {mapMutations,mapGetters,mapState} from 'vuex'
import init from '@/lib/init'
// import Socket from './lib/socket'
export default {
  name: 'App',
  components:{
    Header
  },
  data(){
    return {
      tdata:{},
      socket1:false,
    }
  },
  computed:{
    ...mapState([
        "socket"
    ]),
  },
  created(){
      init(this)
      this.onOpen()


      this.calc()
      var codes = this.$route.query.code

      var lang = this.$route.query.lang
      if(lang == 'zh-CN'){
        this.setLanguageType(lang)
      }else{
          this.setLanguageType('en-US')
      }
      this.tdata = {
        access_code:codes
      }
      getSupportCion().then(res => {
        if(res.Code == 200){
          let obj = {}
          let obj2 = {}
          res.Data.forEach(val => {
            obj[val.coin] = val.decimal
            obj2[val.coin] = val.min_amount
          })
          this.setMinAmount(obj2)
          this.setDecimal(obj)
        }
      })
  },
  computed:{
    ...mapGetters([
      "getBalances",
      "getSocket",
      "getAssetsWs",
      "getState",
      "getMinAmount"
    ])
  },
  methods:{
    ...mapMutations([
      'setBion',
      'setBalances',
      "setSocket",
      "setAssetsWs",
      "setSession",
      "setCalcTime",
      "setLanguageType",
      "setDecimal",
      "setMinAmount"
    ]),

    onOpen(){
      this.getSocket.socket.onopen = (data) => {
        this.socket1 = true
        if(data.type == 'open'){
            this.login()
        }
      }
    },
    calc(){
        var self = this
        var timer = setInterval(() => {
            var date = new Date()
            let m = date.getMinutes()
            let s = date.getSeconds()
            let st = (60-m-1)* 60 + (60-s)
            let sm = parseInt(st/60)
            let ss = st%60
            let tmp = {
              lm:parseInt(sm/10),
              m:sm%10,
              ls:parseInt(ss/10),
              s:ss%10
            }
            self.setCalcTime(tmp)
        },1000)
    },
    login(){
      userLogin(this.tdata).then(res => {
        if(res.Code == 200){
          
          let session = res.Data.session
          let t = {
            type:'conn_init',
            payload:{
              token:session
            }
          }
          this.setSession(session)
          this.getSocket.send(t)

          
          getAssets(session).then(res => {
            if(res.Code == 200){
              this.setBalances(res.Data.balances)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
  max-width: 100%;
  font-size: 1.6rem;
  
}
span{
  font-size: 16px;
}
p{
  font-size: 1.6rem;
}
</style>

