import lang from '../language'
export default {
    balances:{},
    bion:'',
    socket:'',
    assetsWs:'',
    session:'',
    socketState:0,
    calcTime:{
        lm:0,
        m:0,
        ls:0,
        s:0
    },
    languageType:'en-US',
    language: {
		...lang
    },
    decimal:{},
    minAmount:0,
    headTitle:''
}