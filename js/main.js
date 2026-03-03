window.addEventListener('load', function(){
    const hamburger = this.document.getElementById('hamburger');
    const navLinkHolder = this.document.getElementById('mobileShrink');
    const cartIcon = this.document.getElementById('cart');

    hamburger.addEventListener('click', function(){
        navLinkHolder.classList.toggle('show');
        cartIcon.classList.toggle('show');
    })

});

let mybutton = document.getElementById("topBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.opacity = "1";
  } else {
    mybutton.style.opacity = "0";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}