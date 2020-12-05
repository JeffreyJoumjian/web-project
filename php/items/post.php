<?php
require_once "../database.php";

$function = $_GET["f"];

// TODO CHECK IF USER IS ADMIN
if (isset($function)) {

    if ($function === "add") {
        $name = $_POST['name'];
        $price = $_POST['price'];
        $ingredients = $_POST['ingredients'];
        $imgSrc = $_POST['imgSrc'];

        if (isset($name) && isset($price) && isset($ingredients) && isset($imgSrc)) {
            $sql = "INSERT INTO MENU_ITEMS (name, price, ingredients, imgSrc)
					VALUES (:name, :price, :ingredients, :imgSrc)";

            $stmt = $db->prepare($sql);
            $result = $stmt->execute(array(
                ':name' => $name,
                ':price' => (float) $price,
                ':ingredients' => $ingredients,
                ':imgSrc' => $imgSrc,
            ));

            if ($result) {
                $result = array(
                    "result" => array(
                        "_id" => $db->lastInsertId(),
                        'name' => $name,
                        'price' => (float) $price,
                        'ingredients' => $ingredients,
                        'imgSrc' => $imgSrc,
                    ),
                );
                echo json_encode($result);
            }

        }
    } else if ($function === "update") {
        $_id = $_POST["_id"];
        $name = $_POST['name'];
        $price = $_POST['price'];
        $ingredients = $_POST['ingredients'];
        $imgSrc = $_POST['imgSrc'];

        if (isset($_id) && isset($name) && isset($price) && isset($ingredients) && isset($imgSrc)) {
            $sql = "UPDATE `MENU_ITEMS`
										SET name=:name, price=:price ,ingredients=:ingredients, imgSrc=:imgSrc
										WHERE _id=:_id";

            $stmt = $db->prepare($sql);
            $result = $stmt->execute(array(
                ':_id' => (int) $_id,
                ':name' => $name,
                ':price' => (float) $price,
                ':ingredients' => $ingredients,
                ':imgSrc' => $imgSrc,
            ));

            if ($result) {
                $result = array(
                    "result" => array(
                        "_id" => $_id,
                        'name' => $name,
                        'price' => (float) $price,
                        'ingredients' => $ingredients,
                        'imgSrc' => $imgSrc,
                    ),
                );
                echo json_encode($result);
            }

        }
    } else if ($function === "delete") {
        $_id = $_POST["_id"];

        if (isset($_id)) {
            $sql = "DELETE FROM MENU_ITEMS WHERE _id = :_id";
            $stmt = $db->prepare($sql);
            $result = $stmt->execute(
                array(
                    ":_id" => (int) $_id,
                )
            );

            if ($result) {
                $result = array(
                    "result" => array(
                        "_id" => $_id,
                    ),
                );
                echo json_encode($result);
            }

        }
    }
}
