//
// 1. АНИМАЦИЯ ЗАГРУЗКИ (loader)
//    Когда страница полностью загружена, плавно скрываем загрузчик.
// 
window.addEventListener('load', () => {
  // Находим блок загрузки по ID
  const loader = document.getElementById('loaderOverlay');

  // Через 1 секунду (1000 мс) начинаем скрывать загрузчик
  setTimeout(() => {
    // Делаем его прозрачным
    loader.style.opacity = '0';

    // Через 400 мс после скрытия удаляем его из DOM, чтобы он не мешал
    setTimeout(() => loader.remove(), 400);
  }, 1000);
});

// 
// 2. ФАНТАЗИЙНАЯ АНИМАЦИЯ (парящие символы на главном экране)
//    Создаём 18 случайных плавающих элементов (ноты, танцоры) в фоне.
// 
const fantasy = document.getElementById('fantasyArea'); // Контейнер для анимации

if (fantasy) {
  // Массив символов, которые будут летать
  const arr = ['♪', '♫', '💃', '🕺', '🎵'];

  // Создаём 18 элементов
  for (let i = 0; i < 18; i++) {
    let el = document.createElement('div');
    el.classList.add('floating'); // Добавляем класс для CSS-стилей

    // Выбираем случайный символ из массива
    el.textContent = arr[Math.floor(Math.random() * arr.length)];

    // Случайное позиционирование на экране (0–100%)
    el.style.left = Math.random() * 100 + '%';
    el.style.top = Math.random() * 100 + '%';

    // Случайный размер шрифта от 16px до 44px
    el.style.fontSize = (Math.random() * 28 + 16) + 'px';

    // Случайная длительность анимации от 12 до 24 секунд
    el.style.animationDuration = (12 + Math.random() * 12) + 's';

    // Добавляем элемент в контейнер
    fantasy.appendChild(el);
  }
}

// 
// 3. СЛАЙДЕР (карусель с фотографиями в секции "Атмосфера милонги")
//    Переключение слайдов по кнопкам и точкам.
// 
const track = document.getElementById('sliderTrack'); // Дорожка со слайдами
const slides = document.querySelectorAll('.slide'); // Все слайды
const prev = document.getElementById('prevSlide'); // Кнопка "Назад"
const next = document.getElementById('nextSlide'); // Кнопка "Вперёд"
const dotsDiv = document.getElementById('dotsContainer'); // Контейнер для точек

let current = 0; // Индекс текущего слайда (начинаем с 0)
const total = slides.length; // Общее количество слайдов

// Функция обновления слайдера — сдвигает дорожку и обновляет активную точку
function updateSlider() {
  // Сдвигаем дорожку на 100% * номер слайда
  track.style.transform = `translateX(-${current * 100}%)`;

  // Переключаем класс "active" у точек: активна только точка с индексом current
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
}

// Функция создания точек навигации под слайдером
function createDots() {
  dotsDiv.innerHTML = ''; // Очищаем контейнер

  for (let i = 0; i < total; i++) {
    let dot = document.createElement('span');
    dot.classList.add('dot');

    // Первая точка сразу активна
    if (i === current) dot.classList.add('active');

    // Клик по точке — переключение на соответствующий слайд
    dot.addEventListener('click', () => {
      current = i;
      updateSlider();
    });

    dotsDiv.appendChild(dot);
  }
}

// Клик по кнопке "Назад" — уменьшаем индекс на 1 (с зацикливанием)
prev?.addEventListener('click', () => {
  current = (current - 1 + total) % total;
  updateSlider();
});

// Клик по кнопке "Вперёд" — увеличиваем индекс на 1 (с зацикливанием)
next?.addEventListener('click', () => {
  current = (current + 1) % total;
  updateSlider();
});

// Создаём точки
createDots();

// 
// 4. ТАБЫ (ВКЛАДКИ) — переключение контента без перезагрузки страницы
//    В секции "Наши занятия".
// 
const tabs = document.querySelectorAll('.tab-btn'); // Все кнопки-вкладки
const contents = document.querySelectorAll('.tab-content'); // Все блоки с контентом

tabs.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Получаем ID контента, который нужно показать (из data-tab)
    const id = btn.getAttribute('data-tab');

    // Скрываем весь контент
    contents.forEach((c) => c.classList.remove('active-content'));

    // Убираем активный класс со всех кнопок
    tabs.forEach((b) => b.classList.remove('active'));

    // Показываем нужный контент
    document.getElementById(id).classList.add('active-content');

    // Делаем кнопку активной (подчёркиваем)
    btn.classList.add('active');
  });
});

