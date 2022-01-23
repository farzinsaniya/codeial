//SENDING THE CONNECTION REQUEST VIA port:5000
// class ChatEngine{
//     constructor(chatBoxId, userEmail){
//         this.chatBox = $(`#${chatBoxId}`);
//         this.userEmail = userEmail;
//         //io.connect is an in-built function
//         this.socket = io.connect('http://localhost:5000');

//         if (this.userEmail){
//             this.connectionHandler();
//         }

//     }

//         //creating a connection handler
//     connectionHandler(){
//         this.socket.on('connect', function(){
//             console.log('connection established using sockets...!');
//         });
//     }
// }
class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000', { transports : ['websocket'] });

        if (this.userEmail){
            this.connectionHandler();
        }

    }


    connectionHandler(){
        let self = this ;

        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');


            self.socket.emit('join_room' , {
                //setting up the chat room
                user_email : self.userEmail,
                chatroom : 'codeial'
            });

            //joining of the user
            self.socket.on('user_joined' , function(data){
                console.log('a user joined the room' , data);
            });


        });

        // CHANGE :: send a message on clicking the send message button
        // $('#send-message').click(function(){
        //     let msg = $('#chat-message-input').val();

        //     if (msg != ''){
        //         self.socket.emit('send_message', {
        //             message: msg,
        //             user_email: self.userEmail,
        //             chatroom: 'codeial'
        //         });
        //     }
        // });

        // self.socket.on('receive_message', function(data){
        //     console.log('message received', data.message);


        //     let newMessage = $('<li>');

        //     let messageType = 'other-message';

        //     if (data.user_email == self.userEmail){
        //         messageType = 'self-message';
        //     }

        //     newMessage.append($('<span>', {
        //         'html': data.message
        //     }));

        //     newMessage.append($('<sub>', {
        //         'html': data.user_email
        //     }));

        //     newMessage.addClass(messageType);

        //     $('#chat-messages-list').append(newMessage);
        // })
    }
}