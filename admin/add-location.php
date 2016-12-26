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
		<link rel="stylesheet" href="/css/map.css">
		<link type="text/css" rel="stylesheet" href="/css/materialize.min.css"  media="screen,projection"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<script src="/js/jquery-2.2.3.min.js"></script>
		<script type="text/javascript" src="/js/materialize.min.js"></script>
		<script type="text/javascript" src="/js/location-load.js"></script>
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
		<header>
			<nav>
				<div class="container"><a href="#" data-activates="nav-mobile" class="button-collapse top-nav full hide-on-large-only"><i class="material-icons">menu</i></a><div class="nav-wrapper"><span style="font-size:20px">ADMIN PAGE</span></div></div>
				<ul id="nav-mobile" class="side-nav fixed">
					<li class="no-padding">
						<ul class="collapsible collapsible-accordion">
							<li>
								<a class="collapsible-header waves-effect waves-teal">Products</a>
								<div class="collapsible-body">
									<ul>
										<li><a href="add-product.php">New</a></li>
										<li><a href="modify-product.php">Modify</a></li>
										<li><a href="delete-product.php">Delete</a></li>
									</ul>
								</div>
							</li>
						</ul>
					</li>
					<li class="no-padding">
						<ul class="collapsible collapsible-accordion">
							<li>
								<a class="collapsible-header waves-effect waves-teal">Location</a>
								<div class="collapsible-body">
									<ul>
										<li><a href="add-location.php">New</a></li>
										<li><a href="modify-location.php">Modify</a></li>
										<li><a href="delete-location.php">Delete</a></li>
									</ul>
								</div>
							</li>		  
						</ul>
					</li>		  
					<li class="no-padding">
						<ul class="collapsible collapsible-accordion">
							<li>
								<a class="collapsible-header waves-effect waves-teal">Services</a>
								<div class="collapsible-body">
									<ul>
										<li><a href="add-service.php">New</a></li>
										<li><a href="modify-service.php">Modify</a></li>
										<li><a href="delete-service.php">Delete</a></li>
									</ul>
								</div>
							</li>
						</ul>
					</li>
					<li class="no-padding">
						<ul class="collapsible collapsible-accordion">
							<li>
								<a class="collapsible-header waves-effect waves-teal">Office</a>
								<div class="collapsible-body">
									<ul>
										<li><a href="add-office.php">New</a></li>
										<li><a href="modify-office.php">Modify</a></li>
										<li><a href="delete-office.php">Delete</a></li>
									</ul>
								</div>
							</li>		  
						</ul>
					</li>
					<li><a href="/admin-logout.php">Logout</a></li>
				</ul>
			</nav>
		</header>

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
