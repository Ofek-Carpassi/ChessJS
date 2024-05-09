<?php
    session_start();
    include("connection.php");
    include("functions.php");

    $user_data = check_login($con);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Home</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chess Home</title>
    <link rel="stylesheet" href="../css/index.css">
</head>
<body>
    <h1>Welcome to Chess Game <?php echo $user_data['user_name'];?></h1>
    <a id="logout" href="logout.php">Logout</a>
    <p>Choose your game mode:</p>
    <button id="play-against-computer">Play Against Computer</button>
    <button id="play-locally">Play Locally</button>

    <script src="../js/index.js"></script>
</body>
</html>