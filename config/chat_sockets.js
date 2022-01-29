//receiving req for connection

// module.exports.chatSockets = function(socketServer){
//     let io = require('socket.io')(socketServer, {
//         cors: {
//             origin: "http://localhost:8000",
//             methods: ["GET", "POST"]
//         }
//     }
//     );

//     io.sockets.on('connection', function(socket){
//         console.log('new connection received', socket.id);

//         socket.on('disconnect', function(){
//             console.log('socket disconnected!');
//         });

//     });

// }

module.exports.chatSockets = function (socketServer) {
    let io = require('socket.io')(socketServer, {
        cors: {
            origin: "http://localhost:8000",
            methods: ["GET", "POST"],
            credentials: true
        }
    }
    );

    io.sockets.on('connection', function (socket) {
        console.log('new connection received', socket.id);

        socket.on('disconnect', function () {
            console.log('socket disconnected!');
        });

        socket.on('join_room', function (data) {
            console.log('joining request recieved', data);

            //sockets.join(room_name) adds the client to the room
            socket.join(data.chatroom);
                //user_joined is the event name
            io.in(data.chatroom).emit('user_joined', data);
        });

        // CHANGE :: detect send_message and broadcast to everyone in the room
        socket.on('send_message', function (data) {
            console.log(data);
            io.in(data.chatroom).emit('receive_message', data);
            
        });
    });

}

