<template>
    <div class="history-page">
        <!-- <div class="item" @click="detail">
            <p class="txt1">第000022期 2019-05-12 15:00</p>
            <div class="boll-list">
                <div class="bor i1" v-for="(item,key) in 5" :key="key">
                    0{{item}}
                </div>
                <div class="bor blue">
                    11
                </div>
                <i class="fas fa-chevron-right detail"></i>
            </div>
        </div> -->
        <div class="item" v-for="(item,key) in historyList" :key="key" @click="detail(item)">
            <p class="txt1">{{$t['no_round']}} {{item.period}} {{$t['no_round1']}} {{item.create_at | setTime}}</p>
            <div class="boll-list">
                <div class="bor" v-for="(item2,key2) in item.winning_no" :key="key2">
                    {{item2}}
                </div>
                <div class="bor blue-1">
                    {{item.powerball}}
                </div>
            </div>
            <i class="fas fa-chevron-right detail"></i>
        </div>
    </div>
</template>
<script>
import {getLotteryHistory} from '../common/init'
import {mapState, mapMutations} from 'vuex'
import qs from 'qs'
export default {
    data(){
        return {
            historyList:[]
        }
    },
    computed:{
        ...mapState([
            "bion"
        ])
    },
    created(){
        this.setHeadTitle(this.$t['Historical Winning Records'])
        let t = {
            currency:this.bion,
            pageSize:10,
            pageNum:1
        }
        getLotteryHistory(t).then(res => {
            if(res.Code == 200 && res.Data.list){
                res.Data.list.forEach(val => {
                    let t1 = val.winning_no.split(',');
                    val.winning_no = t1
                })
            }
            this.historyList = res.Data.list
        }).catch(err => {
            console.log(err)
        })
    },
    methods:{
        ...mapMutations([
            "setHeadTitle"
        ]),
        detail(item){
            this.$router.push({
                path:'/lottery/detail',
                query:{
                    data:qs.stringify(item)
                }
            })
        }
    },
    filters:{
        setTime(val){
            var t = new Date(val*1000)
            console.log()
            let m = (t.getMonth()+1 )< 10?('0'+(t.getMonth()+1)):(t.getMonth()+1)
            let d = t.getDate() < 10?('0'+t.getDate()):t.getDate()
            let h = t.getHours() < 10?('0'+t.getHours()):t.getHours()
            let min = t.getMinutes() < 10?('0'+t.getMinutes()):t.getMinutes()
            let s = t.getSeconds() < 10?('0'+t.getSeconds()):t.getSeconds()
            return t.getFullYear() + '-' + m + '-' + d + ' ' + h + ':' + min
            
        }
    }
}
</script>
<style lang="less">
@import '../assets/css/history.less';
</style>