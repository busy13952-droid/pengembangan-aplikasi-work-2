/* =====================================================
   SCRIPT.JS
   JavaScript sederhana untuk website AyoSholat
===================================================== */

/* Menunggu seluruh isi halaman selesai dimuat */
document.addEventListener("DOMContentLoaded", function () {
  setupMobileMenu();
  setupSmoothScroll();
  setupScrollAnimation();
  setupImageFallback();
  setupActiveNavbar();
  setupLearningPage();
});

/* ================= MENU HAMBURGER MOBILE ================= */

function setupMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener("click", function () {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  /* Menutup menu ketika salah satu link diklik */
  const navLinks = navMenu.querySelectorAll("a");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

/* ================= SMOOTH SCROLL NAVBAR ================= */

function setupSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");

      /* Jika href hanya "#", jangan lakukan scroll */
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        event.preventDefault();

        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
}

/* ================= ANIMASI SAAT SCROLL ================= */

function setupScrollAnimation() {
  const revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach(function (element) {
    observer.observe(element);
  });
}

/* ================= FALLBACK JIKA GAMBAR ERROR ================= */

function setupImageFallback() {
  const images = document.querySelectorAll("img");

  images.forEach(function (image) {
    image.addEventListener("error", function () {
      const fallback = document.createElement("div");
      fallback.className = "image-fallback";
      fallback.textContent = "Gambar belum ditambahkan";

      image.replaceWith(fallback);
    });
  });
}

/* ================= ACTIVE LINK NAVBAR ================= */

function setupActiveNavbar() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (sections.length === 0 || navLinks.length === 0) return;

  window.addEventListener("scroll", function () {
    let currentSection = "";

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;

      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active");
      }
    });
  });
}

/* ================= HALAMAN BELAJAR ================= */

function setupLearningPage() {
  const chapterButtons = document.querySelectorAll(".chapter-button");
  const chapterContents = document.querySelectorAll(".chapter-content");

  if (chapterButtons.length === 0 || chapterContents.length === 0) return;

  chapterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const targetChapter = button.getAttribute("data-chapter");

      /* Menghapus status aktif dari semua tombol */
      chapterButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      /* Menyembunyikan semua konten bab */
      chapterContents.forEach(function (content) {
        content.style.display = "none";
      });

      /* Mengaktifkan tombol yang diklik */
      button.classList.add("active");

      /* Menampilkan konten bab yang sesuai */
      const selectedContent = document.getElementById(targetChapter);

      if (selectedContent) {
        selectedContent.style.display = "block";
      }
    });
  });
}