const { Server } = require('socket.io')

module.exports.chatSockets = function(chatServer) {
  // const io = new Server(chatServer)
  // io.on('connection',function(socket){

  //   socket.on('message',(msg) => {
  //     console.log('the message received is ',msg);
  //   })

  //   socket.on('disconnect',function(){
  //     console.log('user disconnected');
  //   })
  // })
  // return io

  let io = require('socket.io')(chatServer)
  io.sockets.on('connection',function(socket){
    console.log('new connection received',socket.id);

    socket.on('disconnect',function(){
      console.log('connection broken');
    })

    socket.on('join-room',function(data){
      console.log('joining request received',data);
      socket.join(data.chatRoom)
      io.in(data.chatRoom).emit('user-joined',data)
    })

    socket.on('message',function(data){
      console.log('message received by server',data);
      io.in(data.chatRoom).emit('re-message',data)
      
    })


  })

}