window.addEventListener("scroll", updateFader);

function blinkMailingList() {
   var e = document.getElementById("mailing");
   e.classList.add("subscribe-large");
   setTimeout(function() {
    e.classList.remove("subscribe-large");
   }, 1000);
}

function updateFader() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let fader = document.getElementById("fader");
    fader.style.opacity = 0.3 + scrollTop / 500;
}

function scrollToTop() {
  document.body.scrollTop = 0; // Safari
  document.documentElement.scrollTop = 0; // Chrome, Firefox, IE and Opera
}
