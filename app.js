const express = require("express") // импортируем библиотку express
port = process.env.PORT || 8080; // определение порта, с которого мы совершаем выход в интернет

const app = express(); // инициализируем экземпляр нашего приложения

app.set("view engine", "ejs")  // запускаем рендер нашего ejs шаблона

app.use(express.static("public")) //  статика, которая  отдается полностью неизменной

app.get("/", (req, res)=>{
    res.render("index") // рендеринг  нашего ejs
})

server = app.listen(port, ()=>{
    console.log("http://localhost:8080"); // адрес, на котором запускуется наш сервер
})
const io = require("socket.io")(server) // подключаем socket.io к expresss
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
socket.on("change_username", (data)=>{ // при emit change
    console.log("Меняем имя")
    socket.username = data.username; // задаем имя нашего пользователя
    console.log(`Имя пользователя было изменено на ${socket.username}`)
})

socket.on("new_message", (data)=>{
    // когда у нас получается new_message
    if (data.message === ""){
        return; // если пустое сообщение, тогда заканчиваем работу этой штуки
    }
    io.sockets.emit("add_mes", {message: data.message, username: data.username, color: data.color})
    // всем эмитим нашу сообщеньку
    })
})

