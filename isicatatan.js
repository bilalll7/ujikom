//buat function isi catatan untuk bisa mengisi data catatan perjalanan
async function isiCatatan(event) {
  //buat prevent default agar mencegah terjadinya reload pada button pada saat di klik
  event.preventDefault();
  // membuat variable
  const tanggal = document.getElementById('tanggal').value;
  const jam = document.getElementById('jam').value;
  const lokasi = document.getElementById('lokasi').value;
  const suhu = document.getElementById('suhu').value;
  const nik = localStorage.getItem('isLoggedIn');

  //membuat variable / isi dari value yg di ketikan  oleh user ke dalam id yg bersangkutan
  let formData = new FormData();
  formData.append('tanggal', tanggal);
  formData.append('jam', jam);
  formData.append('lokasi', lokasi);
  formData.append('suhu', suhu);
  formData.append('nik', nik);
  formData.append('action', 'isiCatatan');

  //kirim data yang sudah diubah menjadi array ke api/backend
  let object = {};
  console.log(formData);
  formData.forEach((value, key) => (object[key] = value));
  let json = JSON.stringify(object);

  //fetch ke api dengan url localhost dengan method nya post agar ketika di submit data nya disembunyikan di balik layar tidak ditampilan di url
  try {
    const response = await fetch('http://localhost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: json,
    });
    let data = await response.json();
    console.log('data', data);
    //buat kondisi jika data yang ditambahkan itu sukses maka jalankan alert seperti dibawag
    if (data.status == 'Sukses') {
      alert('data berhasil ditambahkan');
      showTab('catatan');
    }
  } catch (error) {
    console.log(error);
  }
}
