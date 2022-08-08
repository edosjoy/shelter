'use strict';

const
    widthScreen = window.screen.width,
    translateXDesktop = 1200,
    translateXTablet = 600,
    translateXMobile = 300;

let
    url = '',
    positionSlide = 0;

const
    body = document.querySelector('body'),
    header = body.querySelector('.header'),
    logo = body.querySelector('.header-logo'),
    burgerBtn = body.querySelector('.header-burger_btn'),
    mobileMenu = body.querySelector('.mobile-menu'),
    cardsSlide = body.querySelector('.main-cards-slide'),
    doubleArrowLeft = body.querySelector('#double-arrow-left'),
    arrowLeft = body.querySelector('#arrow-left'),
    arrowRight = body.querySelector('#arrow-right'),
    doubleArrowRight = body.querySelector('#double-arrow-right'),
    numPagination = body.querySelector('.num'),
    modal = body.querySelector('.modal');

burgerBtn.addEventListener('click', e => {
    e.preventDefault();
    toggleClass();
});

body.addEventListener('click', e => {
    if (e.target.classList.contains('mobile-menu-open')) {
        toggleClass();
    }
});

mobileMenu.addEventListener('click', e => {
    if (e.target.innerText === 'Our pets' ||e.target.innerText === 'Contacts') {
        toggleClass();
    }
});

function toggleClass() {
    burgerBtn.classList.toggle('burger-btn-active');
    body.classList.toggle('mobile-menu-open');
    mobileMenu.classList.toggle('menu-active');
    logo.classList.toggle('logo-in-mobile-menu');
}


if (widthScreen > 1279) {
    url = '../../assets/data/pets_desktop.json';
} else if (widthScreen < 1280 && widthScreen > 767) {
    url = '../../assets/data/pets_tablet.json';
} else if (widthScreen < 768) {
    url = '../../assets/data/pets_mobile.json';
}


fetch(url).then(responsive => responsive.json()).then(objectPets => {

    if (sessionStorage.reverse && sessionStorage.getItem('reverse') === 'true') {
        objectPets.reverse();
        sessionStorage.setItem('reverse', 'false');
    } else {
        sessionStorage.setItem('reverse', 'true');
    }

    objectPets.forEach((pet, index) => {
    cardsSlide.innerHTML += `
        <div class="main-cards-item" data-modal="true" data-current="${index}">
                <img src="${pet.img}" alt="${pet.name}" data-modal="true" data-current="${index}">
                <p class="main-cards-item-title georgia" data-modal="true" data-current="${index}">${pet.name}</p>
                <button class="main-cards-item-button button-white" data-modal="true" data-current="${index}">Learn more</button>
            </div>`;
    });

    cardsSlide.addEventListener('click', e => {
        const t = e.target;

        if (t.dataset.modal) {
            modal.innerHTML = `
            <div class="main-description">
                <img src="${objectPets[t.dataset.current].img}" alt="${objectPets[t.dataset.current].name}" class="main-description-image">
                <div class="main-description-content">
                    <h3 class="main-description-content-head">${objectPets[t.dataset.current].name}</h3>
                    <h4 class="main-description-content-subhead">${objectPets[t.dataset.current].type} - ${objectPets[t.dataset.current].breed}</h4>
                    <h5 class="main-description-content-text">${objectPets[t.dataset.current].description}</h5>
                    <ul class="main-description-content-list">
                        <li class="main-description-content-list-item"><span class="georgia"><span>Age:</span> ${objectPets[t.dataset.current].age}</span></li>
                        <li class="main-description-content-list-item"><span class="georgia"><span>Inoculations:</span> ${objectPets[t.dataset.current].inoculations}</span></li>
                        <li class="main-description-content-list-item"><span class="georgia"><span>Diseases:</span> ${objectPets[t.dataset.current].diseases}</span></li>
                        <li class="main-description-content-list-item"><span class="georgia"><span>Parasites:</span> ${objectPets[t.dataset.current].parasites}</span></li>
                    </ul>
                </div>
                <img src="../../assets/icons/cross.png" class="main-description-close">
            </div>`;

            modal.classList.toggle('hidden');
            body.style.overflow = 'hidden';
            header.style.zIndex = '0';
        }
    });
});

modal.addEventListener('click', function (e) {
    const t = e.target;

    if (t.classList.contains('modal') || t.classList.contains('main-description-close')) {
        this.classList.toggle('hidden');
        body.style.overflow = '';
        header.style.zIndex = '';
    }
});

modal.addEventListener('mousemove', function (e) {
    if (e.target.classList.contains('modal') || e.target.classList.contains('main-description-close')) {
        this.lastChild.lastElementChild.style.backgroundColor = '#F1CDB3';
    } else {
        this.lastChild.lastElementChild.style.backgroundColor = 'transparent';
    }
});

