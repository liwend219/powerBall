import {getAssets} from '../common/init.js'

export default {
    getBalances(state){
        return state.balances
    },
    getSocket(state){
        return state.socket
    },
    getAssetsWs(state){
        return state.assetsWs
    },
    getSession(state){
        return state.session
    },
    getCoin(state){
        return state.bion
    },
    getCalcTime(state,v){
        return state.calcTime
    },
    getState(state){
        return state.socketState
    },
    getLanguageType(state){
        return state.languageType
    },
    $t(state){
        return state.language[state.languageType]
    },
    getDecimal(state){
        return state.decimal
    },
    getMinAmount(state){
        return state.minAmount
    },
    getHeadTitle(state){
        return state.headTitle
    },
    getBion (state) {
        return state.bion
    },
}