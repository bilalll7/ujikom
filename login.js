async function handleSubmit(event, action) {
  event.preventDefault();
  //buat variable untuk manipulasi idnya
  const nik = document.getElementById('nik').value;
  const nama_lengkap = document.getElementById('nama_lengkap').value;

  //buat validasi agar user tidak bisa login jika tidak mengisi nik atau nama lengkap saat login
  if (!nik && !nama_lengkap) {
    alert('Nik atau Nama Lengkap Tidak boleh Kosong !!!');
    return;
  }

  //buat aksi pada saat user mengisi form nik dan namalengkap
  let formData = new FormData();
  formData.append('nik', nik);
  formData.append('nama_lengkap', nama_lengkap);
  if (action === 'daftar') {
    formData.append('action', 'daftar');
  } else {
    formData.append('action', 'login');
  }

  //mengubah apa ya diketikan user di dalam form nik dan nama lengkap menjadi array
  let object = {};
  console.log(formData);
  formData.forEach((value, key) => (object[key] = value));
  let json = JSON.stringify(object);
  console.log(json);

  //aksi pada saat daftar
  if (action === 'daftar') {
    try {
      //kirim data yang sudah diubah menjadi array ke api
      const response = await fetch('http://localhost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: json,
      });
      let data = await response.json();
      console.log('data', data);
      // buat pengecekan jika nik sudah terdaftar buat validasi agar tidak bisa login
      if (data.status != 'Sukses') {
        alert('Nik Sudah Terdaftar');
      } else {
        alert('Pendaftaran Berhasil , anda akan diarahkan ke dashboard!');
        localStorage.setItem('isLoggedIn', data.nik);
        localStorage.setItem('isLoggedinName', data.nama_lengkap);
        window.location.replace('./dashboard.html');
      }
    } catch (error) {
      console.log('error', error);
    }
  } else {
    //aksi pada saat login
    try {
      //kirim data yang sudah diubah menjadi array ke api
      const response = await fetch('http://localhost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: json,
      });
      let data = await response.json();
      console.log('data', data);
      // buat pengecekan agar bisa login dan tidak bisa login jika nik atau nama lengkap tidak sesuai
      if (data.status === 'success') {
        alert('Anda Telah Berhasil Login ke Halaman Dashboard !');
        localStorage.setItem('isLoggedIn', data.nik);
        localStorage.setItem('isLoggedinName', data.nama_lengkap);
        window.location.replace('./dashboard.html');
      } else {
        alert('Nik atau Nama Lengkap Tidak Sesuai !');
      }
    } catch (error) {
      console.log('error', error);
    }
  }
}
