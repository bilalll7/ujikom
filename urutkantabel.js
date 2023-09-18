async function urutkanTabel() {
  //buat alert berhasil di tamabhakan jika berhasil mensorting tabelnya
  alert('Data Berhasil di Urutkan!');
  const data = document.getElementById('selectSorting').value;

  //fetch ke api dengan url localhost dengan method nya post agar ketika di submit data nya disembunyikan di balik layar tidak ditampilan di url
  const response = await fetch('http://localhost', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nik: localStorage.getItem('isLoggedIn'),
      sortBy: data,
      action: 'sorting',
    }),
  });

  //buat variable untuk mengambil data table yang sudah di masukan user menggunakan DOM
  let getDataa = await response.json();
  console.log(' getData', getDataa);
  const dataTable = document.getElementById('dataFromApi');
  let datas = `<tr>
    <th>Tanggal</th>
    <th>Waktu</th>
    <th>Lokasi</th>
    <th>Suhu Tubuh</th>
    </tr>`;

  //lalu jalankan foreach agar kita bisa menjalankan pengulangan array nya
  getDataa.forEach((data) => {
    datas += `<tr>
      <td>${data.tanggal}</td>
      <td>${data.waktu}</td>
      <td>${data.lokasi}</td>
      <td>${data.suhu}</td>
      </tr>`;
  });
  dataTable.innerHTML = datas;
}