arrowLeft.addEventListener('click', function (e) {
   e.preventDefault();

    if (widthScreen > 1279 && (positionSlide >= -6000 && positionSlide < 0)) {
        positionSlide += translateXDesktop;
        numPagination.innerText = positionSlide / -1200 + 1;
        if (positionSlide > -6000) {
            arrowRight.classList.remove('main-pagination-item_arrow_inactive');
            arrowRight.classList.add('main-pagination-item_arrow_active');
            doubleArrowRight.classList.remove('main-pagination-item_arrow_inactive');
            doubleArrowRight.classList.add('main-pagination-item_arrow_active');
        }
    } else if ((widthScreen < 1280 && widthScreen > 767) && (positionSlide >=-4200 && positionSlide < 0)) {
        positionSlide += translateXTablet;
        numPagination.innerText = positionSlide / -600 + 1;
        if (positionSlide > -4200) {
            arrowRight.classList.remove('main-pagination-item_arrow_inactive');
            arrowRight.classList.add('main-pagination-item_arrow_active');
            doubleArrowRight.classList.remove('main-pagination-item_arrow_inactive');
            doubleArrowRight.classList.add('main-pagination-item_arrow_active');
        }
    } else if (widthScreen < 768 && (positionSlide >= -4500 && positionSlide < 0)) {
        positionSlide += translateXMobile;
        numPagination.innerText = positionSlide / -300 + 1;
        if (positionSlide > -4500) {
            arrowRight.classList.remove('main-pagination-item_arrow_inactive');
            arrowRight.classList.add('main-pagination-item_arrow_active');
            doubleArrowRight.classList.remove('main-pagination-item_arrow_inactive');
            doubleArrowRight.classList.add('main-pagination-item_arrow_active');
        }
    }

    if (positionSlide >= 0) {
        this.classList.remove('main-pagination-item_arrow_active');
        this.classList.add('main-pagination-item_arrow_inactive');
        doubleArrowLeft.classList.remove('main-pagination-item_arrow_active');
        doubleArrowLeft.classList.add('main-pagination-item_arrow_inactive');
    }

    cardsSlide.style.transform = `translateX(${positionSlide}px)`;
});

doubleArrowLeft.addEventListener('click', function (e) {
    e.preventDefault();

    if (positionSlide < 0) {
        positionSlide = 0;
        numPagination.innerText = '1';
    }

    this.classList.remove('main-pagination-item_arrow_active');
    this.classList.add('main-pagination-item_arrow_inactive');
    arrowLeft.classList.remove('main-pagination-item_arrow_active');
    arrowLeft.classList.add('main-pagination-item_arrow_inactive');
    arrowRight.classList.add('main-pagination-item_arrow_active');
    arrowRight.classList.remove('main-pagination-item_arrow_inactive');
    doubleArrowRight.classList.add('main-pagination-item_arrow_active');
    doubleArrowRight.classList.remove('main-pagination-item_arrow_inactive');

    cardsSlide.style.transform = `translateX(${positionSlide}px)`;
});

arrowRight.addEventListener('click', function (e) {
    e.preventDefault();

    if (widthScreen > 1279 && (positionSlide <= 0 && positionSlide > -6000)) {
        positionSlide -= translateXDesktop;
        numPagination.innerText = positionSlide / -1200 + 1;
        if (positionSlide <= -6000) {
            this.classList.remove('main-pagination-item_arrow_active');
            this.classList.add('main-pagination-item_arrow_inactive');
            doubleArrowRight.classList.remove('main-pagination-item_arrow_active');
            doubleArrowRight.classList.add('main-pagination-item_arrow_inactive');
        }
    } else if ((widthScreen < 1280 && widthScreen > 767) && (positionSlide <= 0 && positionSlide > -4200)) {
        positionSlide -= translateXTablet;
        numPagination.innerText = positionSlide / -600 + 1;
        if (positionSlide <= -4200) {
            this.classList.remove('main-pagination-item_arrow_active');
            this.classList.add('main-pagination-item_arrow_inactive');
            doubleArrowRight.classList.remove('main-pagination-item_arrow_active');
            doubleArrowRight.classList.add('main-pagination-item_arrow_inactive');
        }
    } else if (widthScreen < 768 && (positionSlide <= 0 && positionSlide > -4500)) {
        positionSlide -= translateXMobile;
        numPagination.innerText = positionSlide / -300 + 1;
        if (positionSlide <= -4500) {
            this.classList.remove('main-pagination-item_arrow_active');
            this.classList.add('main-pagination-item_arrow_inactive');
            doubleArrowRight.classList.remove('main-pagination-item_arrow_active');
            doubleArrowRight.classList.add('main-pagination-item_arrow_inactive');
        }
    }

    if (positionSlide < 0) {
        arrowLeft.classList.add('main-pagination-item_arrow_active');
        arrowLeft.classList.remove('main-pagination-item_arrow_inactive');
        doubleArrowLeft.classList.add('main-pagination-item_arrow_active');
        doubleArrowLeft.classList.remove('main-pagination-item_arrow_inactive');
    }

    cardsSlide.style.transform = `translateX(${positionSlide}px)`;
});

doubleArrowRight.addEventListener('click', function (e) {
    e.preventDefault();

    if (widthScreen > 1279 && (positionSlide <= 0 && positionSlide > -6000)) {
        positionSlide = -6000;
        numPagination.innerText = positionSlide / -1200 + 1;
    } else if ((widthScreen < 1280 && widthScreen > 767) && (positionSlide <= 0 && positionSlide > -4200)) {
        positionSlide = -4200;
        numPagination.innerText = positionSlide / -600 + 1;
    } else if (widthScreen < 768 && (positionSlide <= 0 && positionSlide > -4500)) {
        positionSlide = -4500;
        numPagination.innerText = positionSlide / -300 + 1;
    }

    this.classList.remove('main-pagination-item_arrow_active');
    this.classList.add('main-pagination-item_arrow_inactive');
    arrowRight.classList.remove('main-pagination-item_arrow_active');
    arrowRight.classList.add('main-pagination-item_arrow_inactive');
    arrowLeft.classList.add('main-pagination-item_arrow_active');
    arrowLeft.classList.remove('main-pagination-item_arrow_inactive');
    doubleArrowLeft.classList.add('main-pagination-item_arrow_active');
    doubleArrowLeft.classList.remove('main-pagination-item_arrow_inactive');

    cardsSlide.style.transform = `translateX(${positionSlide}px)`;
})