// 
// 5. АККОРДЕОН (FAQ) — раскрытие ответов по клику на вопрос
// 
const accItems = document.querySelectorAll('.accordion-item'); // Все блоки вопроса-ответа

accItems.forEach((item) => {
  // Для каждого блока находим заголовок (вопрос)
  const header = item.querySelector('.accordion-header');

  // При клике на заголовок переключаем класс active у блока
  header.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});

// Открываем первый пункт аккордеона по умолчанию (для наглядности)
if (accItems[0]) accItems[0].classList.add('active');

// 
// ============================================================
// 6. МОДАЛЬНОЕ ОКНО — открытие/закрытие окна с формой записи
// ============================================================
const modal = document.getElementById('contactModal');

// Кнопки, которые открывают модалку
const openBtns = [
  document.getElementById('openModalBtn'),
  document.getElementById('trialBtn'),
  document.getElementById('contactNavBtn')
];

const closeModal = document.querySelector('.close-modal');

function openModal() {
  modal.classList.add('active');
}

function closeModalFunc() {
  modal.classList.remove('active');
}

openBtns.forEach(btn => btn?.addEventListener('click', (e) => {
  e.preventDefault();
  openModal();
}));

closeModal?.addEventListener('click', closeModalFunc);

modal?.addEventListener('click', (e) => {
  if (e.target === modal) closeModalFunc();
});

// 
// 6.1. ВАЛИДАЦИЯ ФОРМЫ — проверка телефона
// 
const formModal = document.getElementById('modalForm');

// Функция проверки телефона (убираем всё кроме цифр, проверяем 10-15 цифр)
function isValidPhone(phone) {
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  const phoneRegex = /^\d{10,15}$/;
  return phoneRegex.test(cleaned);
}

// Обработчик отправки формы с валидацией
formModal?.addEventListener('submit', (e) => {
  e.preventDefault();

  // Получаем поля по ID
  const nameInput = document.getElementById('nameInput');
  const phoneInput = document.getElementById('phoneInput');
  const messageInput = document.getElementById('messageInput');

  // Проверяем, что поля существуют
  if (!nameInput || !phoneInput) {
    alert('❌ Ошибка: не найдены поля формы. Проверьте ID в HTML.');
    return;
  }

  // Получаем значения и убираем лишние пробелы
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const message = messageInput.value.trim();

  // Массив для сбора ошибок
  const errors = [];

  // Проверка имени
  if (name.length < 2) {
    errors.push('• Имя должно содержать минимум 2 символа');
  }

  // Проверка телефона
  if (!isValidPhone(phone)) {
    errors.push('• Введите корректный номер телефона (минимум 10 цифр)');
  }

  // Если есть ошибки — показываем их
  if (errors.length > 0) {
    alert('⚠️ Пожалуйста, исправьте ошибки:\n\n' + errors.join('\n'));
    return;
  }

  // Если всё хорошо
  alert('✅ Спасибо, ' + name + '! Скоро свяжемся с вами!');
  closeModalFunc();
  formModal.reset();
});

// 
// 7. УМНЫЙ СОВЕТ — интерактивный блок с рекомендацией
// 
const smart = document.getElementById('smartAdvice');
smart?.addEventListener('click', () => {
  alert('💡 Совет: начните с пробного урока по четвергам. Ждём вас!');
});

// 
// 8. БУРГЕР-МЕНЮ — открытие/закрытие навигации на мобильных устройствах
// 
const menuIcon = document.getElementById('menuIcon'); // Иконка гамбургера ☰
const navList = document.getElementById('navLinks'); // Список ссылок в меню

// Клик по иконке — переключаем класс show (показываем/скрываем меню)
menuIcon?.addEventListener('click', () => {
  navList.classList.toggle('show');
});

// Плавный скролл по якорным ссылкам (внутренним переходам)
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');

    // Проверяем, что ссылка ведёт на якорь (начинается с #)
    if (href && href.startsWith('#')) {
      e.preventDefault(); // Отменяем стандартный переход

      // Находим элемент на странице по ID (убираем # из ссылки)
      const id = href.slice(1);
      const el = document.getElementById(id);

      if (el) {
        // Плавно прокручиваем к элементу
        el.scrollIntoView({ behavior: 'smooth' });
      }

      // Скрываем меню после клика (на мобильных устройствах)
      navList.classList.remove('show');
    }
  });
});