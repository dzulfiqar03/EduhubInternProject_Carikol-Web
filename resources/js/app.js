$(document).ready(function () {
  // Memuat bagian header dan navbar terlebih dahulu
  $("#head-link").load("./Components/headLink/link.html", function () {
    $("#nav").load("./Components/navbar.html", function () {
      handlePageChange();

      const detailsElements = document.querySelectorAll("details");
      document.addEventListener("click", function (event) {
        detailsElements.forEach(function (details) {
          if (!details.contains(event.target)) {
            details.removeAttribute("open");
          }
        });
      });

      // Cek token login
      if (!localStorage.getItem("authToken")) {
        loadPage("./Components/Pages/auth/login.html");
      } else {
        loadPage("./Components/Pages/home.html");
      }

      revealElements();
    });
  });

  // Fungsi untuk memuat konten ke dalam #app-root
 function loadPage(page) {
  $("#app-root").load(page, function () {
    console.log(`Halaman ${page} telah dimuat.`);

    // Sembunyikan navbar jika halaman login
    if (page.includes("login.html")) {
      $("header").hide();
    } else {
      $("header").show();
    }

    // Inisialisasi khusus jika halaman home
    if (page.includes("home.html")) {
      initFaq(); // pastikan fungsi ini didefinisikan
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

     $('#login').on('click', function (e) {
      e.preventDefault();
      loadPage("./Components/Pages/auth/login.html"); // Ganti dengan company.html
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


  function revealElements() {
    const elements = document.querySelectorAll('.animate-slide-left, .animate-slide-right, .animate-fade-up, .animate-fade-in');
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const revealPoint = 150; // Adjust as needed

      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('in-view');
      }
    });
  }

  window.addEventListener('scroll', revealElements);
  window.addEventListener('load', revealElements); // To reveal elements that are already in the viewport on load

});
