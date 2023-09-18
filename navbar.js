async function showTab(params) {
  //buat function baru didalam function
  function menuLooping(el, x) {
    //kita jalankan foreach untuk pengulangan array nya
    el.forEach((element, index) => {
      console.log('element', index);
      //buat pengkondisian jika class hidden ada maka hapus kalo ngga ada ,tambahkan class hidden.
      if (index === x) {
        if (element.classList.contains('hidden')) {
          return element.classList.remove('hidden');
        }
      } else {
        return element.classList.add('hidden');
      }
    });
  }
  //buat variable dan manipulasi DOM nya
  const el = document.querySelectorAll('.item-id');
  //buat kondisi jika paramter home di tekan tampilkan function menuLooping yg index nya ke 0
  if (params === 'home') {
    menuLooping(el, 0);
    //buat kondisi jika paramter catatan di tekan tampilkan pengulangan array menggunakan foreach dan tampilkan
  } else if (params === 'catatan') {
    el.forEach((element, index) => {
      console.log('element', index);
      if (index === 1) {
        if (element.classList.contains('hidden')) {
          element.classList.remove('hidden');
        }
      } else {
        element.classList.add('hidden');
      }
    });
    const response = await fetch('http://localhost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nik: localStorage.getItem('isLoggedIn'),
        action: 'getCatatan',
      }),
    });
    let getData = await response.json();
    console.log('getData', getData);
    const dataTable = document.getElementById('dataFromApi');
    let datas = `<tr>
        <th>Tanggal</th>
        <th>Waktu</th>
        <th>Lokasi</th>
        <th>Suhu Tubuh</th>
        </tr>`;
    getData.forEach((data) => {
      datas += `<tr>
        <td>${data.tanggal}</td>
        <td>${data.waktu}</td>
        <td>${data.lokasi}</td>
        <td>${data.suhu}</td>
        </tr>`;
    });
    dataTable.innerHTML = datas;
  } else {
    el.forEach((element, index) => {
      console.log('element', index);
      if (index === 2) {
        if (element.classList.contains('hidden')) {
          element.classList.remove('hidden');
        }
      } else {
        element.classList.add('hidden');
      }
    });
  }
}
