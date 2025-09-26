const typingText = document.querySelector(".typing-text p "),
inpField = document.querySelector(".wrapper .input-field");
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span");
wpmTag = document.querySelector(".wpm span");
cpmTag = document.querySelector(".cpm span");
tryAgainBtn = document.querySelector("button");



let timer,
maxTime=60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

function randomParagraph() {
    let randindex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[randindex].split("").forEach(span => {
        let sapnTag =`<span>${span}</span>`;

        typingText.innerHTML += sapnTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown",() => inpField.focus());
    typingText.addEventListener("click",() => inpField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
   
    if(charIndex < characters.length -1 && timeLeft > 0) {
         if(!isTyping) {
        timer = setInterval(initTimer , 1000);
        isTyping = true;
    }
   
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

    let wpm = Math.round((((charIndex - mistakes) / 5 ) / (maxTime - timeLeft )) * 60)
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = wpm;
    cpmTag.innerText = charIndex - mistakes;

    } else {
        inpField.value = "";
        clearInterval(timer);
    }
    if (charIndex === characters.length - 1) {
        launchConfetti();
    }
}

function initTimer() {
    if(timeLeft > 0 ){
        timeLeft--;
        timeTag.innerText = timeLeft;

        // Reset classes first
        timeTag.classList.remove("warning", "danger");

        // Add color based on time left
        if(timeLeft <= 10){
            timeTag.classList.add("danger");
        } else if(timeLeft <= 30){
            timeTag.classList.add("warning");
        }
    }
    else{
        clearInterval(timer);

        timeTag.classList.remove("danger", "warning");
        timeTag.style.color = "red"; // keep final red static
        timeTag.style.transform = "scale(1)"; // reset size
        timeTag.innerText = 0;
    }
}

function resetGame () {
    randomParagraph();
    inpField.value = "";
    clearInterval(timer);
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
     mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);


function launchConfetti() {
  const duration = 2 * 1000; // 2 seconds
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

  // 🎉 Show success message
 // 🎉 Show success message with stats
   const msg = document.getElementById("successMessage");
  let wpm = parseInt(wpmTag.innerText);
  let feedback = "";

  if (wpm >= 70) feedback = "🚀 Lightning fast!";
  else if (wpm >= 40) feedback = "🔥 Great job!";
  else feedback = "💪 Keep practicing!";

  msg.innerHTML = `
    Well done! 🎉<br>
    <strong>WPM: ${wpmTag.innerText}</strong> | 
    <span class="mistakes">Mistakes: ${mistakeTag.innerText}</span><br>
    ${feedback}
  `;
  msg.classList.add("show");



  // Hide after 2.5s
 setTimeout(() => {
  msg.classList.remove("show");
  msg.classList.add("hide");

  // Reset after animation so it's ready for next time
  setTimeout(() => {
    msg.classList.remove("hide");
  }, 500); // match CSS transition time
}, 2500);
}
