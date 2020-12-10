<?php
require_once "../database.php";

$function = $_GET["f"];

function isValidEmail($email)
{
    $regex = "/(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|\"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?\")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i";
    return preg_match($regex, $email);
}

if (isset($function)) {

    if ($function === "add") {
        if (isset($_POST['name']) &&
            isset($_POST['email']) && isValidEmail($_POST['email']) &&
            isset($_POST['address']) && isset($_POST['phone']) &&
            isset($_POST['menuItem_id']) && isset($_POST['rating']) && isset($_POST['message'])
        ) {

            try {
                $name = $_POST['name'];
                $email = $_POST['email'];
                $address = $_POST['address'];
                $phone = $_POST['phone'];
                $menuItem_id = $_POST['menuItem_id'];
                $rating = $_POST['rating'];
                $message = $_POST['message'];

                $sql = "INSERT INTO RATINGS (name, email, address, phone, menu_item_id, rating, message)
												VALUES (:name, :email, :address, :phone, :menuItem_id, :rating, :message)";

                $stmt = $db->prepare($sql);
                $result = $stmt->execute(array(
                    ':name' => $name,
                    ':email' => $email,
                    ':address' => $address,
                    ':phone' => (int) $phone,
                    ':menuItem_id' => (int) $menuItem_id,
                    ':rating' => (int) $rating,
                    ':message' => $message,
                ));

                if ($result) {
                    $result = array(
                        "result" => array(
                            '_id' => $db->lastInsertId(),
                            'name' => $name,
                            'email' => $email,
                            'address' => $address,
                            'phone' => (int) $phone,
                            'menuItem_id' => (int) $menuItem_id,
                            'rating' => (int) $rating,
                            'message' => $message,
                        ),
                    );
                    echo json_encode($result);
                }
            } catch (Throwable $e) {
                echo json_encode(array("error" => $e));
            }
        }
    }
}
