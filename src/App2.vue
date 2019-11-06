<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>
import {getToken,userLogin,getAssets} from './common/init.js'
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
      tdata:{}
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
      let t = encodeURIComponent(token)
      this.tdata = {
        userid:userid,
        token:t
      }
      this.login(this.tdata)
      //socket开启
      this.setSocket()
      // this.setAssetsWs()
      // this.onErr()
      // this.onMsg()
  },
  computed:{
    ...mapGetters([
      "getBalances",
      "getSocket",
      "getAssetsWs"
    ])
  },
  methods:{
    ...mapMutations([
      'setBalances',
      "setSocket",
      "setAssetsWs",
      "setSession",
      "setCalcTime"
    ]),
    async onMsg(){
      this.getAssetsWs.onmessage = (msg) => {
        let data = JSON.parse(msg)
        if(!data.error && data.id == 101){
          let t = {
              "method":"asset.subscribe",
              "params":["ETH"], 
              "id":1002
          }
          let t2 = {
              "method":"balance.query", 
              "params":[2,"ETH"],  
              "id":1003
          }
          this.getAssetsWs.send(t)
          this.getAssetsWs.send(t2)
        }
        if(data.method == 'asset.result'){
          this.setBalances(data.params.result)
        }
        if(data.id == 1003){
          this.setBalances(data.result)
        }
      }
    },

    async onErr(){
        var self = this
        this.getAssetsWs.socket.onerror = (err) => {
            self.getAssetsWs.socket.close();
            console.log('哦豁')
            setTimeout(function () {     //没连接上会一直重连，设置延迟避免请求过多
              self.setAssetsWs()
              self.login(this.tdata)
              self.onErr()
              self.onMsg()
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
        if(res.Code == 200){
          let session = res.Data.session
          this.setSession(session)
          let t = {
            type:'conn_init',
            payload:{
              token:session
            }
          }

          var self = this
          var t1 =  setTimeout(() => {
            self.getSocket.send(t)
            
          }, 200);
          this.getSocket.onmessage = (msg) => {
            if(JSON.parse(msg).type == "error"){
              // console.log('连接错误')
            }else if(JSON.parse(msg).type == "conn_ack"){
              // console.log('登录成功')
            }
          }
          // this.socket.send(t)
          getAssets(session).then(res => {
            if(res.Code == 200){
              this.setBalances(res.Data)
            }
            
          }).catch(err => {
            console.log(err)
          })
        }
        let tdata2 = res.Data.socket_sign
        let assetsData = {
            "method":"server.auth2",
            "params":[tdata2.uid,tdata2.time,tdata2.from,tdata2.sign],
            "id":101
        }
        this.getAssetsWs.send(assetsData)
        
        
        
      }).catch(err => {
        console.log(err)
      })
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

