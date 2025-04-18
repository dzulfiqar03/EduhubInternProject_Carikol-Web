$(document).ready(function () {
    // Memuat bagian header dan navbar terlebih dahulu
    $("#head-link").load("./Components/headLink/link.html", function () {
      // Memuat halaman utama pertama kali
      loadPage("./Components/Pages/home.html"); 
  
      // Memuat navbar dan menetapkan event listeners
      $("#nav").load("./Components/navbar.html", function () {
        // Menangani klik pada tiap link
        handlePageChange();
      });
    });
  
    // Fungsi untuk memuat konten ke dalam #app-root
    function loadPage(page) {
      $("#app-root").load(page, function () {
        console.log(`Halaman ${page} telah dimuat.`);
        // Bisa tambahkan inisialisasi spesifik untuk halaman, seperti FAQ, dll.
        if (page.includes('home.html')) {
          initFaq(); // Jika halaman home, inisialisasi FAQ
        }
      });
    }
  
    // Fungsi untuk menangani perubahan halaman berdasarkan klik di navbar
    function handlePageChange() {
      $('#home').on('click', function (e) {
        e.preventDefault();
        loadPage("./Components/Pages/home.html"); // Ganti dengan service.html
      });
  
      $('#service').on('click', function (e) {
        e.preventDefault();
        loadPage("./Components/Pages/service.html"); // Ganti dengan features.html
      });
  
      $('#about').on('click', function (e) {
        e.preventDefault();
        loadPage("./Components/Pages/about.html"); // Ganti dengan marketplace.html
      });
  
      $('#contact').on('click', function (e) {
        e.preventDefault();
        loadPage("./Components/Pages/contact.html"); // Ganti dengan company.html
      });
    }
  
    // Fungsi inisialisasi FAQ (bisa dipanggil di halaman tertentu)
    function initFaq() {
      document.addEventListener("alpine:init", () => {
        Alpine.store("accordion", {
          tab: 0
        });
  
        Alpine.data("accordion", (idx) => ({
          init() {
            this.idx = idx;
          },
          idx: -1,
          handleClick() {
            this.$store.accordion.tab =
              this.$store.accordion.tab === this.idx ? 0 : this.idx;
          },
          handleRotate() {
            return this.$store.accordion.tab === this.idx ? "-rotate-180" : "";
          },
          handleToggle() {
            return this.$store.accordion.tab === this.idx
              ? `max-height: ${this.$refs.tab.scrollHeight}px`
              : "";
          }
        }));
      });
    }
  });
  