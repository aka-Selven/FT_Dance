<?php
// Устанавливаем кодировку
header('Content-Type: text/html; charset=utf-8');

// Параметры подключения к БД
$db_host = "localhost"; // Хост
$db_user = "root";      // Логин MySQL
$db_pass = "";          // Пароль 
$db_name = "dance_studio"; // Имя базы данных

// Подключаемся к базе
try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Ошибка подключения: " . $e->getMessage());
}

// Обрабатываем данные формы
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем и очищаем данные
    $name = htmlspecialchars(trim($_POST['name']));
    $phone = htmlspecialchars(trim($_POST['phone']));
    $email = htmlspecialchars(trim($_POST['email']));
    $style = htmlspecialchars(trim($_POST['style']));
    $level = htmlspecialchars(trim($_POST['level']));
    $date = htmlspecialchars(trim($_POST['date']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Валидация обязательных полей
    if (empty($name) || empty($phone) || empty($style) || empty($level) || empty($date)) {
        die("Заполните все обязательные поля!");
    }

    // Подготовленный запрос для безопасности
    $stmt = $conn->prepare("INSERT INTO registrations 
        (name, phone, email, style, level, date, message) 
        VALUES (:name, :phone, :email, :style, :level, :date, :message)");

    // Привязываем параметры
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':style', $style);
    $stmt->bindParam(':level', $level);
    $stmt->bindParam(':date', $date);
    $stmt->bindParam(':message', $message);

    // Выполняем запрос
    try {
        $stmt->execute();
        echo "<h2>Спасибо за заявку, $name!</h2>";
        echo "<p>Мы свяжемся с вами по телефону $phone для подтверждения.</p>";
        echo "<a href='../index.html'>Вернуться на главную</a>";
    } catch(PDOException $e) {
        die("Ошибка при сохранении: " . $e->getMessage());
    }
} else {
    die("Неверный метод запроса!");
}
?>