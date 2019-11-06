import Interface from '../lib/index'

// var socket = new WebSocket(Interface.ws, ['chat','gzip-no']);

// socket.onopen = function (event) {
//     console.log('socket 开启')
// }


// socket.onerror = function(err) {
//     console.log('err')
// };
// socket.onclose = function(event) {
//     console.log('aaaa')
// };


export default function () {
	var Socket = {
		socket: '',
		sendData: [],
		fileReader: null,
		blobList: [],
		initSocket () {
            let options = ['chat','gzip-no']
            
            this.socket = new WebSocket(Interface.ws);
            
			this.socket.onopen = this.onopen;
			this.socket.onclose = this.onclose;
			this.socket.onerror = this.onerror;
			this.socket.onmessage = this._onmessage;
			return this;
		},
		_onmessage (msg) {
			Socket.onmessage && Socket.onmessage(msg.data)
			// this.fileReader = new FileReader();
		},
		onopen () {
			// console.log('socket 开启')
		},
		onerror (err) {
			console.log(err)
		},
		onclose (err) {
			console.log(err)
			// console.log('on....onclose')
		},
		send (data) {
			// console.log('on......send')
			this.socket.send(JSON.stringify(data))
		}
	}
	return Socket;
};