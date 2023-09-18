
<?php
//untuk menampilkan error
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);

//ini cara fix cors(allow semua origin)
//agar pada saat fetch data dari backend tidak ter block oleh cors
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: *');
?>