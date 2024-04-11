<?php

include './partials/Connection.php';


try {
    $user_id = isset($_GET['user_id']) ? $_GET['user_id'] : 1;

    $SQL = "SELECT t.id AS task_id, t.*,u.* FROM `task` t INNER JOIN `user` u ON u.id=t.idUser WHERE idUser = {$user_id};";
    $state = $conn->query($SQL);

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
    die($e->getMessage());
}
