function changeBGScroll() {
    let header = document.querySelector('.header')
    let spaceY = document.querySelector('.slider .learnbtn')
    // console.log(spaceY.offsetTop)
    document.addEventListener('scroll', function () {
        let y = window.pageYOffset;
        // console.log(spaceY.offsetTop)
        // console.log(y)
        if (y > spaceY.offsetTop) {
            header.classList.add('active')
        }
        else {
            header.classList.remove('active')
        }
    })
}

changeBGScroll()


function backToTop() {
    let back = document.querySelector('.footer__back')
    back.addEventListener('click', function () {
        window.scrollTo({

            'top': 0
        })

    })
}
backToTop()


function langSelect() {

    let lang = document.querySelector('.header__lang'),
        langCur = document.querySelector('.header__lang .header__lang-current span'),
        //  access to span bc span contains the text, not lang__current
        langOpt = document.querySelector('.header__lang .header__lang-option'),
        langItems = document.querySelectorAll('.header__lang .header__lang-option a');

    lang.addEventListener('click', function (e) {

        e.stopPropagation() // stop executing 2 events in the same time
        lang.classList.toggle('active')
    });

    langItems.forEach(item => {

        item.addEventListener('click', function () {

            let langText = langCur.innerHTML
            langCur.innerHTML = this.textContent
            this.innerHTML = langText

        })
    });

    document.addEventListener('click', function () {
        lang.classList.remove('active')
    })

}


langSelect()



function scrollMenu() {
    let menus = document.querySelectorAll('.header .header__menu li a')

    let heightHeader = document.querySelector('.header').offsetHeight
    // console.log(heightHeader)

    let sections = []


    function removeActiveMenu() {
        menus.forEach(function (element) {
            element.classList.remove('active')
        })
        //click other element and remove the 'active' out current element 

        // remove active all menu btn

    }




    menus.forEach(function (menu, index) {

        let href = menu.getAttribute('href') // get the attribute of href
        let className = href.replace('#', '') //delete # out of name

        // let className = menu.getAttribute('href').replace('#', '') // abbreviation

        let section = document.querySelector('.' + className) // find the class with '.'
        let posSection = section.offsetTop

        sections.push(section)


        menu.addEventListener('click', function (e) {

            e.preventDefault()
            // for deny the basic attribute href  of html

            let posSection = sections[index].offsetTop
            // let pos = document.querySelector('.' + className).offsetTop // abbreviation

            window.scrollTo({
                'top': posSection - heightHeader + 1
            })

            removeActiveMenu()
            menu.classList.add('active')
            // click and active
        })

    })

    // console.log(sections)

    window.addEventListener('scroll', function (e) {
        let y = window.pageYOffset

        sections.forEach(function (section, index) {
            if (y > section.offsetTop - heightHeader && y < section.offsetTop + section.offsetHeight)
            // min height is offsetTop , max height is offsetTop + offsetHeight
            {
                removeActiveMenu()
                menus[index].classList.add('active')
            }

            else {
                menus[index].classList.remove('active')

            }

        })
    })
}

scrollMenu()

// function sliderChange() {

//     let listItemSlider = document.querySelectorAll('.slider__items')
//     let currentSlider = 0
//     let number = document.querySelector('.number')
//     let dot = document.querySelectorAll('.dots li')

//     listItemSlider.forEach(function (item, index) {
//         if (item.classList.contains('active')) {
//             currentSlider = index // curr = 0

//         }
//     })

//     function showNumber(index) {

//         number.innerHTML = (index).toString().padStart(2, '0');
//     }



//     document.querySelector('.slider__bot-btn .--next').addEventListener('click', function (e) {
//         if (currentSlider < listItemSlider.length - 1) {
//             // listItemSlider[currentSlider].classList.remove('active') // remove active and empower into the next slide
//             // listItemSlider[currentSlider + 1].classList.add('active')
//             // currentSlider++ // we have to add 1 more currentSlider bc curr now is always  0
//             goTo(currentSlider + 1)
//         }
//         else {
//             // listItemSlider[currentSlider].classList.remove('active') // remove active and empower into the next slide
//             // listItemSlider[0].classList.add('active') // take curr = 0 , start a new loop
//             // currentSlider = 0 // out of range , so we have to start curr from 0 again
//             goTo(0)
//         }
//     })

//     document.querySelector('.slider__bot-btn .--prev').addEventListener('click', function (e) {
//         if (currentSlider > 0) {
//             // listItemSlider[currentSlider].classList.remove('active')
//             // listItemSlider[currentSlider - 1].classList.add('active')
//             // currentSlider--
//             goTo(currentSlider - 1)
//         }
//         else { // curr = 0
//             // listItemSlider[currentSlider].classList.remove('active')
//             // listItemSlider[listItemSlider.length - 1].classList.add('active')
//             // currentSlider = listItemSlider.length - 1
//             goTo(listItemSlider.length - 1)
//         }
//     })

