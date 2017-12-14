document.addEventListener('DOMContentLoaded', function(){

    var navBar = document.querySelector('.nav-bar');
    var navBarButton = document.querySelector('.nav-bar-button');


    navBarButton.addEventListener('click', function(){
        this.classList.toggle('active-nav-bar-button');
        navBar.classList.toggle('nav-bar-shown');
    })

    var mql768px = window.matchMedia('(min-width: 768px)');

    function hideNavbar(event){
        if(event.matches){
            if(navBar.className.indexOf('nav-bar-shown') !== -1){
                navBar.classList.remove('nav-bar-shown');
                navBarButton.classList.remove('active-nav-bar-button');
            }
        } else {
            if(navBar.className.indexOf('nav-bar-shown') !== -1){
                navBar.classList.remove('nav-bar-shown');
                navBarButton.classList.remove('active-nav-bar-button');
            }
        }
    }

    mql768px.addListener(hideNavbar);


})