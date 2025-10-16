  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('section').forEach(sec => {
      sec.style.opacity = 0;
      sec.style.transform = "translateY(30px)";
      sec.style.transition = "all 0.6s ease-out";
      observer.observe(sec);
    });


    function klik(){
     let container = document.querySelector(".picture1");

     if (container.style.display === "flex"){
      container.style.display = "none";
     }
     else{
      container.style.display = "flex";
     }
    }

     let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtn = document.getElementById('installBtn');
    if (installBtn) installBtn.style.display = 'block';
  });

  function installApp() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('PWA diinstal');
        }
        deferredPrompt = null;
        document.getElementById('installBtn').style.display = 'none';
      });
    }
  }

  // Cek jika sudah di PWA, sembunyikan tombol
  window.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      const installBtn = document.getElementById('installBtn');
      if (installBtn) installBtn.style.display = 'none';
    }
  });

  // Daftarkan service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('Service worker terdaftar.'))
      .catch(err => console.error('SW gagal:', err));
  }