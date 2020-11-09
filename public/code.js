const background_color = [
    "has-background-danger",
    "has-background-info",
    "has-background-primary",
    "has-background-dark",
    "has-background-link",
];

function getRand(arr) {
    let rand_num = Math.round(Math.random() * arr.length - 1);
    let mod_num = Math.abs(rand_num);
    return mod_num;
}

const socket = io.connect("http://localhost:8080/")

const message = document.querySelector("#message"); // input
const username = document.querySelector("#username"); // input под имя
const send_username = document.querySelector("#send_username"); // Ккнопка отправки ника
const send_message = document.querySelector("#send_message"); // кнопка отправки сообщения
const chat = document.querySelector("#chat"); // cам чат
const show_name = document.querySelector("#show_name"); // отображение имени

const user_color = background_color[getRand(background_color)];


function display_name(name){
    show_name.innerHTML  =` <span class="${user_color}"> Ваш ник ${name} </span>`
}
display_name("Аноним");

send_username.onclick = () =>{

    socket.emit("change_username", {username: username.value});
    display_name(username.value);
}

function sending_message(){
    socket.emit("new_message", {username: username.value, message: message.value, color: user_color});
}
send_message.onclick = () => {
    sending_message();
}
// отправка сообщений на кнопку Enter
document.addEventListener("keypress", (e)=>{
    if(e.code == "Enter"){
        sending_message();
    }
})


socket.on('add_mes', (data)=>{
    let {username, message, color} = data;
    chat.insertAdjacentHTML("beforeend",
        `<h5 class="has-text-light ${color}">
                ${username}
                <span class="has-text-light"> ${message}</span>
                </h5>`)
    message.value = "";
})






