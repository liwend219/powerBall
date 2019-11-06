<template>
    <div class="toast-box">
        <!-- 12313765797987 -->
        {{txt}}
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    props:{
        txt:''
    }
}
</script>

<style lang="less">
.toast-box{
    position: fixed;
    width:30%;
    left:50%;
    margin-left:-15%;
    top:40%;
    display: inline-block;
    padding: .5rem 1rem;
    background: rgba(36, 36, 36, 0.7);
    border-radius: .4rem;
    color:#fff;
    font-size: 1.6rem;
}
</style>


