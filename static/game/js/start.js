const socket = io()
if (!localStorage.token) location.href = "../login.html"

socket.on('log', data => {
  console.log(data)
})

function cmd(c){
  socket.emit('cmd', c)
}