//     function goTo(index) {
//         listItemSlider[currentSlider].classList.remove('active')
//         listItemSlider[index].classList.add('active')

//         dot[currentSlider].classList.remove('selected')
//         dot[index].classList.add('selected')

//         currentSlider = index
//         showNumber(currentSlider + 1)

//     }

//     dot.forEach(function (li, index) {
//         li.addEventListener('click', function () {
//             goTo(index)
//         })
//     })
// }

// sliderChange()


function sliderChange() {
    var slider = document.querySelector('.slider .slider__items-wrap');
    var flkty = new Flickity(
        slider,
        {
            // options
            cellAlign: 'left',
            contain: true,
            draggable: '>1',
            wrapAround: true,
            prevNextButtons: false,
            autoPlay: true,
            on: {
                ready: function () {
                    console.log('Flickity is ready');
                    handleDotSLider()
                },
                change: function (index) {
                    console.log('Slide changed to' + index);
                    handleNumPageSlider(index)
                }
            }
        }
    );

    // controls
    let btnPrev = document.querySelector('.slider__bot-btn .--prev'),
        btnNext = document.querySelector('.slider__bot-btn .--next')

    btnPrev.addEventListener('click', function () {
        flkty.previous(true)
    })

    btnNext.addEventListener('click', function () {
        flkty.next(true)

    })


    // dots

    function handleDotSLider() {
        let dotSlider = document.querySelector('.flickity-page-dots'),
            dotSLiderBot = document.querySelector('.slider .slider__bot .slider__bot-number')
        dotSLiderBot.appendChild(dotSlider)

    }

    // number 

    function handleNumPageSlider(index) {
        let numPage = document.querySelector('.slider .slider__bot .slider__bot-number .number')
        numPage.innerHTML = (index + 1).toString().padStart(2, '0')
    }
}


function handleVideo() {
    let videos = document.querySelectorAll('.video .video__list .video__list-items .circle'),
        modalVideo = document.querySelector('.popupvid'),
        iframeModalVideo = document.querySelector('.popupvid .popupvid__inner .popupvid__inner-iframe iframe'),
        btnClose = document.querySelector('.popupvid .popupvid__inner .popupvid__inner-close')
    videos.forEach(function (item, index) {
        item.addEventListener('click', function (e) {
            modalVideo.classList.add('active')

            // get attr
            let dataID = item.getAttribute('data-video-src')

            // set attr
            iframeModalVideo.setAttribute('src', `https://www.youtube.com/embed/${dataID}?autoplay=1`)
            // use the char `` in keyboard 1,  not ''
        })
    })

    function closeVideo() {
        modalVideo.classList.remove('active')
        iframeModalVideo.setAttribute('src', '')
        // disconnect to video link


    }
    btnClose.addEventListener('click', function (e) {
        closeVideo()
    })
    modalVideo.addEventListener('click', function (e) {
        closeVideo()
    })
}

handleVideo()


function progressBar() {


    let progress = document.querySelector('.progressbar')

    window.addEventListener('scroll', () => {
        let y = window.scrollY

        // let height = document.offsetHeight - window.innerHeight
        // innerHeight dont get full height like doc.offsetHeight bc of the scroll attr 
        // (the height screen at the bottom when we scroll till end)

        let percent = (y / (document.body.offsetHeight - window.innerHeight)) * 100
        progress.style.width = `${percent}%`
    })
}




function handleGalleryBot() {
    var galSlider = document.querySelector('.gallerybot .gallerybot__img');
    var progressBarGallery = document.querySelector('.gallery .gallery__bar')
    var flkty = new Flickity(
        galSlider,
        {
            // options
            cellAlign: 'left',
            contain: true,
            draggable: '>1',
            wrapAround: true,
            prevNextButtons: false,
            autoPlay: true,
            lazyLoad: 4,
            freeScroll: true
            ,
            on: {
                ready: function () {
                    console.log('Flickity is ready');
                },
                change: function (index) {
                    console.log('Slide changed to' + index);
                    flkty.on('scroll', function (progress) {
                        progress = Math.max(0, Math.min(1, progress));
                        progressBarGallery.style.width = progress * 100 + '%';
                    });
                }
            }
        }
    );
}

// TABS NEWS 


function handeleTabNews() {

    let tabs = document.querySelectorAll('.news .news__tabs .news__tabs-items'),
        listNews = document.querySelectorAll('.news .news__list')

    tabs.forEach(function (tabs__item) {
        tabs__item.addEventListener('click', function () {
            tabs.forEach(function (tabs__item) {
                tabs__item.classList.remove('active')
            })
            this.classList.add('active')

            // Hide All List
            listNews.forEach(function (news__item) {
                news__item.classList.remove('active')
            })

            // let id = this.dataset.tabs__item
            let id = this.getAttribute('data-tab')

            document.querySelector('.news__list-' + id).classList.add('active')
        })
    })


}

handeleTabNews()

window.addEventListener('load', function () {
    progressBar()
    sliderChange()
    handleGalleryBot()

})