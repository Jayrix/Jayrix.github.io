document.addEventListener('DOMContentLoaded', function () {

     var galleryUl = document.querySelector('.gallery ul');
     var galleryUlChildrenInitial = [...galleryUl.children]; //potrzebne do headera .pages w fullscreen
     var body = document.querySelector('body');

     function initializeInterval(){
         var sliderIntervalId = setInterval(function(){
             galleryUl.classList.add('timed-transition-right'); //ustawia transition na czas przesuniecia, klasa jest usuwana przed wyzerowaniem przesuniecia zeby nie bylo ono animowane
             galleryUl.style.right = galleryUl.firstElementChild.clientWidth + 'px';
             setTimeout(function () { //timeout potrzebny na wykonanie sie animacji
                 galleryUl.classList.remove('timed-transition-right'); //usuwam timed transition zeby niewidoczne zerowanie right bylo natychmiastowe
                 galleryUl.appendChild(galleryUl.firstElementChild);
                 galleryUl.style.right = '0';
             }, 1800); //delay timeouta na wszelkki wypadek musi byc troche wiekszy od transition right

         },4000);
         return sliderIntervalId;
     }


    function downloadURL(url, name) {
        var link = document.createElement("a");
        link.download = name;
        link.href = url;
        link.click();
    }

    var id = initializeInterval();

    galleryUl.addEventListener('mouseenter', function () {
        clearInterval(id);
    });

    galleryUl.addEventListener('mouseleave', function(){
        id = initializeInterval();
    });


    galleryUl.addEventListener('click', function (e) {
        if(e.target.tagName == 'IMG'){


            body.style.overflow = 'hidden';
            var parentLi = e.target.parentElement;
            var fullscreenDiv = document.createElement('div');
            var htmlCode = '<header class="pages">' + (galleryUlChildrenInitial.indexOf(parentLi) + 1) + '/5</header>' +
                            '<span id="cross">' +
                '               <i class="fa fa-times" aria-hidden="true"></i>' +
                '           </span>' +
                            '<span id="arrowLeft">' +
                '               <i class="fa fa-chevron-left" aria-hidden="true"></i>' +
                '           </span>' +
                            '<div class="fullScreen-image-container">' +
                '               <img src=' + e.target.src +'>' +
                '           </div>' +
                            '<span id="arrowRight">' +
                '               <i class="fa fa-chevron-right" aria-hidden="true"></i>' +
                '           </span>' +
                            '<div class="icon-container">' +
                '               <span id="play">' +
                '                   <i class="fa fa-play" aria-hidden="true"></i>' +
                '               </span>' +
                            '   <span id="download">' +
                '                   <i class="fa fa-download" aria-hidden="true"></i>' +
                '               </span>' +
                '           </div>';

            fullscreenDiv.innerHTML = htmlCode;
            body.appendChild(fullscreenDiv);
            fullscreenDiv.classList.add('fullScreen');


            var pages = fullscreenDiv.querySelector('header.pages');
            var exitCross = fullscreenDiv.querySelector('#cross i');
            var nextImg = fullscreenDiv.querySelector('#arrowRight i');
            var img = fullscreenDiv.querySelector('.fullScreen-image-container img');
            var prevImg = fullscreenDiv.querySelector('#arrowLeft i');
            var playSlideShow = fullscreenDiv.querySelector('#play i');
            var download = fullscreenDiv.querySelector('#download i');

            /**
             *  impure functions for album control operating on global variables (were I doing this with current knowledge I'd
             *  have done it differently)
             */

            function loadOnTimeout(DOMelement){
                img.classList.add('timed-scale');
                setTimeout(function (){
                    if(DOMelement){
                        img.src = DOMelement.firstElementChild.src;
                        img.classList.remove('timed-scale');
                        parentLi = DOMelement;
                        pages.innerText = galleryUlChildrenInitial.indexOf(parentLi) + 1 + '/5';
                    }
                },300);
            }

            function loadNextImg() {
                if([...galleryUl.children].indexOf(parentLi) === [...galleryUl.children].length - 1){
                    loadOnTimeout(galleryUl.firstElementChild);
                }else {
                    loadOnTimeout(parentLi.nextElementSibling);
                }
            }

            function loadPrevImg() {
                if([...galleryUl.children].indexOf(parentLi) === 0){
                    loadOnTimeout(galleryUl.lastElementChild);
                }else {
                    loadOnTimeout(parentLi.previousElementSibling);
                }
            }

            function toggleAlbumInterval() {
                var id = setInterval(loadNextImg,2000);
                return id
            }

            var albumIntervalId;
            function togglePlaySlideshow(icon) {
                icon.classList.toggle('fa');
                icon.classList.toggle('fa-play');
                icon.classList.toggle('slide-show-on');
                icon.textContent = (icon.textContent === "") ? '| |' : '';
                if(playSlideShow.classList.contains('slide-show-on')){
                    albumIntervalId = toggleAlbumInterval();
                } else {
                    clearInterval(albumIntervalId);
                }
            }


            fullscreenDiv.addEventListener('click', function (e) {

                switch (e.target){
                    case fullscreenDiv:
                        body.removeChild(fullscreenDiv);
                        body.style.overflow = 'auto';
                        break;
                    case exitCross:
                        body.removeChild(fullscreenDiv);
                        body.style.overflow = 'auto';
                        break;
                    case nextImg:
                        loadNextImg();
                        break;
                    case prevImg:
                        loadPrevImg();
                        break;
                    case download:
                        downloadURL(img.src, img.name);
                        break;
                    case download.parentElement:
                        downloadURL(img.src, img.name);
                        break;
                    case playSlideShow:
                        togglePlaySlideshow(playSlideShow);
                        break;
                    case playSlideShow.parentElement:
                        togglePlaySlideshow(playSlideShow);
                        break;

                }

            });

        }

    });

});