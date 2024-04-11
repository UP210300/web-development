<?php
include "./partials/Connection.php";

// Leer los datos del cuerpo de la solicitud en formato JSON
$data = json_decode(file_get_contents("php://input"), true);

// Extraer los datos necesarios
$userId = $data['idUser'];
$taskTitle = $data['title'];
$completed = isset($data['completed']) ? $data['completed'] : 0; // Si 'completed' no está presente, establecerlo en 0

try {
    $sql = "INSERT INTO task (title, idUser, completed) VALUES (?, ?, ?)";
    $state = $conn->prepare($sql);
    $state->execute([$taskTitle, $userId, $completed]);
    $lastInsertId = $conn->lastInsertId();

    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    die($e->getMessage());
}
?>
