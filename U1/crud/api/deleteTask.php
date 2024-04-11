<?php
include "./partials/Connection.php";
$taskId = $_GET['task_id'];

try {
    $sql = "DELETE FROM task WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$taskId]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["error" => "Task not found"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

