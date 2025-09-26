(function(){
  const titleEl = document.querySelector(".animated-title");
  if(!titleEl) return;

  // PHRASES to type (all caps). You can put one phrase or multiple variations.
  const phrases = [
    "TYPING SPEED TEST",
    "PRACTICE · IMPROVE · COMPETE",
    "TYPE FAST. TYPE CLEAN."
  ];

  // CONFIG: tweak these to adjust speed / pause (in ms)
  const typingSpeed = 120;        // ms per character when typing (lower = faster)
  const erasingSpeed = 100;       // ms per character when erasing (lower = faster)
  const pauseAfterTyped = 2000;  // pause after full phrase typed (ms)
  const pauseBetweenPhrases = 600; // short pause before typing next phrase

  let phraseIndex = 0;
  let charIndex = 0;
  let isErasing = false;

  function typeLoop(){
    const current = phrases[phraseIndex];
    if(!isErasing){
      // typing
      titleEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if(charIndex === current.length){
        // finished typing
        setTimeout(()=> { isErasing = true; typeLoop(); }, pauseAfterTyped);
        return;
      }
      setTimeout(typeLoop, typingSpeed);
    } else {
      // erasing
      titleEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if(charIndex === 0){
        // finished erasing, move to next phrase
        isErasing = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeLoop, pauseBetweenPhrases);
        return;
      }
      setTimeout(typeLoop, erasingSpeed);
    }
  }

  // start after small delay so page paints properly
  setTimeout(()=> {
    // start from first phrase typing
    charIndex = 0; isErasing = false;
    typeLoop();
  }, 400);
})();