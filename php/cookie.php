<?php
function setCustomCookie($result)
{
    setcookie('webprojectcookie', '', time() - 3600, '/'); // user cookie

    $cookie = array(
        "result" => array(
            "name" => $result["name"],
            "email" => $result["email"],
            "phone" => $result["phone"],
            "address" => $result["address"],
        ),
    );
    $cookie = json_encode($cookie);
    setcookie('webprojectcookie', $cookie, time() + 3600, '/');
    return $cookie;
}

function setSessionCookies($result)
{
// delete old session and cookies
    if (isset($_SESSION["user"])) {
        unset($_SESSION["user"]);
    }

    $_SESSION["user"] = array(
        "_id" => (int) $result["_id"],
        "isAdmin" => $result["isAdmin"],
    );

}
