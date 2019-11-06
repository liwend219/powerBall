<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>
import {getSupportCion,getToken,userLogin,getAssets} from './common/init.js'
import Header from '@/components/Header.vue'
import {mapMutations,mapGetters,mapState} from 'vuex'
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
      this.calc()
      var token = this.$route.query.token
      var userid = this.$route.query.userid
      var lang = this.$route.query.lang
      if(lang){
        this.setLanguageType(lang)
      }
      
      let t = encodeURIComponent(token)
      this.tdata = {
        userid:userid,
        token:t
      }
      getSupportCion().then(res => {
        console.log(res)
        if(res.Code == 200){
          this.setBion(res.Data.coin)
          this.setAssetsWs()
          this.setSocket()
          
          this.onOpen()
          this.onOpen2()
          this.onErr()
        }
        
      })
      

      //socket开启
      
      // var 2 = setInterval(() => {
      //   console.log(self.getState)
      // },1000)

      
      
      // this.onMsg()
  },
  computed:{
    ...mapGetters([
      "getBalances",
      "getSocket",
      "getAssetsWs",
      "getState"
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
      "setLanguageType"
    ]),

    onOpen(){
      this.getAssetsWs.socket.onopen = (data) => {
        var data2 = {
          "method":"server.ping",
          "params": [],
          "id":104
        }
        this.getAssetsWs.send(data2)
        this.login()
      }
    },

    onOpen2(){
      this.getSocket.socket.onopen = (data) => {
        console.log(data)
        this.socket1 = true
      }
    },
    async onMsg(){
      this.getAssetsWs.onmessage = (msg) => {
        let data = JSON.parse(msg)
        if(!data.error && data.id == 101){
          // console.log(this.get)
          let t = {
              "method":"asset.subscribe",
              "params":[this.getCoin], 
              "id":1002
          }
          let t2 = {
              "method":"balance.query", 
              "params":[2,this.getCoin],  
              "id":1003
          }
          this.getAssetsWs.send(t)
          this.getAssetsWs.send(t2)
        }
        
      }
    },

    async onErr(){
        var self = this
        this.getAssetsWs.socket.onerror = (err) => {
            self.getAssetsWs.socket.close();
            setTimeout(function () {     //没连接上会一直重连，设置延迟避免请求过多
              self.setAssetsWs() 
              self.onOpen()
              self.onErr()
            }, 2000);
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
    login(tdata){
      userLogin(this.tdata).then(res => {
        console.log(res)
        if(res.Code == 200){
          
          let session = res.Data.session
          let t = {
            type:'conn_init',
            payload:{
              token:session
            }
          }
          var self = this
          var timer2 = setInterval(() => {
            if(self.socket1){
              self.getSocket.send(t)
              clearInterval(timer2)
            }
          },100)

          this.setSession(session)
          getAssets(session).then(res => {
            if(res.Code == 200){
              console.log('a')
              this.setBalances(res.Data)
            }
          }).catch(err => {
            console.log(err)
          })


          let tdata2 = res.Data.socket_sign

          let assetsData = {
              "method":"server.auth2",
              "params":[tdata2.uid,tdata2.time,tdata2.from,tdata2.sign],
              "id":101
          }
          this.getAssetsWs.send(assetsData)
          this.getAssetsWs.socket.onmessage = (msg) => {
            this.msgHandle(JSON.parse(msg.data))
          }
          

          
          
        }
        
        
        
        
      }).catch(err => {
        console.log(err)
      })
    },


    msgHandle(data){
      console.log(data)
      if(!data.error && data.id == 101){
          let t = {
            "method":"asset.subscribe",
            "params":[this.getCoin], 
            "id":1002
          }
          let t2 = {
            "method":"balance.query", 
            "params":[2,this.getCoin],  
            "id":1003
          }
          this.getAssetsWs.send(t)
          this.getAssetsWs.send(t2)
          this.getAssetsWs.socket.onmessage = (msg) => {
            this.msgHandle(JSON.parse(msg.data))
          }
      }
      if(data.error && data.id == 101){
        this.$toast('身份验证出错')
      }
      if(data.id == 1002){
        console.log('订阅成功')
      }
      if(data.method == 'asset.result'){
        console.log('ooo')
        this.setBalances(data.params.result)
      }
      if(data.id == 1003){
        console.log('ooo22')
        this.setBalances(data.result)
      }
    }
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

