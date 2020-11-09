const express = require("express")
port = process.env.PORT || 8080;

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
    // коннет у нас происходит при заходе в комнату
    console.log("Пришел новый пользователь")
    socket.username = "Anonim";


// смена имени
socket.on("change_username", (data)=>{
    console.log("Попытка поменять имя")
    socket.username = data.username;
    console.log(`Имя пользователя было изменено на ${socket.username}`)
})

socket.on("new_message", (data)=>{
    // if (data.message === ""){
    //     return;
    // }
    io.sockets.emit("add_mes", {message: data.message, username: data.username, color: data.color})
    })
})

