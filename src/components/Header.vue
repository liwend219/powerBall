<template>
    <div class="header-page">
        <i class="fas fa-chevron-left" @click="$router.go(-1)"></i>
        <span class="title">{{title}}</span>
        <i class="fas fa-ellipsis-v"></i>
    </div>
</template>
<script>

export default {
    // name:'h-header',
    data (){
        return {
            title:''
        }
    },
    created(){
        this.title = this.$route.name
    },
    watch:{
        $route(val){
            this.title = this.$route.name
        }
    }
}
</script>
<style lang="less">
@import '../assets/css/header.less';
</style>

