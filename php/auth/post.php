<?php
require_once "../cookie.php";

session_start();
// require "../database.php";
require $_SERVER['DOCUMENT_ROOT'] . '/web-project/php/database.php';

if (isset($_GET["f"])) {
    $function = $_GET["f"];

    // Sign in function
    // checks if user exists
    // if exists => set cookie and sign in
    if ($function === "auth") {
        if (isset($_POST["email"]) && isset($_POST["password"])) {
            $email = $_POST["email"];
            $password = $_POST["password"];

            $sql = "SELECT _id, isAdmin, `name`, email, `address`, `phone` from USERS WHERE email=:email AND password=:password";

            $stmt = $db->prepare($sql);
            $stmt->execute(array(
                ":email" => $email,
                ":password" => $password,
            ));

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                // set session after authenticating user;
                // session basically contains the user's id which is used on other parts of the app

                setSessionCookies($result);

                $cookie = setCustomCookie($result);
                echo $cookie;

                return;
            }

        }
    }
}
