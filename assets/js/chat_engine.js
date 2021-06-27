// let socket = io();
// $('#message-submit').on('click', function(){

//   socket.emit('message',$('#message').html());
//   $('#message').html('')
// })

class ChatEngine{
  constructor(chatBoxId, userEmail){
    this.chatBox = $(`#${chatBoxId}`)
    this.email = userEmail
    this.socket = io.connect('http://localhost:5000')
    if(this.email){
      this.connectionHandler()
    }
  }

  connectionHandler(){
    let self = this
    this.socket.on('connect',() => {
      console.log('connection established using sockets');

      self.socket.emit('join-room',{
        user_email: self.email,
        chatRoom: 'codeial'
      })

      self.socket.on('user-joined',(data) => {
        console.log('a user joined the room', data);


      })

      $('#message-submit').on('click', function(e){
        e.preventDefault();
        if($('#message').val()){
          self.socket.emit('message',{
            message: $('#message').val(),
            chatRoom: 'codeial',
            email: self.email
          });
          $('#message').val('')
        }
        
      })
      

      self.socket.on('re-message',(data) => {
        console.log('the message received from server is ', data);
        if(data.email == self.email){
          let newMessage = $('<p></p>').html(data.message).addClass('left');
          $('#chat').append(newMessage)
        }else{
          let newMessage = $('<p></p>').html(data.message).addClass('right');
          $('#chat').append(newMessage)
        }
        
      })

      
    })
  }
}