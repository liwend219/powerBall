import Socket from '../lib/socket'

export default function (that){
    const SOCKET = Socket().initSocket()
    that.setSocket(SOCKET)
    SOCKET._on('message',(data) => {
        console.log(data)
        
    })
    
}