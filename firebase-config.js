// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkntHcR8prtCSc5yW7fu3zsIOxu4Vl41o",
  authDomain: "salon-69bf0.firebaseapp.com",
  projectId: "salon-69bf0",
  storageBucket: "salon-69bf0.firebasestorage.app",
  messagingSenderId: "640329978062",
  appId: "1:640329978062:web:f9f7647f2642fd3c6f809f",
  measurementId: "G-X9VT54W2NQ"
};

// Проверяем, не инициализирован ли Firebase уже
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Получаем ссылки на сервисы
const auth = firebase.auth();
const db = firebase.firestore();

// Функция проверки авторизации
function checkAuth() {
    return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe(); 
            resolve(user);
        });
    });
}

// Функция получения данных пользователя
async function getUserData(userId) {
    try {
        const doc = await db.collection('users').doc(userId).get();
        return doc.exists ? doc.data() : null;
    } catch (error) {
        console.error("Ошибка получения данных пользователя:", error);
        return null;
    }
}

// Функция выхода
function logout() {
    return auth.signOut();
}

// Экспортируем для использования в других файлах
window.firebase = {
    auth,
    db,
    checkAuth,
    getUserData,
    logout
};