<template>
    <div class="header-page">
        <i v-if="$route.path != '/'" class="fas fa-chevron-left" @click="$router.go(-1)"></i>
        <p class="title" style="width:100%;text-align:center">{{getHeadTitle}}</p>
        <!-- <i v-if="$route.path != '/'" class="fas fa-ellipsis-v"></i> -->
    </div>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex';
export default {
    // name:'h-header',
    data (){
        return {
            title:''
        }
    },
    computed:{
        ...mapGetters([
            "getHeadTitle",
        ]),
    },
    created(){
        
    },
    methods:{
        ...mapMutations([
            "setHeadTitle"
        ])
    },
    watch:{
        $route(val){
            if(val.path == '/'){
                this.setHeadTitle('Powerball Jackpot')
            }
        }
    }
}
</script>
<style lang="less">
@import '../assets/css/header.less';
</style>

