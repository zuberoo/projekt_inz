<?php
	$dbhost="localhost";
	$dbname="******";
	$dbuser="root";
	$dbpswd="******";

			//$dbSQL=new mysqli("localhost","root","******","******");
	$dbSQL = new PDO('mysql:host='.$dbhost.';dbname='.$dbname.';charset=utf8', $dbuser, $dbpswd, array(  
			  PDO::ATTR_EMULATE_PREPARES => false,  
			  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION  
			  )  
			);
?>