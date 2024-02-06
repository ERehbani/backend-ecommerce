// Creamos uyna instancia de socket.io del lado del clinete
const socket = io();
console.log("ooawieoweiowieo");

// Creamos una variable para guardar el usuario:

let user;

const chatBox = document.getElementById("chatBox");

// Sweet Alert 2: es una libreria que nos permite crear alertas personalizadas

// Swal es unobjeto global que nos permite usar los metodos de la libreria
// Fire es un método nos permite configurar el alerta

Swal.fire({
  title: "Identificate",
  input: "text",
  text: "Ingresa un usuario para identificarte en el chat",
  inputValidator: (value) => {
    return !value && "Necesitas escribir un nombre para continuar";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
});

chatBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      // con socket.emit se envian los valores y con on se reciben
      socket.emit("message", { user: user, message: chatBox.value });
      chatBox.value = "";
    }
  }
});

socket.on("message", (data) => {
  let log = document.getElementById("message");
  let messages = "";

  data.forEach((message) => {
    messages = messages + `${message.user} dice: ${message.message} <br>`;
  });
  log.innerHTML = messages
});
