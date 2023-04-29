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

//
//
//
// FrontEnd CHATBOT
//
//
//

exit_button.style.color = 'red';
function exit_chatbot() {   
    chatbot_window.style.cssText = 'display: none'
    chatbot_button.style.cssText = 'display: flex'
    chatbot_input.value='';
};
function open_chatbot(){
    chatbot_button.style.cssText = 'display: none'
    chatbot_window.style.cssText = 'display: static'
}
chatbot_input.addEventListener('keydown', function(e){
    let key = e.which || e.keyCode;
    if ((key == 13) && (this.value != '')){ 
      const node = document.createElement("p");
        node.style.textAlign = 'right';
        node.style.backgroundColor = '#5cd6ec94';
      const textnode = document.createTextNode(this.value);
      node.appendChild(textnode);
      document.getElementById("chatbot_text_id").appendChild(node);
      document.getElementById('chatbot_text_id').scrollTop -= 999999999999;
      chatbot_input.value='';
      
      search_memory(this.value)
    }
  });

//
//
//
// BackEnd CHATBOT
//
//
//

function search_memory(){}