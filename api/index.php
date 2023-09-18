<?php

require_once "header.php";
require_once "method.php";

//ini adalah cara untuk mengambil data dari permintaan javascript
$datas = json_decode(file_get_contents('php://input'), true);
if(isset($datas['action'])){
    $action = $datas['action'];
    $peduliDiri = new PeduliDiri();
    // buat kondisi untuk permintaan get data dari java script bagian daftar
    if($datas['action'] == 'daftar'){
        $peduliDiri->daftar($peduliDiri->clean($datas['nik']), $datas['nama_lengkap']);
    // buat kondisi untuk permintaan get data dari java script bagian login
    }elseif($datas['action'] == 'login'){
        $peduliDiri->login($peduliDiri->clean($datas['nik']), $datas['nama_lengkap']);
    // buat kondisi untuk permintaan get data dari java script bagian fetch data dari backend
    }elseif($datas['action'] == 'getCatatan'){
        $peduliDiri->getData($datas['nik']);
    // buat kondisi untuk permintaan get data dari java script bagian isicatatan
    }elseif($datas['action'] == 'isiCatatan'){
        $peduliDiri->isiCatatan($datas['nik'], $datas['tanggal'], $datas['jam'], $datas['lokasi'], $datas['suhu']);
    // buat kondisi untuk permintaan get data dari java script bagian sorting data
    }else {
        $peduliDiri->sorting($datas['nik'],$datas['sortBy']);
    }
}
?>