// 1. Definisikan State (Data Automata)
const states = [
  {
    id: 'telur',
    modelId: './Telur.glb',
    title: 'Fase: Telur',
    desc: 'Tahap pertama metamorfosis kupu-kupu. Kupu-kupu betina dewasa bertelur di atas daun. Telur ini dilindungi oleh cangkang keras agar aman dari predator dan cuaca ekstrem.'
  },
  {
    id: 'ulat',
    modelId: './Ulat.glb',
    title: 'Fase: Ulat (Larva)',
    desc: 'Setelah menetas, telur berubah menjadi ulat. Pada fase ini, ulat memiliki nafsu makan yang sangat besar. Ulat akan memakan daun terus-menerus untuk mengumpulkan energi dan tumbuh membesar.'
  },
  {
    id: 'kepompong',
    modelId: './Kepompong.glb',
    title: 'Fase: Kepompong (Pupa)',
    desc: 'Ulat berhenti makan dan mulai mencari tempat aman. Ia menggantungkan diri dan berubah menjadi kepompong. Di dalam kepompong, terjadi proses luar biasa: sel-sel ulat dirombak menjadi jaringan tubuh kupu-kupu.'
  },
  {
    id: 'kupukupu',
    modelId: './Kupukupu.glb',
    title: 'Fase: Kupu-kupu (Imago)',
    desc: 'Kupu-kupu dewasa keluar dari kepompong. Fase ini adalah tahap akhir. Kupu-kupu memiliki sayap indah, menghisap nektar bunga, dan bertugas untuk berkembang biak, memulai siklus hidup baru.'
  }
];

let currentIndex = 0;

// 2. Ambil Elemen HTML
const model3D = document.getElementById('model-3d');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnInfo = document.getElementById('btn-info');
const infoOverlay = document.getElementById('info-overlay');
const infoTitle = document.getElementById('info-title');
const infoText = document.getElementById('info-text');
const btnCloseInfo = document.getElementById('btn-close-info');
const hint = document.getElementById('hint');

// 3. Fungsi Update Tampilan (Transisi State)
function updateUI() {
  const state = states[currentIndex];

  // Ganti model 3D
  model3D.setAttribute('src', state.modelId);

  // Update teks penjelasan
  infoTitle.innerText = state.title;
  infoText.innerText = state.desc;

  // Atur status tombol (Disabled jika di ujung)
  btnPrev.disabled = currentIndex === 0;
  btnNext.disabled = currentIndex === states.length - 1;
}

// 4. Event Listener Tombol
btnNext.addEventListener('click', () => {
  if (currentIndex < states.length - 1) {
    currentIndex++;
    updateUI();
  }
});

btnPrev.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateUI();
  }
});

btnInfo.addEventListener('click', () => {
  infoOverlay.classList.add('active');
});

btnCloseInfo.addEventListener('click', () => {
  infoOverlay.classList.remove('active');
});

// 5. Event Listener MindAR (Hilangin hint kalau kartu ketemu)
const sceneEl = document.querySelector('a-scene');
sceneEl.addEventListener('targetFound', () => {
  hint.style.display = 'none';
});
sceneEl.addEventListener('targetLost', () => {
  hint.style.display = 'block';
});

// Inisialisasi awal pas web dibuka
updateUI();
