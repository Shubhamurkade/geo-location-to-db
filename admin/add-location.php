<?php
//start session to know the current user
require('login-info.php');
session_start();
if(isset($_SESSION['mail']) && isset($_SESSION['password']))
{
	$mail = $_SESSION['mail'];
	$pass = $_SESSION['password'];
	$con = mysqli_connect($host, $username, $password);
	mysqli_select_db($con, $database);
	$sql = "select * from admin";
	$result = mysqli_query($con, $sql) or die(mysqli_error($con));
	$flag = 0;
	while($row = mysqli_fetch_array($result))
	{
		if($row['email']==$mail && $row['password'] == $pass){
			$flag =1;
			break;
		}
	}
	mysqli_close($con);
}
if(!isset($_SESSION['mail']) || !isset($_SESSION['password']) || $flag=0)
{
	header('Location: /home.php?check=na');
	exit;
}
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Add Location</title>
		<link rel="stylesheet" href="/css/bootstrap.min.css">
		<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		<link rel="stylesheet" href="/css/main.css">
		<link type="text/css" rel="stylesheet" href="/css/materialize.min.css"  media="screen,projection"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<script src="/js/jquery-2.2.3.min.js"></script>
		<script type="text/javascript" src="/js/materialize.min.js"></script>
		<script type="text/javascript" src="../js/location-load.js"></script>
		<script type='text/javascript'>
		window.onload=function(){
		$('.button-collapse').sideNav({
			  closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
			}
		  );
		} 
		</script>
		<style>
			header, main, footer { padding-left: 100px; }
			@media only screen and (max-width : 992px) 
			{
				header, main, footer { padding-left: 0; }
			}
		</style>	
	</head>
	<body>
		<?php
			require("header.php");
			
		?>

		<main>
			<div class="container">	
				<div class="col-sm-12">
					<input id="pac-input" class="controls" type="text" placeholder="Search Location">
					<div id="map" class="map-canvas"> </div>
				</div>	
			</div>
		</main>
		<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDrzTRllfqGG_MeruMipk6waJe1AEGerFo&libraries=places&callback=initAutocomplete" async defer></script>
	</body>
</html>