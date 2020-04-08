<?php
session_start();
//include("db.php");
//header("Access-Control-Allow-Origin: https://api.nasa.gov");
header("Access-Control-Allow-Origin: https://test-nicky-dokter.herokuapp.com/index.php");

if(!isset($_GET["page"])){
    $mainContainerHTML = "<div id=\"mainContentHeader\"><small class='darkmodeText'>Kies een datum</small><br><input type='date' id='nasaImageDate' onchange='getNasaImage();'><h1 class='darkmodeText'>Home</h1></div>
                <div class=\"imgContainer\">
                    <img class='nasaImage' src=\"\" alt='Loading...'>
                </div>
                <div id='nasaImageInfo'>
                      <h2 id='nasaImageTitle' class='darkmodeText'></h2>
                <p id='nasaImageDesc' class='cusScrollbar'></p>
                </div>";
}else if($_GET["page"] == "comments"){
    echo "er Kan geen database komen";
//    $sql = "select * from comments;";
//    $std = $db->prepare($sql);
//    $std->execute();
//    $result = $std->fetchAll();
//    $rowcount = $std->rowCount();
//    $mainContainerHTML = "<div id=\"mainContentHeader\"><h1 class='darkmodeText'>Comments</h1></div><div class='darkmodeText cusScrollbar' id=\"commentContainer\"><small>".$rowcount." result(s)!</small>";
//    foreach($result as $row){
//        $mainContainerHTML .= "
//                        <div class=\"commentField\">
//                            <div class=\"commenterNaamContainer\">
//                                <small id=\"cmntNaamTitle\" class='darkmodeText'>Geschreven door:</small>
//                                <div class=\"commenterNaam\">
//                                    {$row["commentNaam"]}
//                                </div>
//                                <div class='userComment cusScrollbar'>
//                                    {$row["comment"]}
//                                </div>
//                            </div>
//                        </div>";
//    }
//    $mainContainerHTML .= "</div>";
}else if($_GET["page"] == "settings"){
    $mainContainerHTML = "<div id=\"mainContentHeader\"><h1>Settings</h1></div>";
    $mainContainerHTML .= "
                    <div class=\"settingField darkmodeText\">
                        <span class=\"settingSpan\">Darkmode: &nbsp;&nbsp;&nbsp;<input id=\"darkmodeCheck\" type=\"checkbox\" onchange=\"Darkmode()\"></span>
                    </div><br>
                    <div class=\"settingField darkmodeText\">
                        <span class=\"settingSpan\">Gebruikersnaam: &nbsp;&nbsp;&nbsp;<input id=\"gebruikernaamTxt\" type=\"text\">&nbsp;<button type='button' onclick='saveUsername();'>Opslaan</button></span>
                    </div>";
}
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Apps</title>
        <script src="main.js"></script>
        <link rel="stylesheet" href="./main.css">
    </head>
    <body>
        <div id="page">
            <!-- HEADER -->
            <header>
                <div id="headerContainer">
                    <div id="headerLogo">
                        <img src="images/logo.jpg">
                    </div>
                    <div id="headerText"><h1 class="darkmodeText">Nasa Foto's</h1></div>
                </div>
                <!-- SIDE BAR -->
                <div id="sideBarContainer">
                    <div id="listContainer">
                        <ul>
                            <li>
                                <a class="darkmodeText" href="./index.php">Home</a>
                            </li>
                            <li>
                                <a class="darkmodeText" href="index.php?page=comments">Comments</a>
                            </li>
                            <li>
                                <a class="darkmodeText" href="index.php?page=settings">Settings</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <!-- MAIN CONTENT -->
            <div id="mainContainer">
                <?php
                echo $mainContainerHTML;
                ?>
            </div>
        </div>
    </body>
    <script>
        checkDarkmode();
    </script>
</html>