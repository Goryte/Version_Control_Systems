// Прилипающий заголовок при прокрутке страницы
(function () {
    // Находим элемент с классом 'header'
    const header = document.querySelector('.header');
    
    // Устанавливаем обработчик события прокрутки окна
    window.onscroll = () => {
        // Если прокрутка страницы больше чем на 50px от верха
        if (window.pageYOffset > 50) {
            // Добавляем класс 'header_active' к заголовку
            header.classList.add('header_active');
        } else {
            // Убираем класс 'header_active' у заголовка
            header.classList.remove('header_active');
        }
    };
})();

// Обработчик для бургер-меню
(function () {
    // Находим элементы бургер, меню и кнопку закрытия меню
    const burgerItem = document.querySelector('.burger');
    const menu = document.querySelector('.header__nav');
    const menuCloseItem = document.querySelector('.header__nav-close');
    const menuLinks = document.querySelectorAll('.header__link');
    
    // Добавляем обработчик клика на бургер
    burgerItem.addEventListener('click', () => {
        menu.classList.add('header__nav_active');
    });
    
    // Добавляем обработчик клика на кнопку закрытия меню
    menuCloseItem.addEventListener('click', () => {
        menu.classList.remove('header__nav_active');
    });
    
    // Если ширина окна меньше или равна 1000px, добавляем обработчики клика для ссылок в меню
    if (window.innerWidth <= 1000) {
        for (let i = 0; i < menuLinks.length; i += 1) {
            menuLinks[i].addEventListener('click', () => {
                menu.classList.remove('header__nav_active');
            });
        }
    }
})();

// Плавная прокрутка к якорям
(function () {
    // Функция для плавной прокрутки к указанному элементу
    const smoothScroll = function (targetEl, duration) {
        // Получаем высоту элемента с классом 'header'
        const headerElHeight =  document.querySelector('.header').clientHeight;
        
        // Находим целевой элемент и вычисляем его позицию относительно верха страницы
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;
        
        // Получаем текущую позицию прокрутки страницы
        let startPosition = window.pageYOffset;
        
        // Инициализируем переменную для отслеживания времени начала анимации
        let startTime = null;
    
        // Функция для плавной анимации
        const ease = function(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
    
        // Функция анимации, использующая requestAnimationFrame
        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);
    };

    // Функция для добавления обработчиков клика для якорных ссылок
    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                // Вызываем функцию для плавной прокрутки к якорю
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    // Запускаем функцию добавления обработчиков
    scrollTo();
})();
