// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    // Установим имя пользователя из Telegram, если доступно
    initUserData();
    
    // Инициализируем FAQ аккордеон
    initFAQ();
    
    // Инициализируем переключатели
    initSwitches();
    
    // Имитация загрузки данных
    simulateDataLoading();
});

// Переключение вкладок
function switchTab(tabName) {
    // Скрыть все вкладки
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Убрать активный класс со всех кнопок навигации
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Показать выбранную вкладку
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // Активировать соответствующую кнопку навигации
    document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');
}

// Инициализация данных пользователя
function initUserData() {
    // В реальном приложении здесь будет получение данных из Telegram
    const tg = window.Telegram?.WebApp;
    
    if (tg && tg.initDataUnsafe?.user) {
        const user = tg.initDataUnsafe.user;
        document.querySelector('.username').textContent = user.first_name || 'Пользователь';
        document.querySelector('.profile-info h3').textContent = user.first_name || 'Пользователь';
        
        if (user.username) {
            document.querySelector('.user-tag').textContent = '@' + user.username;
        }
    }
}

// Инициализация FAQ аккордеона
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('active');
            
            // Закрыть другие открытые вопросы
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    otherQuestion.parentElement.classList.remove('active');
                }
            });
        });
    });
}

// Инициализация переключателей
function initSwitches() {
    const switches = document.querySelectorAll('.switch input');
    
    switches.forEach(switchInput => {
        switchInput.addEventListener('change', function() {
            const setting = this.closest('.menu-item').querySelector('h4').textContent;
            showNotification(`Настройка "${setting}" ${this.checked ? 'включена' : 'выключена'}`);
        });
    });
    
    // Тёмная тема переключатель
    const themeSwitch = document.querySelector('.menu-item:nth-child(4) .switch input');
    if (themeSwitch) {
        themeSwitch.checked = true; // По умолчанию тёмная тема включена
        themeSwitch.addEventListener('change', function() {
            showNotification(`Тёмная тема ${this.checked ? 'включена' : 'выключена'}`);
        });
    }
}

// Копирование реферальной ссылки
document.querySelector('.copy-btn')?.addEventListener('click', function() {
    const linkText = document.querySelector('.link-text').textContent;
    
    navigator.clipboard.writeText(linkText)
        .then(() => {
            showNotification('Реферальная ссылка скопирована!');
        })
        .catch(err => {
            console.error('Ошибка копирования: ', err);
            showNotification('Ошибка при копировании');
        });
});

// Обработка кнопки "Начать зарабатывать"
document.querySelectorAll('.start-earning-btn, .action-button').forEach(btn => {
    btn.addEventListener('click', function() {
        showNotification('Переход к предложениям по заработку...');
        setTimeout(() => {
            switchTab('earnings');
        }, 500);
    });
});

// Обработка кнопок предложений
document.querySelectorAll('.offer-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const offerTitle = this.closest('.offer-item').querySelector('h4').textContent;
        showNotification(`Открывается оформление: ${offerTitle}`);
        
        // В реальном приложении здесь будет переход по ссылке
        // window.open('ссылка-на-оффер', '_blank');
    });
});

// Обработка кнопок поддержки
document.querySelectorAll('.support-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const supportType = this.closest('.support-card').querySelector('h3').textContent;
        showNotification(`Открывается ${supportType}...`);
    });
});

// Обработка кнопки "Заказать выплату"
document.querySelector('.withdraw-btn')?.addEventListener('click', function() {
    showNotification('Открывается форма заказа выплаты...');
    
    // В реальном приложении здесь будет модальное окно или переход
});

// Обработка кликов по карточкам категорий
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
        const categoryName = this.querySelector('h4').textContent;
        showNotification(`Открываются предложения: ${categoryName}`);
        switchTab('earnings');
    });
});

// Показать уведомление
function showNotification(text) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    
    notificationText.textContent = text;
    notification.style.display = 'block';
    
    // Автоматическое скрытие через 3 секунды
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Имитация загрузки данных
function simulateDataLoading() {
    // Имитируем загрузку данных с задержкой
    setTimeout(() => {
        // В реальном приложении здесь будет запрос к API
        console.log('Данные пользователя загружены');
    }, 1000);
}

// Для интеграции с Telegram Mini App
function initTelegramApp() {
    if (typeof window.Telegram !== 'undefined') {
        const tg = window.Telegram.WebApp;
        
        // Расширить на ь экран
        tg.expand();
        
        // Изменить цвет кнопки
        tg.MainButton.setParams({
            text: 'ЗАРАБАТЫВАТЬ',
            color: '#00f3ff',
            text_color: '#000000'
        });
        
        // Обработка события нажатия кнопки
        tg.MainButton.onClick(() => {
            switchTab('earnings');
        });
        
        tg.MainButton.show();
    }
}

// Инициализация Telegram Mini App (если используется)
// initTelegramApp();
