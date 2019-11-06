import fetch from '../lib/axios'
import qs from 'qs'
// import axios from 'axios'

//获取token
export function getToken(data){
    return fetch({
        baseURL:'http://10.10.1.20:8000',
        method:'get',
        url: "/api/fromenter/hotdice?platform=web",
        data
    });
}
//获取支持币种
export function getSupportCion(data){
    return fetch({
        url: "/coin",
        data
    });
}
//登录
export function userLogin(data){
    return fetch({
        url: "/login",
        data
    });
}
//获取资产
export function getAssets(data){
    
    return fetch({
        url: "/v1/balances",
        headers:{
            'x-access-token':data
        }
    });
}
//获取中奖号码
export function getWinLottery(data){
    return fetch({
        url: "/win_lottery",
        data
    });
}
//获取当前期数信息
export function getPowerball(data){
    return fetch({
        url: "/powerball",
        data
    });
}
//我的投注
export function getMyHistory(data,session){
    return fetch({
        url: "/v1/history",
        headers:{
            'x-access-token':session
        },
        data
    });
}
//历史开奖
export function getLotteryHistory(data){
    return fetch({
        url: "/lottery_history",
        data
    });
}

//获取游戏平台资产

export function getBanlans(){
    return fetch({
        url:'/api/addasset?userid=300002991&symbol=ETH&amount=8',
        data
    })
}
