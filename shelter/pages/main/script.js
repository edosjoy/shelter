'use strict';

const
    url = '../../assets/data/pets.json',
    widthScreen = window.screen.width;

let
    indexPets = [],
    translatePosition = 0;

const
    body = document.querySelector('body'),
    logo = body.querySelector('.logo'),
    burgerBtn = body.querySelector('.burger-btn'),
    mobileMenu = body.querySelector('.mobile-menu'),
    friendCardsBlock = body.querySelector('.friends-cards'),
    slideArrowLeft = body.querySelector('.friends-cards-arrow-left'),
    slideArrowRight = body.querySelector('.friends-cards-arrow-right'),
    modal = body.querySelector('.modal');


fetch(url).then(response => response.json()).then(objectPets => {

    if (widthScreen > 1279) {
        for (let i = 0; i < 9; indexPets.push(i++));
        translatePosition = 1080;
    } else if (widthScreen < 1280 && widthScreen > 767) {
        for (let i = 0; i < 8; indexPets.push(i++));
        translatePosition = 615;
    } else if (widthScreen < 768) {
        for (let i = 0; i < 9; indexPets.push(i++));
        translatePosition = 310;
    }

    fillSlide();

    function fillSlide() {
        let friendsCardsSlide = document.createElement('div');
        friendsCardsSlide.classList.add('friends-cards-slide');

        for (let i = 0; i < indexPets.length; i++) {
            let newCardPet = document.createElement('div');
            newCardPet.classList.add('friends-cards-item');
            newCardPet.setAttribute('data-current', indexPets[i]);
            newCardPet.setAttribute('data-modal', 'true');
            newCardPet.innerHTML = `
                <img src="${objectPets[indexPets[i]].img}" alt="${objectPets[indexPets[i]].name}" data-modal="true" data-current="${indexPets[i]}">
                <p class="friends-cards-item-title font-georgia" data-modal="true" data-current="${indexPets[i]}">${objectPets[indexPets[i]].name}</p>
                <button class="friends-cards-item-button button-white" data-modal="true" data-current="${indexPets[i]}">Learn more</button>`;
            friendsCardsSlide.append(newCardPet);
        }

        friendCardsBlock.innerHTML = '';

        friendCardsBlock.append(friendsCardsSlide);
    }

    slideArrowRight.addEventListener('click', () => {
        friendCardsBlock.firstElementChild.style.transform = `translateX(-${translatePosition}px)`;
        if (widthScreen > 1279) {
            [indexPets[3], indexPets[6]] = [indexPets[6], indexPets[3]];
            [indexPets[4], indexPets[7]] = [indexPets[7], indexPets[4]];
            [indexPets[5], indexPets[8]] = [indexPets[8], indexPets[5]];
            [indexPets[0], indexPets[8]] = [indexPets[8], indexPets[0]];
            [indexPets[1], indexPets[7]] = [indexPets[7], indexPets[1]];
            [indexPets[2], indexPets[6]] = [indexPets[6], indexPets[2]];
        } else if (widthScreen < 1280 && widthScreen > 767) {
            [indexPets[3], indexPets[5]] = [indexPets[5], indexPets[3]];
            [indexPets[4], indexPets[6]] = [indexPets[6], indexPets[4]];
            [indexPets[5], indexPets[7]] = [indexPets[7], indexPets[5]];
            [indexPets[0], indexPets[2]] = [indexPets[2], indexPets[0]];
            [indexPets[0], indexPets[5]] = [indexPets[5], indexPets[0]];
            [indexPets[1], indexPets[6]] = [indexPets[6], indexPets[1]];
        } else if (widthScreen < 768) {
            [indexPets[4], indexPets[5]] = [indexPets[5], indexPets[4]];
            [indexPets[6], indexPets[5]] = [indexPets[5], indexPets[6]];
            [indexPets[6], indexPets[7]] = [indexPets[7], indexPets[6]];
            [indexPets[8], indexPets[7]] = [indexPets[7], indexPets[8]];
            [indexPets[8], indexPets[3]] = [indexPets[3], indexPets[8]];
            [indexPets[2], indexPets[3]] = [indexPets[3], indexPets[2]];
            [indexPets[2], indexPets[1]] = [indexPets[1], indexPets[2]];
            [indexPets[0], indexPets[1]] = [indexPets[1], indexPets[0]];

        }
        setTimeout(fillSlide, 950);
    });

    slideArrowLeft.addEventListener('click', () => {
        friendCardsBlock.firstElementChild.style.transform = `translateX(${translatePosition}px)`;
        if (widthScreen > 1279) {
            [indexPets[3], indexPets[0]] = [indexPets[0], indexPets[3]];
            [indexPets[4], indexPets[1]] = [indexPets[1], indexPets[4]];
            [indexPets[5], indexPets[2]] = [indexPets[2], indexPets[5]];
            [indexPets[0], indexPets[8]] = [indexPets[8], indexPets[0]];
            [indexPets[1], indexPets[7]] = [indexPets[7], indexPets[1]];
            [indexPets[2], indexPets[6]] = [indexPets[6], indexPets[2]];
        } else if (widthScreen < 1280 && widthScreen > 767) {
            [indexPets[3], indexPets[1]] = [indexPets[1], indexPets[3]];
            [indexPets[4], indexPets[2]] = [indexPets[2], indexPets[4]];
            [indexPets[5], indexPets[7]] = [indexPets[7], indexPets[5]];
            [indexPets[0], indexPets[2]] = [indexPets[2], indexPets[0]];
            [indexPets[2], indexPets[7]] = [indexPets[7], indexPets[2]];
            [indexPets[1], indexPets[6]] = [indexPets[6], indexPets[1]];
        } else if (widthScreen < 768) {
            [indexPets[4], indexPets[3]] = [indexPets[3], indexPets[4]];
            [indexPets[2], indexPets[3]] = [indexPets[3], indexPets[2]];
            [indexPets[2], indexPets[1]] = [indexPets[1], indexPets[2]];
            [indexPets[0], indexPets[1]] = [indexPets[1], indexPets[0]];
            [indexPets[0], indexPets[5]] = [indexPets[5], indexPets[0]];
            [indexPets[5], indexPets[6]] = [indexPets[6], indexPets[5]];
            [indexPets[7], indexPets[6]] = [indexPets[6], indexPets[7]];
            [indexPets[7], indexPets[8]] = [indexPets[8], indexPets[7]];
        }
        setTimeout(fillSlide, 950);
    });

    friendCardsBlock.addEventListener('click', e => {
        const t = e.target;

        if (t.dataset.modal) {
            modal.innerHTML = `
            <div class="friends-description">
                <img src="${objectPets[t.dataset.current].img}" alt="${objectPets[t.dataset.current].name}" class="friends-description-image">
                <div class="friends-description-content">
                    <h3 class="friends-description-content-head">${objectPets[t.dataset.current].name}</h3>
                    <h4 class="friends-description-content-subhead">${objectPets[t.dataset.current].type} - ${objectPets[t.dataset.current].breed}</h4>
                    <h5 class="friends-description-content-text">${objectPets[t.dataset.current].description}</h5>
                    <ul class="friends-description-content-list">
                        <li class="friends-description-content-list-item"><span class="font-georgia"><span>Age:</span> ${objectPets[t.dataset.current].age}</span></li>
                        <li class="friends-description-content-list-item"><span class="font-georgia"><span>Inoculations:</span> ${objectPets[t.dataset.current].inoculations}</span></li>
                        <li class="friends-description-content-list-item"><span class="font-georgia"><span>Diseases:</span> ${objectPets[t.dataset.current].diseases}</span></li>
                        <li class="friends-description-content-list-item"><span class="font-georgia"><span>Parasites:</span> ${objectPets[t.dataset.current].parasites}</span></li>
                    </ul>
                </div>
                <img src="../../assets/icons/cross.png" class="friends-description-close">
            </div>`;

            modal.classList.toggle('hidden');
            body.classList.toggle('mobile-menu-open');
        }
    });
});

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
    if (e.target.innerText === 'About the shelter' || e.target.innerText === 'Help the shelter' || e.target.innerText === 'Contacts') {
        toggleClass();
    }
});

function toggleClass() {
    burgerBtn.classList.toggle('burger-btn-active');
    body.classList.toggle('mobile-menu-open');
    mobileMenu.classList.toggle('menu-active');
    logo.classList.toggle('logo-in-mobile-menu');
}

modal.addEventListener('click', function (e) {
    const t = e.target;

    if (t.classList.contains('modal') || t.classList.contains('friends-description-close')) {
        this.classList.toggle('hidden');
        body.classList.toggle('mobile-menu-open');
    }
});

modal.addEventListener('mousemove', function (e) {
    if (e.target.classList.contains('modal') || e.target.classList.contains('friends-description-close')) {
        this.lastChild.lastElementChild.style.backgroundColor = '#F1CDB3';
    } else {
        this.lastChild.lastElementChild.style.backgroundColor = 'transparent';
    }
});