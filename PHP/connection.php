<?php
	$dbhost="localhost";
	$dbname="piekarczyk";
	$dbuser="root";
	$dbpswd="zszywki369";

			//$dbSQL=new mysqli("localhost","root","zszywki369","piekarczyk");
	$dbSQL = new PDO('mysql:host='.$dbhost.';dbname='.$dbname.';charset=utf8', $dbuser, $dbpswd, array(  
			  PDO::ATTR_EMULATE_PREPARES => false,  
			  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION  
			  )  
			);
?>