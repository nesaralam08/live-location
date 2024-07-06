const express = require('express')
const http = require('http')
const socket = require('socket.io')
const port = 4000
const path = require('path')
const app = express()
const server = http.createServer(app)
const io = socket(server)

app.set("view engine","ejs")
app.use(express.static("public"))

app.get('/',(req,res)=>{
    res.render("home")
})

io.on('connection',(socket)=>{
    socket.on('send-location',(data)=>{
        io.emit('receive-location',{id:socket.id,...data})
    })
    socket.on('disconnect',()=>{
        io.emit('user-disconnected',socket.id)
    })
})

server.listen(port,()=>{
    console.log(`server is runnig at :${port}`);
})