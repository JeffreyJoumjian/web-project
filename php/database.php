
<?php
$db_host = 'localhost';
$db_name = 'web-project';
$db_user = 'root';
$db_password = 'root';
$db_port = 8889;

$db = new PDO(
    "mysql:host=" . $db_host .
    ";port=" . $db_port .
    ";dbname=" . $db_name,
    $db_user,
    $db_password
);

$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

?>

