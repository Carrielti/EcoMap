<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "eco_pilhas";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

$sql = "SELECT * FROM pontos";
$result = $conn->query($sql);
?>