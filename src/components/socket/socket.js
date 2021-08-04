import {io} from "socket.io-client"
const SERVER = "http://127.0.0.1:5000";
const socket = io(SERVER)

export default socket
