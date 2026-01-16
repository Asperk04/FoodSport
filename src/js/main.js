window.addEventListener('DOMContentLoaded', () =>{
    //TABSS
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');


    function hideTabContent() {
        tabsContent.forEach(item =>{
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item =>{
            item.classList.remove('tabheader__item_active');
        })
    };

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) =>{
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i)=>{
                if(target == item){
                        hideTabContent();
                        showTabContent(i);
                }
            });
        }
    });

//TIMER

const deadline = '2026-05-21';

function getTimeReamining(endTime) {
    let days, hours, minuts, seconds;
    const t = Date.parse(endTime) - Date.parse(new Date());
    if(t <= 0){
        days = 0;
        hours = 0;
        minuts = 0;
        seconds = 0;
    }else{
           days = Math.floor(t / (1000 * 60 * 60 * 24)),
           hours =  Math.floor((t/ (1000 * 60 * 60) % 24)),
           minuts = Math.floor(t/ (1000 * 60) % 60),
           seconds = Math.floor((t/ 1000) % 60);

    }
          

     return {
        'total': t,
        'days': days,
        'hours': hours,
        'minuts': minuts,
        'seconds': seconds
     };
};

function getZero(num){
    if (num >= 0 && num < 10){
        return `0${num}`;
    }else {
        return num;
    }
}

function setClock(selector, endTime){
    const timer = document.querySelector(selector),
            days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            timeIntervar = setInterval(updateClock, 1000);
            updateClock();

        function updateClock (){
            const t = getTimeReamining(endTime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minuts);
            seconds.innerHTML = getZero(t.seconds);
            
            if(t.total <= 0 ){
                clearInterval(timeIntervar);
            }
        }
};

setClock('.timer', deadline);

//Modal
const modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal'),
      modalCloseBtn = document.querySelector('[data-close]');

function openModal(){
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    // clearInterval(modalTimerId);
    }
  

    modalTrigger.forEach(btn =>{
    btn.addEventListener('click', openModal);



});

function closeModal(){
      modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
};

modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e)=>{
        if(e.target === modal){
              closeModal();
        }
    });

    document.addEventListener('keydown', (e) =>{
       if(e.code === 'Escape' && modal.classList.contains('show')){
        closeModal();
       }
    });

    // const modalTimerId = setTimeout(openModal, 10000);
    function showModalByScroll (){
         if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    //Классы для карточек
    class MenuCards {
        constructor(src, alt, titel, dscr, price, parentSelector){
            this.src = src;
            this.alt = alt;
            this.titel = titel;
            this.dscr = dscr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 1.7;
            this.changeToAzn();
        }

        changeToAzn(){
            this.price = this.price * this.transfer;
        }
        render(){
            const element = document.createElement('div');
            element.innerHTML = `
             <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.titel}</h3>
                    <div class="menu__item-descr">${this.dscr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> АЗН/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
        
    }

        new MenuCards(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        5,
        ".menu .container"
    ).render();

    new MenuCards(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        10,
        ".menu .container"
    ).render();

    new MenuCards(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        15,
        ".menu .container"
    ).render();
});

