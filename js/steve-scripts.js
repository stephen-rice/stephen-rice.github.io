function blinkMailingList() {
   var e = document.getElementById("mailing");
   e.classList.add("subscribe-large");
   setTimeout(function() {
    e.classList.remove("subscribe-large");
   }, 1000);
}