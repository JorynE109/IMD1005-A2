window.addEventListener('load', function(){
    const hamburger = this.document.getElementById('hamburger');
    const navLinkHolder = this.document.getElementById('mobileShrink');
    const cartIcon = this.document.getElementById('cart');

    hamburger.addEventListener('click', function(){
        navLinkHolder.classList.toggle('show');
        cartIcon.classList.toggle('show');
    })




});