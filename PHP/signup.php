<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="pl" lang="pl"> 
	<head> 
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" >
		<meta http-equiv="Content-Type" content="text/html" charset="iso-8859-2" />
		<link rel='stylesheet' href="../CSS/style.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	</head> 
	<body>
		<div class="signup">
			<?php
				require_once 'connection.php';
				$wynik=[];
				$email = $_POST['email'];
				$password = $_POST['pass'];
				$email = hash("md5",$email,false);
				$password = hash("md5",$password,false);
				$zapytanie="SELECT email FROM users WHERE email='$email'";
				$wynik=$dbSQL->query($zapytanie)->fetch(PDO::FETCH_ASSOC);
				if(!isset($wynik) || $wynik == false){
					$zapytanie="INSERT INTO users(email, passwrod) VALUES ('$email','$password') ";	
						if($dbSQL->query($zapytanie) == true)
			        	 echo ('Pomyślnie zarejestrowano, <a href="../HTML/index.html"> powróć do strony logowania</a>');
			    }else{
			    	echo ('Podany adres email jest już przypisany do konta, <a href="../HTML/index.html"> powróć do strony logowania</a>');
			    }			
			?>
		</div>
	</body>
</html>