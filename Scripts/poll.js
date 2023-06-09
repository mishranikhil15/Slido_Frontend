// const urlParams= new URLSearchParams(window.location.search)
// const room= urlParams.get("room")

let room = localStorage.getItem("roomno");
let baseUrl = "https://polleasy.onrender.com";
let token = localStorage.getItem("token");

let responseForm = document.getElementById("response-form");

const socket = io("https://polleasy.onrender.com/", {
  transports: ["websocket"],
});

socket.emit("joinRoom", { room });

socket.emit("msg", "Ajit");

socket.on("message", (msg) => {
  console.log(msg);
});

responseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let name = document.querySelector("#name").value;
  let res = document.getElementById("res").value;
  let obj = {
    name,
    res
  };

  socket.emit("response", obj);
  alert("Response Added");
  name = "";
  res = "";
});

async function getpoll() {
  try {
    let res = await fetch(`${baseUrl}/polls/${room}`, {
      method: "GET",
    });
    let data = await res.json();
    // let store=data[0].polls
    displaydata(data);
    console.log(data[0].polls);
  } catch (error) {
    console.log(error);
  }
}
getpoll();

const question = document.querySelector(".question");

function displaydata(data) {
  let div = document.createElement("div");
  let h3 = document.createElement("h3");
  h3.innerText = data[0].polls + "?";
  div.append(h3);
  question.append(div);
}
