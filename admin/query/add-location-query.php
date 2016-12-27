<?php
require("login-info.php");

// Gets data from URL parameters
$machine_id = mysql_real_escape_string($_GET['machine_id']);
$name = mysql_real_escape_string($_GET['name']);
$type = mysql_real_escape_string($_GET['type']);
$desc = mysql_real_escape_string($_GET['desc']);
$street = mysql_real_escape_string($_GET['street']);
$route = mysql_real_escape_string($_GET['route']);
$area_name = mysql_real_escape_string($_GET['area_name']);
$city = mysql_real_escape_string($_GET['city']);
$state = mysql_real_escape_string($_GET['state']);
$country = mysql_real_escape_string($_GET['country']);
$pin = mysql_real_escape_string($_GET['pin']);
//$contact = mysql_real_escape_string($_GET['contact']);
$lat = mysql_real_escape_string($_GET['lat']);
$lng = mysql_real_escape_string($_GET['lng']);


// Opens a connection to a MySQL server
$connection=mysqli_connect ("localhost", $username, $password);
if (!$connection) {
  die('Not connected : ' . mysqli_error($con));
}

// Set the active MySQL database
$db_selected = mysql_select_db($database, $connection);
if (!$db_selected) {
  die ('Can\'t use db : ' . mysqli_error($con));
}

// Insert new row with user data 
$query = "insert into locations(machine_id, name, type, description, street, route, area, city, state, country, pin, lat, lng) values('$machine_id', '$name', '$type', '$desc', '$street','$route', '$area_name', '$city', '$state', '$country', '$pin', '$lat', '$lng');";

$result = mysql_query($query);

if (!$result) {
  die('Invalid query: ' . mysqli_error($con));
}
else echo "location added";

$query = "insert into products_table set machine_id = '$machine_id', lat = '$lat', lng = '$lng';";
$result = mysql_query($query);

if (!$result) {
  die('Invalid query: ' . mysqli_error($con));
}
else echo "location added";

header('localhost/add-product.html');
?>
