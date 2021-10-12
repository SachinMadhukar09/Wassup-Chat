const express = require('express');
const app = express();
const http = require('http').createServer(app)
const cors  = require('cors')

const PORT = process.env.PORT || 3003

http.listen(PORT , ()=>{
    console.log(`listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))
app.use(cors())

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
    // res.send("HELLO WORLD")
})

// Scoket

const io = require('socket.io')(http)

io.on('connection', (socket)=>{
    console.log("Connected...")
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
})