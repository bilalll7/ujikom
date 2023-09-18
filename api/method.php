<?php

// buat class 
class PeduliDiri{
    // buat variable yang isinya untuk menampung semua user yg sudah didaftarkan
    public $filename = './output/config.txt';
    // buat function untuk getdata
    public function getData($nik){

         //buat variable untuk menampung pada saat membuka folder yg isinya adalah data-nik.txt
        $file_handle = fopen('./output/data-' .$nik . '.txt' , 'r');
        //buat variable untuk menampung array kosong
        $datas = array();
        //buat perulangan
        while (!feof($file_handle)) {
            $separate = explode("|", fgets($file_handle));
            if($separate[0] != ''){
                $clearDataEnd = str_replace('\r', '', $separate[3]);
                $clearDataFinal = str_replace('\n', '', $clearDataEnd);
                $datas [] = [
                    'tanggal' => $separate[0],
                    'waktu' => $separate[1],
                    'lokasi' => $separate[2],
                    'suhu' => $clearDataFinal
                ];
            }
        }
        fclose($file_handle);
        echo json_encode($datas);
        return;
    }

    //buat function untuk daftar
    public function daftar($nik, $nama_lengkap){
        $file_handle = fopen($this->filename, "r");
        $status= "";
    //buat perulangan dan kondisi jika yang ada di filename index ke 0 sama dengan nik yg diketikan user jalankan alert
        while (!feof($file_handle)){
            $pisah = explode("|", fgets($file_handle));
            if ($pisah[0] == $nik ){
                //nik tidak boleh sama
                header('Content-Type: application/json');
                $status = 'Nik Sudah Terdaftar!';
                $data =[
                    "status" => $status
                ];
                echo json_encode($data);
                return;
            }
        }
        //cetak nik dan nama lengkap yg diketikan user ke variable text
        $text = $nik . "|" . $nama_lengkap . "\n";
        //simpan data yang sudah di cetak ke variable file name diatas
        $file_handle = fopen($this->filename, 'a+');
        fwrite($file_handle, $text);
        header('Content-Type: application/json');
        //buat variable data yang isinya array assosiatif lalu ubah jadi objek json 
        $data =[
            'status' => 'Sukses',
            'nik' => $nik,
            'nama_lengkap' => $nama_lengkap
        ];
        echo json_encode($data);
    }

    //buat function untuk login
    public function login($nik, $nama_lengkap){
        //buat variable untuk memisahkan nik dan nama lengkap
        $credential = $nik . "|" . $nama_lengkap ;
        header('Content-Type: application/json');
        
        //check nik sudah terdaftar atau belum
        //buat variable file untuk membaca seluruh file ke dalam array
        $file = file($this->filename, FILE_IGNORE_NEW_LINES);
        //buat kondisi jika nik belum terdaftar maka jalankan variable data dibawah
        if (stripos(json_encode($file), $credential) !== false){
            //buat variable data yang isinya array assosiatif lalu ubah jadi objek json 
            $data = ['status'=> 'success','nik' => $nik,'nama_lengkap' => $nama_lengkap];
        echo json_encode($data);
            //maka nik nya kalau sudah terdaftar tampilkan error atau alert tertentu
        } else {
        echo json_encode('error');
        }
    }
    // buat function isicatatan
   public function isiCatatan($nik, $tanggal, $jam, $lokasi, $suhu)
    {
        //periksa apakah ada file atau direktori
         $checkFile = file_exists('./output/data-' . $nik . '.txt');

        //lalu kita buat function untuk simpan data nya
        function saveData($fileName, $tanggal, $jam, $lokasi, $suhu)
        {
            //cetak tanggal jam lokasi suhu yg sudah diketikan oleh user di front end ke variable text
            $text = $tanggal . "|" . $jam . "|" . $lokasi . "|" . $suhu . "\n";
            //buat variable untuk menampung pada saat membuka folder yg isinya adalah data-nik.txt
            $file_handle = fopen($fileName, 'a+');
            //lalu tulis konten yg sudah ditampung ke variable text kealiran file yg sudah ditunjuk ke filehandle
            fwrite($file_handle, $text);
            header('Content-Type: application/json');
             //buat variable data yang isinya array assosiatif lalu ubah menjadi objek json 
            $data = [
                'status' => 'Sukses'
            ];
            echo json_encode($data);
        }
        //lalu buat kondisi jika ada file atau direktori didalam check file 
        if ($checkFile) {
            //lalu tampung ke dalam variable fileName
            $fileName = "./output/data-" . $nik . ".txt";
            //dan jalankan function save data nya
            saveData($fileName, $tanggal, $jam, $lokasi, $suhu);
        } else {
            $createFile = fopen("./output/data-" . $nik . ".txt", "w"); //create file
             $fileName ="./output/data-" . $nik . ".txt";
             saveData($fileName, $tanggal, $jam, $lokasi, $suhu);
            
        }
    }
    public function clean($string){
        $string = str_replace('','-', $string);
        return preg_replace('/[^A-Za-z0-9\-]/','', $string);
    }
    public function sorting($nik, $sort){
        $file_handle = fopen('./output/data-' .$nik . '.txt' , 'r');
        $datas = array();
        while (!feof($file_handle)) {
            $separate = explode("|", fgets($file_handle));
            if($separate[0] != ''){
                $clearDataEnd = str_replace('\r', '', $separate[3]);
                $clearDataFinal = str_replace('\n', '', $clearDataEnd);
                $datas [] = [
                    'tanggal' => $separate[0],
                    'waktu' => $separate[1],
                    'lokasi' => $separate[2],
                    'suhu' => $clearDataFinal
                ];
            }
        }
        fclose($file_handle);

        usort($datas, function ($a,$b)use($sort){
            return $a[$sort] <=> $b[$sort];
        });
        echo json_encode($datas);
        return;       
    }
}
?>