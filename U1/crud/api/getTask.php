<?php
include "./partials/Connection.php";
$taskId = $_GET['task_id'];

try {
    $sql = "SELECT FROM task WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$taskId]);

    $json = [];
    while($row = $state->fetch(PDO::FETCH_ASSOC)){
        $json []=[
            'id' => $row['task_id'],
            'fullname' => "{$row['firstname']} {$row['lastname']}",
            'title' => $row['title'],
            'completed' => $row['completed'],
        ];

    }

    echo json_encode($json);

} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

