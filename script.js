// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mercury Bot приложение загружено');
    
    // Инициализация вкладок
    initTabs();
    
    // Инициализация FAQ
    initFAQ();
    
    // Инициализация переключателей
    initSwitches();
    
    // Инициализация кнопок
    initButtons();
    
    // Загрузка данных пользователя
    loadUserData();
    
    // Инициализация Telegram WebApp (если есть)
    initTelegramApp();
});

// Переключение вкладок
function initTabs() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Удалить активный класс у всех кнопок
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // Удалить активный класс у всех вкладок
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Добавить активный класс текущей кнопке
            this.classList.add('active');
            
            // Показать выбранную вкладку
            document.getElementById(tabId).classList.add('active');
            
            // Показать уведомление о переключении
            const tabNames = {
                'home': 'Главная',
                'earnings': 'Заработок',
                'support': 'Поддержка',
                'menu': 'Меню'
            };
            
            showNotification(`Открыта вкладка "${tabNames[tabId]}"`);
        });
    });
}

// Инициализация FAQ
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Закрыть все вопросы
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Открыть текущий, если он был закрыт
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Инициализация переключателей
function initSwitches() {
    const switches = document.querySelectorAll('.switch input');
    
    switches.forEach(switchInput => {
        switchInput.addEventListener('change', function() {
            const settingName = this.closest('.setting-item').querySelector('h4').textContent;
            const isChecked = this.checked;
            
            if (settingName === 'Тёмная тема') {
                showNotification(`Тёмная тема ${isChecked ? 'включена' : 'выключена'}`);
            } else if (settingName === 'Уведомления') {
                showNotification(`Уведомления ${isChecked ? 'включены' : 'выключены'}`);
            }
        });
    });
}

// Инициализация кнопок
function initButtons() {
    // Кнопка "Начать зарабатывать" на главной
    document.querySelector('.hero-btn')?.addEventListener('click', function() {
        showNotification('Открываем лучшие предложения для заработка...');
        setTimeout(() => {
            document.querySelector('[data-tab="earnings"]').click();
        }, 500);
    });
    
    // Кнопки "Начать зарабатывать" в быстрых действиях
    document.querySelectorAll('.action-btn:first-child').forEach(btn => {
        btn.addEventListener('click', function() {
            showNotification('Переходим к предложениям...');
            document.querySelector('[data-tab="earnings"]').click();
        });
    });
    
    // Кнопка "Популярное" в быстрых действиях
    document.querySelectorAll('.action-btn:last-child').forEach(btn => {
        btn.addEventListener('click', function() {
            showNotification('Показываем популярные предложения...');
            document.querySelector('[data-tab="earnings"]').click();
        });
    });
    
    // Кнопки категорий
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const categoryName = this.closest('.category-item').querySelector('h4').textContent;
            showNotification(`Открываем предложения ${categoryName}`);
            document.querySelector('[data-tab="earnings"]').click();
        });
    });
    
    // Клик по всей категории
    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', function() {
            const categoryName = this.querySelector('h4').textContent;
            showNotification(`Открываем предложения ${categoryName}`);
            document.querySelector('[data-tab="earnings"]').click();
        });
    });
    
    // Кнопки "Оформить" в предложениях
    document.querySelectorAll('.offer-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const offerName = this.closest('.offer-card').querySelector('h4').textContent;
            showNotification(`Открывается оформление: ${offerName}`);
            
            // В реальном приложении здесь будет переход по ссылке
            // window.open('https://example.com/offer', '_blank');
        });
    });
    
    // Кнопка "Заказать выплату"
    document.querySelector('.withdraw-btn')?.addEventListener('click', function() {
        showNotification('Открывается форма заказа выплаты...');
        
        // Здесь можно открыть модальное окно с формой
        setTimeout(() => {
            showNotification('Для заказа выплаты обратитесь в поддержку');
        }, 1000);
    });
    
    // Кнопка копирования реферальной ссылки
    document.querySelector('.copy-btn')?.addEventListener('click', function(e) {
        e.stopPropagation();
        
        const linkText = document.querySelector('.link-text').textContent;
        
        navigator.clipboard.writeText(linkText)
            .then(() => {
                showNotification('Реферальная ссылка скопирована!');
                
                // Анимация кнопки
                const icon = this.querySelector('i');
                icon.className = 'fas fa-check';
                
                setTimeout(() => {
                    icon.className = 'fas fa-copy';
                }, 2000);
            })
            .catch(err => {
                console.error('Ошибка копирования:', err);
                showNotification('Ошибка при копировании');
            });
    });
    
    // Кнопки поддержки
    document.querySelectorAll('.support-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const supportType = this.closest('.support-card').querySelector('h3').textContent;
            
            if (supportType === 'Онлайн-чат') {
                showNotification('Открывается онлайн-чат с поддержкой...');
                // window.open('https://t.me/support_bot', '_blank');
            } else if (supportType === 'Email поддержка') {
                showNotification('Открывается форма для отправки email...');
                // window.location.href = 'mailto:support@example.com';
            }
        });
    });
    
    // Клик по настройкам
    document.querySelectorAll('.setting-item').forEach(item => {
        item.addEventListener('click', function() {
            const settingName = this.querySelector('h4').textContent;
            
            if (settingName === 'История операций') {
                showNotification('Загружаем историю операций...');
            } else if (settingName === 'Безопасность') {
                showNotification('Открываем настройки безопасности...');
            }
        });
    });
}

// Загрузка данных пользователя
function loadUserData() {
    // В реальном приложении здесь запрос к API
    setTimeout(() => {
        // Симуляция загрузки данных
        console.log('Данные пользователя загружены');
        
        // Можно обновить значения статистики
        // document.querySelector('.balance-value').textContent = '1,500.00₽';
    }, 1000);
}

// Инициализация Telegram WebApp
function initTelegramApp() {
    if (typeof window.Telegram !== 'undefined') {
        const tg = window.Telegram.WebApp;
        
        // Расширить на весь экран
        tg.expand();
        
        // Получить данные пользователя
        const user = tg.initDataUnsafe?.user;
        
        if (user) {
            // Обновить имя пользователя
            const userNameElements = document.querySelectorAll('.user-name, .profile-info h3');
            userNameElements.forEach(el => {
                el.textContent = user.first_name || 'Пользователь';
            });
            
            // Обновить username
            if (user.username) {
                document.querySelector('.profile-tag').textContent = '@' + user.username;
            }
            
            // Показать кнопку Telegram
            tg.MainButton.setParams({
                text: 'ОТКРЫТЬ В ТЕЛЕГРАМ',
                color: '#00f3ff',
                text_color: '#000000'
            });
            
            tg.MainButton.onClick(() => {
                tg.openTelegramLink('https://t.me/PKOTESTBOT');
            });
            
            tg.MainButton.show();
        }
        
        // Настроить тему
        tg.setHeaderColor('#0a0a0f');
        tg.setBackgroundColor('#0a0a0f');
    }
}

// Показать уведомление
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    
    notificationText.textContent = message;
    notification.style.display = 'block';
    
    // Автоматическое скрытие
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Случайная анимация для элементов
function addRandomAnimations() {
    const elements = document.querySelectorAll('.stat-card, .feature-card, .offer-card');
    
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
}

// Инициализация анимаций
addRandomAnimations();

// Обновление времени (если нужно)
function updateTime() {
    const timeElement = document.querySelector('.current-time');
    if (timeElement) {
        const now = new Date();
        timeElement.textContent = now.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Обновление времени каждую минуту
setInterval(updateTime, 60000);
updateTime();