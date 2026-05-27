//
document.addEventListener("DOMContentLoaded", function () {
  //Scroll suave quando clica no item da nav bar
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      const headerHeight = document.querySelector(".header").offsetHeight;

      const scrollToTarget = () => {
        const targetPosition = targetSection.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      };

      const img = targetSection.querySelector("img");
      if (img && !img.complete) {
        img.addEventListener("load", scrollToTarget, { once: true });
      } else {
        scrollToTarget();
      }

      document.querySelector(".nav").classList.remove("active");
    });
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Menu mobile toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const nav = document.querySelector(".nav");

  mobileMenuToggle.addEventListener("click", function () {
    nav.classList.toggle("active");
  });

  document.addEventListener("click", function (e) {
    if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      nav.classList.remove("active");
    }
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Botão "Agende sua consulta" - scroll para contato
  const btnAgendar = document.querySelector(".btn-agendar");

  if (btnAgendar) {
    btnAgendar.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Animação de entrada dos cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });

  const textContent = document.querySelector(".text-content");
  if (textContent) {
    textContent.style.opacity = "0";
    textContent.style.transform = "translateX(-30px)";
    textContent.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    observer.observe(textContent);
  }

  const imageContainer = document.querySelector(".image-container");
  if (imageContainer) {
    imageContainer.style.opacity = "0";
    imageContainer.style.transform = "translateX(30px)";
    imageContainer.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    observer.observe(imageContainer);
  }

  const btn = document.getElementById("floatingBtn");
  const footer = document.querySelector("footer");
  const logo = document.querySelector(".logo");

  function updateButtonPosition() {
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const footerTop = footer.getBoundingClientRect().top + scrollY;
    const distanceFromBottom = scrollY + windowHeight - footerTop;

    const isMobile = window.innerWidth <= 768;

    if (scrollY > 300) {
      btn.classList.add("show");
      if (isMobile) logo.classList.add("scrolled");
    } else {
      btn.classList.remove("show");
      logo.classList.remove("scrolled");
    }

    if (distanceFromBottom > 0) {
      btn.style.position = "absolute";
      btn.style.bottom = `${footer.offsetHeight + 10}px`;
    } else {
      btn.style.position = "fixed";
      btn.style.bottom = "2rem";
    }
  }

  window.addEventListener("scroll", updateButtonPosition);
  window.addEventListener("resize", updateButtonPosition);
  updateButtonPosition();

  //header com efeito glass
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Dropdown da navbar -- do Claude
  const dropdownItem = document.querySelector(".has-dropdown");
  const dropdownToggle = document.querySelector(".dropdown-toggle");

  if (dropdownToggle) {
    dropdownToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = dropdownItem.classList.toggle("active");
      this.setAttribute("aria-expanded", isOpen);
    });

    // fundo opaco na navbar
    //document.querySelector(".header").classList.toggle("dropdown-open", isOpen);

    document.addEventListener("click", function () {
      dropdownItem.classList.remove("active");
      dropdownToggle.setAttribute("aria-expanded", "false");
    });

    document.querySelector(".dropdown").addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }
});
