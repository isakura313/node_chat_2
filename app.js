const express = require("express")
port = process.env.PORT || 2000;

const app = express();

app.set("view engine", "ejs")

app.use(express.static("public"))

app.get("/", (req, res)=>{
    res.render("index")
})

server = app.listen(port, ()=>{
    console.log("http://localhost:8080");
})
const io = require("socket.io")(server)
// Какая функциональность будет в чате?
// можно будет вписать имя и закрепить с собой
// можно отправлять сообщения в чате
// можно будет видеть сообщения других людей
// удалять редактировать?


io.on("connection", (socket)=>{
    console.log("Пришел новый пользователь")
    socket.username = "Anonim";
})

// смена имени
socket.io("change_username", (data)=>{
    socket.username = data.username;
})

socket.on("send_message", (data)=>{
    if (data.message === ""){
        return;
    }
    io.sockets.emit("add_mes", {
        message: data.message,
        username: data.username,
        color: data.color
    })
})


