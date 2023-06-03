var i = 0;
var j = 0;
var txt3 = "Ruby Galdean"

function typeWriter() {
  	  if (j < txt3.length) {
    document.getElementById("name").innerHTML += txt3.charAt(j);
    j++;
    setTimeout(typeWriter, 80);

  } 
}



$(document).ready(function(){

    // Smooth scrolling when clicking on a button with the class "scroll-btn"
    $("#projects").on("click", function(e) {
      e.preventDefault();
      var target = $(this).attr("href");
      $("html, body").animate({
        scrollTop: $(target).offset().top
      }, 800);
    });


});
