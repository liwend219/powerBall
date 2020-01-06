<template>
    <div class="home-page">
        <div class="loading" v-if="showLoading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="banner-box">
            <div class="banner-left">
                <img :src="`/static/img/${Bion}.png`" alt="">
                <div class="left-body">
                    <!-- <p class="txt1">Powerball Jackpot</p> -->
                    <p class="txt2">
                        <span class="select" @click="showCheckBion = true">{{Bion}}<i class="fas fa-sort-down down"></i>
                            <div class="box" v-if="showCheckBion">

                            </div>
                            <div v-if="showCheckBion" class="box-1">
                                <p  v-for="(item,key) in coinList" :key="key" @click.stop="checkBion(item.coin)" >{{item.coin}}</p>
                                
                            </div>
                        </span>
                        <br>{{getBalances[Bion] && Number(getBalances[Bion]).toFixed(getDecimal[Bion])}}
                    </p>
                </div>
            </div>
            <div class="banner-right">
                <div class="right-box">
                    <p class="txt1">
                        <span class="num">No</span>
                        <span class="num2">{{periods.period}}</span>
                    </p>
                    <div class="time-box">
                        <div class="item">
                            {{calcTime.lm }}
                        </div>
                        <div class="item">
                            {{calcTime.m}}
                        </div>
                        <p class="mao">:</p>
                        <div class="item">
                            {{calcTime.ls }}
                        </div>
                        <div class="item">
                            {{calcTime.s}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box-detail">
            <div class="benner-2">
                
                
                <span class="txt">{{nowLottery.period}}{{$t['record']}}</span>
                <span class="red">{{nowLottery.win_no[0]}}</span>
                <span class="red">{{nowLottery.win_no[1]}}</span>
                <span class="red">{{nowLottery.win_no[2]}}</span>
                <span class="red">{{nowLottery.win_no[3]}}</span>
                <span class="red">{{nowLottery.win_no[4]}}</span>
                <span class="blue">{{nowLottery.powerball}}</span>
                <span class="blue"></span>
                <span class="blue"></span>
                <!-- <div class="txt" @click="showModel1 = true">
                    <i style="margin-right:.2rem;color:#d20002;" class="far fa-calendar-alt"></i>
                    历史开奖
                </div> -->
            </div>
            <div class="benner-2">
                <div class="item" @click="$router.push('/history')">
                    <img src="/static/img/po1.png" alt="">
                    <span>{{$t['history_win']}}</span>
                </div>
                <div class="item" @click="$router.push('/bet/record')">
                    <img src="/static/img/po2.png" alt="">
                    <span>{{$t['my_bet']}}</span>
                </div>
                <div class="item" @click="$router.push('/guide')">
                    <img src="/static/img/po3.png" alt="">
                    <span>{{$t['rule']}}</span>
                </div>
            </div>
        </div>
        
        <div class="list-box" style="border-bottom:1px solid #e5e5e5;padding-bottom:.8rem;">
            <div v-for="(item,key) in 32" :key="key" :class="setBg(item).length != 0?'item active':'item'" @click="select(item,'red')">
                {{item}}
            </div>
        </div>

        <div class="list-box" style="padding-bottom:.8rem;">
            <div v-for="(item,key) in 16" :key="key" :class="setBg2(item).length != 0?'item2 active2':'item2'" @click="select(item,'blue')">
                {{item}}
            </div>
        </div>
        <div class="btn-box">
            <div :class="selectState?'item':'item dis'"  @click="random">{{$t['Selection']}}</div>
            <div class="item" @click="bet">{{$t['bet']}}</div>
        </div>
        <p class="bom-txt">At least 5 red balls and 1 blue ball</p>


        <div class="model-box1" v-if="showModel1">
            <div class="box-1">
                <p class="his-title">{{$t['history_win']}}</p>
                <div class="list-box2">
                    <div class="list-item" v-for="(item,key) in 10" :key="key">
                        <span>0000{{item}}{{$t['record']}}</span>
                        <span class="red">{{numList[0]}}</span>
                        <span class="red">{{numList[1]}}</span>
                        <span class="red">{{numList[2]}}</span>
                        <span class="red">{{numList[3]}}</span>
                        <span class="red">{{numList[4]}}</span>
                        <span class="blue">{{blueNum}}</span>
                    </div>
                </div>
                <i class="fas fa-times close" @click="showModel1 = false"></i>
            </div>
            
        </div>

        <div class="model-box2" v-if="showModel2">
            <div class="box-2">
                <p class="his-title">{{$t['no_round']}}{{nowLottery.period + 1}}{{$t['no_round1']}}</p>
                <div class="box-content">
                    <p class="num-list" style="display:inline-block">
                        <span class="red" v-for="(item,key) in numList" :key="key">{{item}}</span>
                        
                    </p>
                    <span class="blue" v-for="(item2,key2) in blueNum" :key="key2">{{item2}} &nbsp;</span>
                    <div class="jsq-box" style="margin-top:0;">
                        <span class="l-t">Buy</span>
                        <button @click="reduce('Multiple')">-</button>
                        <div class="num">{{Multiple}}</div>
                        <button @click="add('Multiple')">+</button>
                        <span class="r-t">Period</span>
                    </div>
                </div>
                <p class="model2-txt2"><span style="color:#000;">{{$t['Single_Note']}}<span style="color:red">{{Multiple}}</span> {{$t['period']}}</span>
                <br>
                <span style="color:#000;">{{$t['bet_price']}}: <span style="color:red">{{resultAmount}}</span> {{Bion}}</span>
                </p>
                <div class="btn2-box">
                    <button class="item dis" @click="showModel2 = false">{{$t['Cancel']}}</button>
                    <button class="item" @click="betting">{{$t['Payment']}}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {getSupportCion,userLogin,getWinLottery,getPowerball,getAssets} from '../common/init.js'
import {mapGetters,mapState,mapMutations} from 'vuex'
import floatObj from '../lib/float.js'
import qs from 'qs'
export default {
    data(){
        return {
            txt:'如果说你是夜晚的烟花哦',
            coinList:[],
            active:true,
            showModel1:false,
            showModel2:false,
            Multiple:1,
            count:1,
            numList:[],
            blueNum:[],
            showLoading:true,
            // Bion:'ETH',
            showCheckBion:false,
            selectState:true,
            Balances:{},
            periods:'',
            nowLottery:{
                period:0,
                win_no:'',
                powerball:'',
                jackpot:0
            },
            number:1,
            endTime:0,
            // calcTime:{
            //     lm:0,
            //     m:0,
            //     ls:0,
            //     s:0,
            // }
        }
    },
    computed:{
        ...mapState([
            "balances",
            "socket"
        ]),
        ...mapGetters([
            "getBalances",
            "getSession",
            "getCalcTime",
            "getDecimal",
            "getMinAmount",
            "getBion",
            "getEndTime"
        ]),
        resultAmount(){
            let tmp = floatObj.multiply(this.number,this.getMinAmount[this.Bion])
            return floatObj.multiply(tmp,this.Multiple)
        },
        Bion(){
            return this.getBion
        },
        calcTime(){
            return this.getCalcTime
        }
    },
    created(){
        // this.calc()
        // this.setHeadTitle(this.$t['home'])
        this.setHeadTitle('Powerball Jackpot')
        getSupportCion().then(res => {
            if(res.Code == 200){
                // this.Bion = res[0].Data[0].coin
                let obj = {}
                let obj2 = {}
                res.Data.forEach(val => {
                    obj[val.coin] = val.decimal
                    obj2[val.coin] = val.min_amount
                })
                this.setMinAmount(obj2)
                this.setDecimal(obj)

                if(!this.getBion){
                    this.setBion(res.Data[0].coin)
                }
                this.coinList = res.Data
                this.getPowerBall()
            }
            
        }).catch(err => {
            console.log(err)
        })

        // this.calc()
        // Promise.all([getSupportCion(),getPowerball(t)]).then(res => {
            
            
            
            
        // })

        this.random()
    },
    methods:{
        ...mapMutations([
            "setBion",
            "setBalances",
            "setHeadTitle",
            "setEndTime",
            "setCalcTime",
            "setMinAmount",
            "setDecimal"
        ]),
        getPowerBall(){
            
            let t = {
                currency:this.Bion
            }
            getPowerball(t).then(res => {
                if(res.Code == 200){
                    this.periods = res.Data
                    // this.endTime = res.data.endTime
                    this.setEndTime(res.Data.endTime)
                    this.calc()
                    this.getWinInfo()
                }
            })
        },
        getWinInfo(){
            let t2 = {
                currency :this.Bion,
                period:parseInt(this.periods.period)-1
            }
            getWinLottery(t2).then(res => {
                this.showLoading = false
                if(res.Code == 200){
                    let t3 = res.Data
                    let arr = res.Data.winning_no.split(",")
                    t3.win_no = arr
                    this.nowLottery = t3
                    
                }
            }).catch(err => {
                console.log(err)
            })
        },
        bet(){
            // [N*(N-1)*(N-2)*...*1]/[6*5*4*3*2*1]*蓝球数

            
            //正常红球个数
            const c = 5


            this.showModel2 = true;
            let N = this.numList.length
            let K = this.blueNum.length
            let num1 = 1;
            let num2 = N - c;
            let num3 = 1;
            let num4 = 1;

            for(let i = 1;i <= N; i++){
                num1 = num1 * i;
            }

            for(let i = 1; i <= num2; i++){
                num3 = num3 * i
            }

            for(let i = 1; i <= c; i++){
                num4 = num4 * i
            }
            console.log(num1/(num3*num4)*K)

            this.number = num1/(num3*num4)*K
            // let count = [N*(N-1)*(N-2)*...*1]/[6*5*4*3*2*1]*K
        },
        // calc(){
        //     var timer = setInterval(() => {
        //         var date = new Date()
        //         let m = date.getMinutes()
        //         let s = date.getSeconds()
        //         let st = (60-m-1)* 60 + (60-s)
        //         let sm = parseInt(st/60)
        //         let ss = st%60
        //         this.calcTime = {
        //             lm:parseInt(sm/10),
        //             m:sm%10,
        //             ls:parseInt(ss/10),
        //             s:ss%10
        //         }
        //     },1000)
        // },
        betting(){
            if(this.numList.length < 5){
                this.$toast(this.$t['tips1'])
                return
            }else if(this.blueNum.length == 0){
                this.$toast(this.$t['tips1'])
                return
            }
            if(this.getBalances[this.getBion] < (this.number * this.getMinAmount[this.Bion] * this.Multiple)){
                this.$toast(this.$t['Insufficient account balance'])
                return
            }
            this.showLoading = true
            let t = {
                type: 'buy_powerball',
                payload: {
                    id:110,
                    whiteNum:this.numList.toString(),
                    redNum:this.blueNum.toString(),
                    currency:this.Bion,
                    mul:this.Multiple
                }
            }
            this.socket.send(t)
            this.socket.onmessage = (msg) => {
                this.showLoading = false
                let data = JSON.parse(msg)
                this.showModel2 = false
                if(data.type == 'error'){
                    this.$toast(data.payload)
                }else if(data.type == 'buy_ack'){
                    this.$toast(this.$t['Betting success'])
                    let assets = this.getBalances
                    assets[data.payload.currency] = Number(data.payload.bizAmt)
                    this.setBalances(assets)
                    console.log(this.getBalances)
                }
                
            }
        },
        calc(){
            // let endtime
            var timer = setInterval(() => {
                
                let date = new Date()
                let sTime = this.getEndTime * 1000 - date.getTime()
                if(sTime <= 1000){
                    clearInterval(timer)
                    let tmp = {
                        lm:0,
                        m:0,
                        ls:0,
                        s:0
                    }
                    this.setCalcTime(tmp)
                    let timer2 = setTimeout(() => {
                        this.getPowerBall()
                    },2000)
                }else{
                    let ss = parseInt(sTime / 1000 % 60)
                    let tmp = {
                    lm:0,
                    m:parseInt(sTime / 1000 / 60),
                    ls:parseInt(ss/10),
                    s:ss%10
                    }
                    this.setCalcTime(tmp)
                }
            },1000)
        },
        checkBox(idx){
            if(idx == 1){
                this.active = true
            }else{
                this.active = false
            }
            
        },
        select(num,type){
            if(type == 'red'){
                let sta = this.numList.filter(val => {
                    return val == num
                })
                if(sta.length != []){
                    this.numList.forEach((val,key) => {
                        if(val == num){
                            this.numList.splice(key,1)
                        }
                    })
                }else{
                    this.numList.push(num)
                    this.numList.sort(this.sortNumber)
                }
            }else{
                let sta = this.blueNum.filter(val => {
                    return val == num
                })
                if(sta.length != []){
                    this.blueNum.forEach((val,key) => {
                        if(val == num){
                            this.blueNum.splice(key,1)
                        }
                    })
                }else{
                    this.blueNum.push(num)
                    this.blueNum.sort(this.sortNumber)
                }
            }
            
        },
        checkBion(name){
            // this.Bion = name;
            this.setBion(name)
            this.showCheckBion = false
            this.getWinInfo()
        },
        random(){
            if(!this.selectState){
                this.numList = []
                this.selectState = true
                 this.blueNum = []
                return 
            }
            this.numList = []
            this.blueNum = []
            let num2 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]
            let arr = []
            for(let i =0;i<5;i++){
                let num = parseInt(Math.random()*num2.length)
                arr.push(num2[num])
                num2.splice(num,1)
                if(arr.length == 5){
                    arr.sort(this.sortNumber)
                    this.numList = arr
                    
                }
            }
            let num3 = Math.ceil(Math.random()*16)
            
            this.blueNum.push(num3)
            this.selectState = false
        },
        sortNumber(a,b){
            return a - b
        },
        setBg(item){
            
            return this.numList.filter(val => {
                return val == item
            })
        },
        setBg2(item){
            return this.blueNum.filter(val => {
                return val == item
            })
        },
        reduce(name){
            if(name == 'Multiple'){
                if(this.Multiple <= 1){
                    this.Multiple == 1
                }else{
                    this.Multiple--;
                }
            }else{
                if(this.count <= 1){
                    this.count == 1
                }else{
                    this.count--;
                }
            }
            
            
        },
        add(name){
            if(name == 'Multiple'){
                this.Multiple++;
            }else{
                this.count++;
            }
            
        }
    }
}
</script>
<style lang="less">
@import '../assets/css/home.less';
</style>
