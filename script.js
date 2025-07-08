document.addEventListener('DOMContentLoaded', () => {
    // --- Animasi Selamat Datang (Welcome Overlay) ---
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const body = document.body;

    // Fungsi untuk menyembunyikan overlay
    const hideOverlay = () => {
        if (welcomeOverlay) {
            welcomeOverlay.classList.add('hidden');
            setTimeout(() => {
                body.classList.add('loaded');
            }, 500); // Memberi waktu transisi overlay selesai
        }
    };

    // Sembunyikan overlay setelah 3 detik
    setTimeout(() => {
        hideOverlay();
    }, 3000);

    // --- Smooth Scrolling untuk Navigasi ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('.header').offsetHeight;
                const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Animasi Scroll (Fade-in-section) ---
    const fadeInSections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Fungsionalitas Filter Portofolio ---
    const options = document.querySelectorAll('.portfolio-options .option');
    const items = document.querySelectorAll('.portfolio-grid .portfolio-item');

    options.forEach(option => {
        option.addEventListener('click', function() {
            const filter = this.dataset.filter;

            // Hapus kelas 'active' dari semua opsi
            options.forEach(opt => opt.classList.remove('active'));
            // Tambahkan kelas 'active' ke opsi yang diklik
            this.classList.add('active');
            
            items.forEach(item => {
                if (item.dataset.category === filter) {
                    item.style.display = 'block'; // Tampilkan item
                    // Paksa reflow agar transisi opacity bekerja
                    void item.offsetWidth; 
                    item.classList.add('is-visible'); // Picu animasi fade-in
                } else {
                    item.classList.remove('is-visible'); // Picu animasi fade-out
                    // Sembunyikan setelah animasi selesai
                    item.addEventListener('transitionend', function handler(e) {
                        // Pastikan ini adalah transisi opacity dan item memang seharusnya disembunyikan
                        if (e.propertyName === 'opacity' && !item.classList.contains('is-visible')) {
                            item.style.display = 'none';
                            item.removeEventListener('transitionend', handler); // Hapus listener agar tidak berulang
                        }
                    });
                }
            });
        });
    });

    // PENTING: Memicu klik pada "web karya" saat halaman dimuat
    const webKaryaOption = document.querySelector('.portfolio-options .option[data-filter="web"]');
    if (webKaryaOption) {
        webKaryaOption.click(); // Memicu event klik secara programatis
    }

    // CATATAN: Kode WhatsApp untuk AULINA Bouquet TIDAK ADA DI SCRIPT INI.
    // Script ini hanya untuk portofolio pribadi Imammahdy.
});