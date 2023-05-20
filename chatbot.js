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

//
//
//
// FrontEnd CHATBOT
//
//
//

function open_chatbot(){
  chatbot_button.style.cssText = 'display: none'
  chatbot_window.style.cssText = 'display: flex'
  let text = "inicio"

  searchJsonFile(text)
}
function exit_chatbot() {   
  chatbot_window.style.cssText = 'display: none';
  chatbot_button.style.cssText = 'display: flex';
  chatbot_input.value='';
  document.getElementById("chatbot_text_id").querySelectorAll("p").forEach(p => {p.parentNode.removeChild(p)});
};

chatbot_input.addEventListener('keyup', function(e){
  let key = e.which || e.keyCode;
  if ((key == 13) && (this.value != '')){
    let text = this.value
    let response = text.toLowerCase();
    user_text(response)
    document.getElementById('chatbot_text_id').scrollTop -= 999999999999;
    chatbot_input.value=''; 
      
    searchJsonFile(response)
  }
});


//
//
//
// BackEnd CHATBOT
//
//
//

function search_memory(jsonObject, input){
  let script = jsonObject.script;
  switch (input){
    case "inicio":
      chatbot_response_text(script.script_inicial);
      break
    case "ajuda":
      chatbot_response_text(script.ajuda.script_ajuda);
      break
    case "faq":
      for(i=0; i<3; i++){
        chatbot_response_text(script.ajuda.faq[i][0]);
        chatbot_response_text(script.ajuda.faq[i][1])
      }
      break
    case "site":
      chatbot_response_text(script.ajuda.site[0][0]);
      break
    case "contatos":
      for(i=0; i<3; i++){
        chatbot_response_text(script.ajuda.contatos[i]);
      }
      
      break
    case "recomendar":
      chatbot_response_text();
      break
    default:
      chatbot_response_text(script.script_default);
      break
  }
}

function user_text(input) {
  const node = document.createElement("p");
  node.style.textAlign = 'right';
  node.style.backgroundColor = '#5cd6ec94';
  const textnode = document.createTextNode(input);
  node.appendChild(textnode);
  document.getElementById("chatbot_text_id").appendChild(node);
}

function chatbot_response_text(text){
  let node = document.createElement("p");
  let textnode = document.createTextNode(text);
  node.appendChild(textnode);
  document.getElementById("chatbot_text_id").appendChild(node);
  document.getElementById('chatbot_text_id').scrollTop -= 999999999999;
}

function searchJsonFile(keyword) {
  fetch(chatbot_memory)
    .then(response => response.json())
    .then(data => {
      search_memory(data, keyword);
    })
    .catch(error => console.error(error));
}

//function searchJson(jsonObject, keyword) {
//  for (const key in jsonObject) {
//   const value = jsonObject[key];
//    if (typeof value === 'object') {
//      console.log('passei')
//      searchJson(value, keyword);
//    } else if (typeof value === 'string' && value.includes(keyword)) {
//      console.log(`Encontrado "${keyword}" em ${key}: ${value}`);
//    }
//  }
//}