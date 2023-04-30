//
//
//
// CONSTANTES
//
//
//

const exit_button = document.getElementById('chatbot_exit');
const chatbot_window = document.querySelector("div[class='chatbot_window']");
const chatbot_button = document.getElementById('botao')
const chatbot_input = document.getElementById('chatbot_input_text');
const chatbot_text = document.getElementById('chatbot_text_id');
const chatbot_memory = "chatbot_memory.json";
const JSON = fetchJSON(chatbot_memory).then(data => {return data.script});

//
//
//
// FrontEnd CHATBOT
//
//
//
console.log(Object.keys(JSON))

exit_button.style.color = 'red';
function open_chatbot(){
  chatbot_button.style.cssText = 'display: none'
  chatbot_window.style.cssText = 'display: flex'

  fetchJSON(chatbot_memory)
  .then(data => {
    console.log(data.script.script_inicial)
    let node = document.createElement("p");
    let textnode = document.createTextNode(data.script.script_inicial);
    node.appendChild(textnode);
    document.getElementById("chatbot_text_id").appendChild(node);
    document.getElementById('chatbot_text_id').scrollTop -= 999999999999;
  })
  .catch(error => {
    console.error(error);
  });

}
function exit_chatbot() {   
  chatbot_window.style.cssText = 'display: none';
  chatbot_button.style.cssText = 'display: flex';
  chatbot_input.value='';
  document.getElementById("chatbot_text_id").querySelectorAll("p").forEach(p => {p.parentNode.removeChild(p)});
};
function user_text(input) {
  const node = document.createElement("p");
  node.style.textAlign = 'right';
  node.style.backgroundColor = '#5cd6ec94';
  const textnode = document.createTextNode(input);
  node.appendChild(textnode);
  document.getElementById("chatbot_text_id").appendChild(node);
}
function chatbot_response_theme(){

}
chatbot_input.addEventListener('keydown', function(e){
  let key = e.which || e.keyCode;
  if ((key == 13) && (this.value != '')){
    let response = this.value
      user_text(response)
      document.getElementById('chatbot_text_id').scrollTop -= 999999999999;
      chatbot_input.value=''; 
      
      search_memory(response)
    }
  });


//
//
//
// BackEnd CHATBOT
//
//
//

function fetchJSON(url, options = {}) {
  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching JSON:', error);
    });
}

function search_memory(input){
  switch (input){
    case "ajuda":
      fetchJSON(chatbot_memory)
      .then(data => {
        let node = document.createElement("p");
        let textnode = document.createTextNode(data.script.ajuda.script_ajuda);
        node.appendChild(textnode);
        document.getElementById("chatbot_text_id").appendChild(node);
        document.getElementById('chatbot_text_id').scrollTop -= 999999999999;
      })
      .catch(error => {
        console.error(error);
      });
    break
    default:
      fetchJSON(chatbot_memory)
      .then(data => {
        let node = document.createElement("p");
        let textnode = document.createTextNode(data.script.script_default);
        node.appendChild(textnode);
        document.getElementById("chatbot_text_id").appendChild(node);
        document.getElementById('chatbot_text_id').scrollTop -= 999999999999;
      })
      .catch(error => {
        console.error(error);
      });
  }

}

