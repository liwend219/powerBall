import Interface from '../lib/index'
import ReconnectingWebSocket from 'ReconnectingWebSocket'

import mutation from '../store/mutation.js'
import getter from '../store/getter'
import state from '../store/state'
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
            
            this.socket = new WebSocket(Interface.assetsWS,options);
            
			this.socket.onopen = this.onopen;
			this.socket.onclose = this.onclose;
			this.socket.onerror = this.onerror;
			this.socket.onmessage = this._onmessage;
			return this;
		},
		_onmessage (msg) {
			
		},
		onopen (data) {
			console.log('socket 开启2')
		},
		onerror (err) {
			console.log('cuocucouoc....................')
		},
		onclose (err) {
			
		},
		send (data) {
			this.socket.send(JSON.stringify(data))
		}
	}
	return Socket;
};