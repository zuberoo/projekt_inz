<?php
echo 1;
 $data = $_POST;
 var_dump($data);

$polaczenie=new mysqli("localhost","root","*****","******");
$polaczenie->query("SET NAMES 'utf8' COLLATE 'utf8_unicode_ci'");
if ($polaczenie->connect_error) 
{
die("Connecion failed:".$polaczenie->connect_error);
}else{
	echo 'Poszlo'
}
?>