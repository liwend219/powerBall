<template>
    <div class="home-page">
        <div class="banner-box">
            <div class="banner-left">
                <img src="/static/img/Powerball-b.png" alt="">
                <div class="left-body">
                    <p class="txt1">Powerball Jackpot</p>
                    <p class="txt2">{{getBalances[Bion] && Number(getBalances[Bion].available).toFixed(4)}} <span>{{Bion}}</span></p>
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
                <span class="txt2" @click="showCheckBion = true">{{Bion}}<i class="fas fa-sort-down down"></i>
                    <div class="box" v-if="showCheckBion">

                    </div>
                    <div v-if="showCheckBion" class="box-1">
                        <p  v-for="(item,key) in coinList" :key="key" @click.stop="checkBion(item.coin)" >{{item.coin}}</p>
                        
                    </div>
                </span>
                
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
            <div :class="selectState?'item':'item dis'"  @click="random">Selection</div>
            <div class="item" @click="bet">{{$t['bet']}}</div>
        </div>
        <p class="bom-txt">at least 4 white balls,1 red ball</p>


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
                <p class="his-title">No.{{nowLottery.period + 1}}period</p>
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
                    <!-- <div class="jsq-box">
                        <span class="l-t">Input</span>
                        <button @click="reduce('count')">-</button>
                        <div class="num">{{count}}</div>
                        <button @click="add('count')">+</button>
                        <span class="r-t">Times</span>
                    </div> -->
                </div>
                <p class="model2-txt2"><span style="color:#000;">Single 1 Note <span style="color:red">{{Multiple}}</span> period</span>
                <br>
                <span style="color:#000;">Bet price: <span style="color:red">{{(number * 0.001 * Multiple)}}</span> {{Bion}}</span>
                </p>
                <div class="btn2-box">
                    <button class="item dis" @click="showModel2 = false">Cancel</button>
                    <button class="item" @click="betting">Payment</button>
                </div>
            </div>
        </div>
        <!-- <Toast :txt="txt"></Toast> -->
    </div>
</template>
<script>
import {getSupportCion,userLogin,getWinLottery,getPowerball,getAssets} from '../common/init.js'
import {mapGetters,mapState,mapMutations} from 'vuex'
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
            Bion:'ETH',
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
            "getCalcTime"
        ]),
        calcTime(){
            return this.getCalcTime
        }
    },
    created(){
        let t = {
            currency:this.Bion
        }
        // this.calc()
        Promise.all([getSupportCion(),getPowerball(t)]).then(res => {
            if(res[0].Code == 200){
                this.Bion = res[0].Data[0].coin
                this.setBion(res[0].Data[0].coin)
                this.coinList = res[0].Data
            }
            if(res[1].Code == 200){
                this.periods = res[1].Data
                let t2 = {
                    currency :this.Bion,
                    period:parseInt(this.periods.period)-1
                }
                getWinLottery(t2).then(res3 => {
                    if(res3.Code == 200){
                        let t3 = res3.Data
                        let arr = res3.Data.winning_no.split(",")
                        t3.win_no = arr
                        this.nowLottery = t3
                        
                    }
                }).catch(err => {
                    console.log(err)
                })
                // this.nowLottery = res[1].Data
            }
        })

        this.random()
        // getSupportCion().then(res => {
            
        // }).catch(err => {
        //     console.log(err)
        // })
    },
    methods:{
        ...mapMutations([
            "setBion",
            "setBalances"
        ]),
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
        calc(){
            var self = this
            var timer = setInterval(() => {
                var date = new Date()
                let m = date.getMinutes()
                let s = date.getSeconds()
                let st = (60-m-1)* 60 + (60-s)
                let sm = parseInt(st/60)
                let ss = st%60
                self.calcTime = {
                    lm:parseInt(sm/10),
                    m:sm%10,
                    ls:parseInt(ss/10),
                    s:ss%10
                }
            },1000)
        },
        betting(){
            if(this.numList.length < 5){
                this.$toast('需要至少五个红球和一个蓝球')
                return
            }else if(!this.blueNum){
                this.$toast('需要至少五个红球和一个蓝球')
                return
            }
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

                let data = JSON.parse(msg)
                this.showModel2 = false
                if(data.type == 'error'){
                    this.$toast(data.payload)
                }else if(data.type == 'buy_ack'){
                    this.$toast('投注成功')
                    // getAssets(this.getSession).then(res => {
                    //     this.setBalances(res.Data)
                    // }).catch(err => {

                    // })
                }
                
            }
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
            this.Bion = name;
            this.setBion(name)
            this.showCheckBion = false
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
