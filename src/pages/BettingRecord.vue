<template>
    <div class="record-page">
        <div class="item" v-for="(item,key) in list" :key="key">
            <p class="txt1">
                <span style="text-align:left">{{$t['no_round']}} {{item.period}} {{$t['no_round1']}} </span>
                <span style="text-align:right">{{item.created | setTime}}</span>
            </p>
            <div class="txt2">
                <p class="l">
                    <span class="red-txt" v-for="(item2,key2) in item.whiteNo" :key="key2">{{item2}}</span>
                    <span class="blue-txt">{{item.redNo}}</span>
                </p>
                <p class="r">
                    <!-- class="red" -->
                    <span >
                        {{item.win_state == 0 ? $t['noopen']:item.win_state == 1?$t['win']:$t['nowin']}}
                    </span>
                </p>
            </div>
            <p class="txt3">
                <span>{{$t['placements']}}：{{item.multi}}</span>
                <span>{{$t['bet_amout']}}:{{item.totalAmount}}{{getCoin}}</span>
            </p>
        </div>
        <!-- <div class="item">
            <p class="txt1">
                <span style="text-align:left">第000022期 2019-05-12 15:00</span>
                <span style="text-align:right">2019-05-12 15:00</span>
            </p>
            <div class="txt2">
                <p class="l">
                    <span class="red-txt">08</span>
                    <span class="red-txt">09</span>
                    <span class="red-txt">18</span>
                    <span class="red-txt">22</span>
                    <span class="red-txt">31</span>
                    <span class="blue-txt">12</span>
                </p>
                <p class="r">
                    <span>
                        未中奖
                    </span>
                </p>
            </div>
            <p class="txt3">
                <span>倍数：1</span>
                <span>金额：2ETH</span>
            </p>
        </div> -->
    </div>
</template>
<script>
import {getMyHistory} from '../common/init'
import { mapGetters, mapActions, mapMutations } from 'vuex';
export default {
    data(){
        return {
            list:[]
        }
    },
    computed:{
        ...mapGetters([
            "getSession",
            "getCoin"
        ])
    },
    created(){
        this.setHeadTitle(this.$t['Betting History'])
        let t = {
            pageSize:10,
            pageNum:1,
            currency:this.getCoin,
        }
        let session = this.getSession
        getMyHistory(t,session).then(res => {
            if(res.Code == 200 && res.Data.list){
                res.Data.list.forEach(val => {
                    let t = val.whiteNo.split(',');
                    val.whiteNo = t
                })
                this.list = res.Data.list
            }
        }).catch(err => {
            console.log(err)
        })
    },
    methods:{
        ...mapMutations([
            "setHeadTitle"
        ])
    },
    filters:{
        setTime(val){
            var t = new Date(val*1000)
            let m = t.getMonth() < 10?('0'+parseInt(t.getMonth()+1)):parseInt(t.getMonth())+1
            let d = t.getDate() < 10?('0'+t.getDate()):t.getDate()
            let h = t.getHours() < 10?('0'+t.getHours()):t.getHours()
            let min = t.getMinutes() < 10?('0'+t.getMinutes()):t.getMinutes()
            let s = t.getSeconds() < 10?('0'+t.getSeconds()):t.getSeconds()
            return t.getFullYear() + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
            
        }
    }
}
</script>

<style lang="less">
@import '../assets/css/bet-record.less';
</style>