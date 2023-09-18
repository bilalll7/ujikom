async function callApi(url) {
  const response = await fetch(url);
  let data = await response.json();

  return data;
}
// buat function untuk menampilkan nama lengkap yang sudah terdaftar ke Selamat datang di aplikasi peduli diri
function getisLoggedinName() {
  const name = localStorage.getItem('isLoggedinName');
  // buat kondisi jika id yg dipanggil udh benar
  if (name) {
    document.getElementById('isLoggedinName').innerHTML = name;
  }
}
getisLoggedinName();
function namaUserBaru() {
  const user_baru = localStorage.getItem('isLoggedinName');
  // buat kondisi jika id yg dipanggil udh benar
  if (user_baru) {
    document.getElementById('user').innerHTML = user_baru;
  }
}
namaUserBaru();
