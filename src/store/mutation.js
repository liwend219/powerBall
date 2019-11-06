import Socket from '../lib/socket'

import Socket2 from '../lib/assetsSocket'
export default {
    setBalances (state,v) {
        state.balances = v
    },
    setBion (state,v) {
        state.bion = v
    },
    setSocket(state) {
		state.socket = Socket().initSocket()
    },
    setAssetsWs(state){
        state.assetsWs = Socket2().initSocket()
    },
    setSession(state,v) {
		state.session = v
    },
    setCalcTime(state,v){
        state.calcTime = v
    },
    setState(state,v){
        state.socketState = v
    },
    setLanguageType(state,v){
        state.languageType = v
    }
}