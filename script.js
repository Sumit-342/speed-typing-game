const typingText = document.querySelector(".typing-text p "),
inpField = document.querySelector(".wrapper .input-field");
mistakeTag = document.querySelector(".mistake span")

let charIndex = mistakes = 0;

function randomParagraph() {
    let randindex = Math.floor(Math.random() * paragraphs.length)
    paragraphs[randindex].split("").forEach(span => {
        let sapnTag =`<span>${span}</span>`;

        typingText.innerHTML += sapnTag;
    });

    document.addEventListener("keydown",() => inpField.focus());
    typingText.addEventListener("click",() => inpField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(typedChar == null){
        charIndex--;
        if(characters[charIndex].classList.contains("incorrect")){
            mistakes--;

        }
        characters[charIndex].classList.remove("correct","incorrect");
    } else{
          if(characters[charIndex].innerHTML === typedChar){
        characters[charIndex].classList.add("correct");
        }
        else{
            mistakes++;
        characters[charIndex].classList.add("incorrect");
        }
        charIndex++;

    }
  
    characters.forEach( span => span.classList.remove("active"));
    characters[charIndex].classList.add("active");

    mistakeTag.innerText = mistakes;

}


randomParagraph();
inpField.addEventListener("input", initTyping);