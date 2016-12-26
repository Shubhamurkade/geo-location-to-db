<?php
require("login-info.php");
// Gets data from URL parameters
$name = mysql_real_escape_string($_GET['name']);
$type = mysql_real_escape_string($_GET['type']);
$area = mysql_real_escape_string($_GET['area']);
$location = mysql_real_escape_string($_GET['location']);
$lat = mysql_real_escape_string($_GET['lat']);
$lng = mysql_real_escape_string($_GET['lng']);
$conn = mysqli_connect($host, $username, '');
mysqli_select_db($database, $conn);	
$query = "insert into locations(name, type, area, location, lat, lng) values('$name', '$type', '$area', '$location', '$lat', '$lng')";
$result = mysqli_query($query, $conn);
$sql = "select id from locations where id = (select max(id) from locations)";
$result = mysqli_query($conn, $sql) or die(mysqli_error($con));
$row = mysqli_fetch_array($result);
$prod_id = $row['id'];
$acc='l'.$prod_id.',';
$mail = $_SESSION['mail'];
$sql = "select * from admin where email='$mail'";
$result = mysqli_query($conn, $sql) or die(mysqli_error($con));
$row = mysqli_fetch_array($result);
$add = $row['added'];
$add = $add.''.$acc;		
$sql = "update admin set added='$add' where email='$mail'";
$result = mysqli_query($conn, $sql)or die(mysqli_error($con));
mysqli_close($conn);
header('Location: /admin/add-product.html');
?>
