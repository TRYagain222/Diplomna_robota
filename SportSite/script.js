document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a'); // Обираємо всі посилання в навігації
    const currentPath = window.location.pathname; // Отримуємо шлях поточної сторінки 

    navLinks.forEach(link => {
        // Отримуємо відносний шлях посилання 
        const linkPath = link.getAttribute('href');

        // Перевіряємо, чи шлях посилання відповідає шляху поточної сторінки
        // Важливо: .includes() робить перевірку гнучкою
        if (currentPath.includes(linkPath) || (currentPath === '/' && linkPath === 'index.html')) {
            link.classList.add('active'); // Додавання клас 'active' до активного посилання
        }
    });

    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    const dotsContainer = document.querySelector('.slider-dots');

    let currentIndex = 0;
    const slideWidth = slides[0].clientWidth; // Ширина одного слайда
    const totalSlides = slides.length;
    let autoSlideInterval; // Змінна для зберігання інтервалу автоматичного перемикання

    // Функція для створення точок навігації
    function createDots() {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.dataset.index = i;
            dotsContainer.appendChild(dot);
            dot.addEventListener('click', () => goToSlide(i));
        }
        updateDots();
    }

    // Функція для оновлення активної точки
    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Функція для переходу до певного слайда
    function goToSlide(index) {
        currentIndex = index;
        const offset = -currentIndex * slideWidth;
        sliderTrack.style.transform = `translateX(${offset}px)`;
        updateDots();
    }

    // Функція для переходу до наступного слайда
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        goToSlide(currentIndex);
    }

    // Функція для переходу до попереднього слайда
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        goToSlide(currentIndex);
    }

    // Функція для запуску автоматичного перемикання слайдів
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Змінювати слайд кожні 5 секунд
    }

    // Функція для зупинки автоматичного перемикання (наприклад, при наведенні миші)
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Ініціалізація слайдера
    if (sliderTrack) { // Перевіряємо, чи існує слайдер на сторінці
        createDots();
        startAutoSlide(); // Запускаємо автоматичне перемикання

        // Обробники подій для кнопок
        nextButton.addEventListener('click', () => {
            stopAutoSlide(); // Зупиняємо автопрокрутку при ручному перемиканні
            nextSlide();
            startAutoSlide(); // Знову запускаємо після перемикання
        });

        prevButton.addEventListener('click', () => {
            stopAutoSlide(); // Зупиняємо автопрокрутку при ручному перемиканні
            prevSlide();
            startAutoSlide(); // Знову запускаємо після перемикання
        });

        // Зупинка автопрокрутки при наведенні миші на слайдер
        sliderTrack.addEventListener('mouseenter', stopAutoSlide);
        sliderTrack.addEventListener('mouseleave', startAutoSlide);

        // Оновлення ширини слайда при зміні розміру вікна
        window.addEventListener('resize', () => {
            // Перерахувати ширину слайда, якщо вона змінилася
            const newSlideWidth = slides[0].clientWidth;
            if (slideWidth !== newSlideWidth) {
                // Якщо ширина змінилася, оновити позицію поточного слайда
                goToSlide(currentIndex);
            }
        });

        // Початкова позиція слайдера при завантаженні сторінки
        goToSlide(0);
    }
const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Зупиняємо стандартну відправку форми

            let isValid = true;

            // Валідація імені
            const nameInput = document.getElementById('name');
            const nameError = document.getElementById('nameError');
            if (nameInput.value.trim() === '') {
                nameInput.classList.add('invalid');
                nameError.textContent = 'Будь ласка, введіть ваше ім\'я.';
                nameError.style.display = 'block';
                isValid = false;
            } else {
                nameInput.classList.remove('invalid');
                nameError.style.display = 'none';
            }

            // Валідація Email
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Проста перевірка email
            if (emailInput.value.trim() === '') {
                emailInput.classList.add('invalid');
                emailError.textContent = 'Будь ласка, введіть ваш email.';
                emailError.style.display = 'block';
                isValid = false;
            } else if (!emailPattern.test(emailInput.value.trim())) {
                emailInput.classList.add('invalid');
                emailError.textContent = 'Будь ласка, введіть дійсний email-адресу.';
                emailError.style.display = 'block';
                isValid = false;
            } else {
                emailInput.classList.remove('invalid');
                emailError.style.display = 'none';
            }

            // Валідація повідомлення
            const messageInput = document.getElementById('message');
            const messageError = document.getElementById('messageError');
            if (messageInput.value.trim() === '') {
                messageInput.classList.add('invalid');
                messageError.textContent = 'Будь ласка, введіть ваше повідомлення.';
                messageError.style.display = 'block';
                isValid = false;
            } else {
                messageInput.classList.remove('invalid');
                messageError.style.display = 'none';
            }

            // Якщо форма валідна, можна її відправити (або виконати інші дії)
            if (isValid) {
                alert('Повідомлення успішно відправлено (функціонал відправки на сервер не реалізовано).');
                this.submit(); // Відправити форму, якщо вона валідна
                // Або використати Fetch API для AJAX-відправки:
                /*
                fetch(this.action, {
                    method: this.method,
                    body: new FormData(this)
                })
                .then(response => response.text())
                .then(data => {
                    alert('Повідомлення відправлено!');
                    contactForm.reset();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Виникла помилка при відправці.');
                });
                */
            }
        });

        // Додатково: приховувати помилки при введенні
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('invalid');
                input.nextElementSibling.style.display = 'none'; // nextElementSibling - це div з помилкою
            });
        });
    }
});