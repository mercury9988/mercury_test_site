// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    // Загрузка данных пользователя из Telegram
    loadUserData();
    
    // Инициализация истории
    initHistory();
});

// Данные предложений
const offers = {
    1: {
        title: "Кредитная карта 'Выгодная'",
        description: "Вы будете перенаправлены на сайт банка для оформления заявки. После успешного оформления вознаграждение 1500 ₽ будет зачислено на ваш баланс.",
        reward: 1500,
        link: "https://example.com/card-1"
    },
    2: {
        title: "Вклад 'Накопительный'",
        description: "Откройте вклад на сайте банка и получите 800 ₽ вознаграждения после пополнения счета.",
        reward: 800,
        link: "https://example.com/deposit-1"
    },
    3: {
        title: "Страхование жизни",
        description: "Оформите полис страхования жизни и получите 1200 ₽ на баланс.",
        reward: 1200,
        link: "https://example.com/insurance-1"
    }
};

// Переключение вкладок
function showTab(tabName) {
    // Скрыть все вкладки
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Убрать активный класс со всех кнопок
    document.querySelectorAll('.tab').forEach(button => {
        button.classList.remove('active');
    });
    
    // Показать выбранную вкладку
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // Активировать кнопку
    event.target.classList.add('active');
}

// Загрузка данных пользователя
function loadUserData() {
    // В реальном приложении здесь будет запрос к Telegram API
    // Для демо используем тестовые данные
    setTimeout(() => {
        document.getElementById('user-name').textContent = 'Алексей Петров';
        document.getElementById('balance').textContent = '2 450 ₽';
        document.getElementById('total-earned').textContent = '8 900 ₽';
    }, 500);
}

// Открытие модального окна с предложением
function openOffer(offerId) {
    const offer = offers[offerId];
    if (!offer) return;
    
    document.getElementById('modal-title').textContent = offer.title;
    document.getElementById('modal-description').textContent = offer.description;
    
    // Сохраняем ID предложения в data-атрибут
    document.querySelector('.modal-content').dataset.offerId = offerId;
    
    // Показываем модальное окно
    document.getElementById('offerModal').style.display = 'flex';
}

// Закрытие модального окна
function closeModal() {
    document.getElementById('offerModal').style.display = 'none';
}

// Подтверждение оформления
function confirmOffer() {
    const offerId = document.querySelector('.modal-content').dataset.offerId;
    const offer = offers[offerId];
    
    if (!offer) return;
    
    // В реальном приложении здесь будет логика перенаправления
    // и отслеживания перехода
    
    // Показываем уведомление
    showNotification(`Вы переходите к оформлению: ${offer.title}`);
    
    // Закрываем модальное окно
    closeModal();
    
    // В реальном приложении:
    // window.location.href = offer.link;
    
    // Для демо просто показываем сообщение
    setTimeout(() => {
        showNotification('Заявка принята! Вознаграждение будет зачислено после оформления.');
        addToHistory(offer);
    }, 1500);
}

// Инициализация истории
function initHistory() {
    // В реальном приложении здесь загрузка из localStorage или API
    const history = JSON.parse(localStorage.getItem('offerHistory')) || [];
    
    if (history.length === 0) {
        document.getElementById('empty-history').style.display = 'block';
    } else {
        document.getElementById('empty-history').style.display = 'none';
        // Отображаем историю
    }
}

// Добавление в историю
function addToHistory(offer) {
    const history = JSON.parse(localStorage.getItem('offerHistory')) || [];
    
    const historyItem = {
        title: offer.title,
        reward: offer.reward,
        date: new Date().toLocaleDateString('ru-RU'),
        status: 'pending'
    };
    
    history.unshift(historyItem);
    localStorage.setItem('offerHistory', JSON.stringify(history));
    
    // Обновляем отображение
    initHistory();
}

// Копирование реферальной ссылки
function copyRefLink() {
    const refLink = 'https://t.me/your_bot?start=ref12345';
    
    navigator.clipboard.writeText(refLink)
        .then(() => {
            showNotification('Реферальная ссылка скопирована!');
        })
        .catch(err => {
            console.error('Ошибка копирования: ', err);
            showNotification('Ошибка копирования');
        });
}

// Показ поддержки
function showSupport() {
    // В реальном приложении открыть чат с ботом
    showNotification('Открывается чат с поддержкой...');
}

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

// Обработка клика вне модального окна
window.onclick = function(event) {
    const modal = document.getElementById('offerModal');
    if (event.target === modal) {
        closeModal();
    }
};

// Для интеграции с Telegram Mini Apps (пример)
function initTelegramApp() {
    // В реальном приложении используйте Telegram WebApp API
    if (typeof window.Telegram !== 'undefined') {
        const tg = window.Telegram.WebApp;
        
        // Расширить на весь экран
        tg.expand();
        
        // Получить данные пользователя
        const user = tg.initDataUnsafe.user;
        
        if (user) {
            document.getElementById('user-name').textContent = 
                user.first_name + (user.last_name ? ' ' + user.last_name : '');
        }
        
        // Настроить кнопку закрытия
        tg.BackButton.onClick(closeModal);
    }
}

// Инициализация Telegram Mini App
initTelegramApp();