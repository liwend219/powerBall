<template>
    <div class="lettery-page">
        <div class="banner">
            <div class="periods">
                <i class="fas fa-chevron-left" @click="lastPeriod(detailData.period)"></i>
                <span>{{$t['no_round']}} {{detailData.period}} {{$t['no_round1']}}</span>
                <i class="fas fa-chevron-right" @click="nextPeriod(detailData.period)"></i>
            </div>
            <div class="ball-box">
                <div class="bor i1" v-for="(item,key) in detailData.winning_no" :key="key">{{item}}</div>
                <div class="bor blue">{{detailData.powerball}}</div>
            </div>
        </div>
        <p class="txt-1">{{$t['seed']}}:{{detailData.seed}}</p>
        <div class="detail-box">
            <p class="title">
                {{$t['win_detail']}}
            </p>
            <table>
                <tr>
                    <th>{{$t['peize_lev']}}</th>
                    <th>{{$t['prize']}}（{{getCoin}}）</th>
                    <th>{{$t['prize_num']}}</th>
                </tr>
                <tr v-for="(item,key) in detailData.lottery" :key="key">
                    <td>{{item.level}}</td>
                    <td class="Amount">{{item.prize}}</td>
                    <td>{{item.count}}</td>
                </tr>
            </table>
        </div>
        <div class="loading" v-if="showLoading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>
<script>
import {getWinLottery} from '../common/init'
import {mapState, mapGetters} from 'vuex'
import qs from 'qs'
export default {
    data(){
        return{
            periods:22,
            msg:'hello world',
            detailData:'',
            showLoading:false
        }
    },
    computed:{
        ...mapState([
            "bion"
        ]),
        ...mapGetters([
            "getCoin"
        ])
    },
    created(){
        this.detailData = qs.parse(this.$route.query.data)
        console.log(this.detailData)
        // currency: "ETH"
        // jackpot: "50000"
        // period: "2019000127"
        // powerball: "2"
        // seed: "OWhNaUN2Mjl2WUJLeGp1TjRPalR5MWp1RWxFd3c1Y2R2eFRIWmc5SmJkMTBsQ05W"
        // total_sales: "0.001"
        // winning_no: Array(5)
        // 0: "15"
        // 1: "20"
        // 2: "27"
        // 3: "49"
        // 4: "50"
    },
    methods:{
        lastPeriod(num){
            this.showLoading = true
            let t = parseInt(num);
            // console.log(t-3)
            let t2 = {
                currency :this.bion,
                period:t-1
            }
            getWinLottery(t2).then(res => {
                this.showLoading = false
                if(res.Code == 200){
                    let arr = res.Data.winning_no.split(",")
                    let tmp = {
                        ...res.Data,
                        winning_no:arr
                    }
                    this.detailData = tmp
                }else if(res.Code == 666){
                    //没有记录
                    this.$toast(this.$t['No record'])
                }else if(res.Code == 667){
                    //没有开奖
                    this.$toast(this.$t['noopen'])
                }else{
                    this.$toast(res.Message)
                }
            }).catch(err => {
                this.showLoading = false
                console.log(err)
            })

        },
        nextPeriod(num){
            this.showLoading = true
            let t = parseInt(num);
            let t2 = {
                currency :this.bion,
                period:t+1
            }
            getWinLottery(t2).then(res => {
                this.showLoading = false
                if(res.Code == 200){
                    let arr = res.Data.winning_no.split(",")
                    let tmp = {
                        ...res.Data,
                        winning_no:arr
                    }
                    this.detailData = tmp
                }else if(res.Code == 666){
                    //没有记录
                    this.$toast(this.$t['No record'])
                }else if(res.Code == 667){
                    //没有开奖
                    this.$toast(this.$t['noopen'])
                }else{
                    this.$toast(res.Message)
                }
            }).catch(err => {
                this.showLoading = false
                console.log(err)
            })
        }
    }
}
</script>
<style lang="less">
@import '../assets/css/lettery-detail.less';
</style>