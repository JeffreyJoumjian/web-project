<?php

require "../database.php";

if (isset($_GET["f"])) {
    $function = $_GET["f"];

    // Sign in function
    // checks if user exists
    // if exists => set cookie and sign in
    if ($function === "auth") {
        if (isset($_POST["email"]) && isset($_POST["password"])) {
            $email = $_POST["email"];
            $password = $_POST["password"];

            $sql = "SELECT _id, isAdmin from USERS WHERE email=:email AND password=:password";

            $stmt = $db->prepare($sql);
            $stmt->execute(array(
                ":email" => $email,
                ":password" => $password,
            ));

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                // $result = array(
                //     "result" => $result,
                // );
                // echo json_encode($result);

                // set session after authenticating user;
                // session basically contains the user's id which is used on other parts of the app
                session_start();

                // delete old session and cookies
                unset($_SESSION["user"]);
                setcookie('webprojectcookie_id', '', time() - 3600, '/'); // user cookie
                setcookie('webprojectcookie2_id', '', time() - 3600, '/'); // admin cookie

                $_id = $result["_id"];
                $isAdmin = (boolean) $result["isAdmin"];
                $_SESSION["user"] = array("_id" => $_id);

                if ($isAdmin) {
                    setcookie('webprojectcookie2_id', $_id, time() + 3600, '/');
                } else {
                    setcookie('webprojectcookie_id', $_id, time() + 3600, '/');
                }

                $result = array("result" => $result);
                echo json_encode($result);

                return;
            }

        }
    }
}
