<template>

    <div class="guide-page">
        <p class="title">
            {{$t['rule']}}
        </p>
        <p class="detail-txt">
            {{$t['rule_txt1']}}
        </p>
        <p class="title" style="margin-top:1.5rem;">
            {{$t['open_time']}}
        </p>
        <p class="detail-txt" >
            {{$t['tip1']}}
        </p>
        <p class="title" style="margin-top:1.5rem;">
            {{$t['peize_seeting']}}
        </p>
        <table>
            <!-- <tr>
                <th>{{$t['peize_lev']}}</th>
                <th>{{$t['Present']}}</th>
                <th>Change</th>
                <th></th>
                <th></th>
                <th></th>
            </tr> -->
            <tr>
                <td></td>
                <!-- <td>BTC/ETH/EOS/WNS</td> -->
                <td>WNS</td>
                <td>BTC</td>
                <td>ETH</td>
                <td>EOS</td>
            </tr>
            <tr>
                <td>5+1</td>
                <!-- <td>5,000</td> -->
                <td>10,000</td>
                <td>1</td>
                <td>10</td>
                <td>1,000</td>
            </tr>
            <tr>
                <td>5+0</td>
                <!-- <td>500</td> -->
                <td>1,000</td>
                <td>0.1</td>
                <td>1</td>
                <td>100</td>
            </tr>
            <tr>
                <td>4+1</td>
                <!-- <td>40</td> -->
                <td>100</td>
                <td>0.01</td>
                <td>0.1</td>
                <td>10</td>
            </tr>
            <tr>
                <td>4+0</td>
                <!-- <td>6</td> -->
                <td>10</td>
                <td>0.001</td>
                <td>0.01</td>
                <td>1</td>
            </tr>
            <tr>
                <td>3+1</td>
                <!-- <td>3</td> -->
                <td>10</td>
                <td>0.001</td>
                <td>0.01</td>
                <td>1</td>
            </tr>
            <tr>
                <td>2+1</td>
                <!-- <td>1</td> -->
                <td>1</td>
                <td>0.0001</td>
                <td>0.001</td>
                <td>0.1</td>
            </tr>
            <!-- <tr>
                <td>2+0</td>
                <td>0.2</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
            <tr>
                <td>0+1</td>
                <td>0.1</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr> -->
            <tr>
                <td>Bet Price</td>
                <!-- <td>(Per 1 single bet)</td> -->
                <td>1</td>
                <td>0.0001</td>
                <td>0.001</td>
                <td>0.1</td>
            </tr>




            <!-- <tr>
                <td style="width:20%">1</td>
                <td class="td-bor" style="border:none">
                    <div class="bor red" v-for="item in 5"></div>
                    <div class="bor blue"></div>
                </td>
                <td style="width:20%;border-left:.1rem solid rgba(220,220,220,1);">5+1</td>
                <td style="width:30%">5000 {{getCoin}}</td>

                <td style="width:20%;border-left:.1rem solid rgba(220,220,220,1);">5+1</td>
                <td style="width:30%">5000 {{getCoin}}</td>
            </tr>
            <tr>
                <td style="width:20%">2</td>
                <td class="td-bor" style="border:none">
                    <div class="bor red" v-for="item in 5"></div>
                </td>
                <td style="width:20%;border-left:.1rem solid rgba(220,220,220,1);">5+0</td>
                <td style="width:30%">200 {{getCoin}}</td>
            </tr>
            <tr>
                <td style="width:20%">3</td>
                <td class="td-bor" style="border:none">
                    <div class="bor red" v-for="item in 4"></div>
                    <div class="bor blue"></div>
                </td>
                <td style="width:20%;border-left:.1rem solid rgba(220,220,220,1);">4+1</td>
                <td style="width:30%">40 {{getCoin}}</td>
            </tr>
            <tr>
                <td style="width:20%">4</td>
                <td class="td-bor" style="border:none">
                    <div class="bor red" v-for="item in 4"></div>
                </td>
                <td style="width:20%;border-left:.1rem solid rgba(220,220,220,1);">4+0</td>
                <td style="width:30%">6 {{getCoin}}</td>
            </tr>
            <tr>
                <td style="width:20%">5</td>
                <td class="td-bor" style="border:none">
                    <div class="bor red" v-for="item in 3"></div>
                    <div class="bor blue"></div>
                </td>
                <td style="width:20%;border-left:.1rem solid rgba(220,220,220,1);">3+1</td>
                <td style="width:30%">3 {{getCoin}}</td>
            </tr>
            <tr>
                <td style="width:20%">6</td>
                <td class="td-bor" style="border:none">
                    <div class="bor red" v-for="item in 2"></div>
                    <div class="bor blue"></div>
                </td>
                <td style="width:20%;border-left:.1rem solid rgba(220,220,220,1);">2+1</td>
                <td style="width:30%">1 {{getCoin}}</td>
            </tr>
            <tr>
                <td style="width:20%">7</td>
                <td class="td-bor" style="border:none">
                    <div class="bor red" v-for="item in 3"></div>
                </td>
                <td style="width:20%;border-left:.1rem solid rgba(220,220,220,1);">3+0</td>
                <td style="width:30%">0.4 {{getCoin}}</td>
            </tr>
            <tr>
                <td style="width:20%">8</td>
                <td class="td-bor" style="border:none">
                    <div class="bor red" v-for="item in 2"></div>
                </td>
                <td style="width:20%;border-left:.1rem solid rgba(220,220,220,1);">2+0</td>
                <td style="width:30%">0.2 {{getCoin}}</td>
            </tr>
            <tr>
                <td style="width:20%">9</td>
                <td class="td-bor" style="border:none">
                    <div class="bor blue"></div>
                </td>
                <td style="width:20%;border-left:.1rem solid rgba(220,220,220,1);">0+1</td>
                <td style="width:30%">0.1 {{getCoin}}</td>
            </tr> -->
        </table>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
    data(){
        return {

        }
    },
    created(){
        this.setHeadTitle(this.$t['rule'])
    },
    computed:{
        ...mapGetters([
            "getCoin"
        ])
    },
    methods:{
        ...mapMutations([
            "setHeadTitle"
        ])
    }
}
</script>

<style lang="less">
@import '../assets/css/guide.less';
</style>