document.addEventListener("DOMContentLoaded", function () {

  /* ============================================================
     MENU MOBILE
     ============================================================ */

  var menuToggle = document.querySelector("[data-menu-toggle]");
  var sidebar = document.querySelector("[data-sidebar]");
  var overlay = document.querySelector("[data-overlay]");

  if (menuToggle && sidebar && overlay) {
    function closeMenu() {
      sidebar.classList.remove("is-open");
      overlay.classList.remove("is-visible");
      menuToggle.setAttribute("aria-expanded", "false");
    }

    menuToggle.addEventListener("click", function () {
      var isOpen = sidebar.classList.toggle("is-open");
      overlay.classList.toggle("is-visible", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    overlay.addEventListener("click", closeMenu);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
    sidebar.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  /* ============================================================
     MODO ESCURO (aplicar tema salvo)
     ============================================================ */

  var temaSalvo = localStorage.getItem("tema");
  if (temaSalvo === "escuro") {
    document.documentElement.classList.add("dark");
  }

  function alternarTema() {
    document.documentElement.classList.toggle("dark");
    var isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("tema", isDark ? "escuro" : "claro");
  }

  /* ============================================================
     DROPDOWN DO USUARIO
     ============================================================ */

  var userMenus = document.querySelectorAll("[data-user-menu]");
  userMenus.forEach(function (menu) {
    var dropdown = menu.querySelector(".user-dropdown");
    if (!dropdown) return;

    menu.addEventListener("click", function (event) {
      event.stopPropagation();
      menu.classList.toggle("is-open");
    });

    dropdown.querySelectorAll("button").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.stopPropagation();
        var action = button.getAttribute("data-action");

        if (action === "theme") {
          alternarTema();
        } else if (action === "logout") {
          window.location.href = "/login";
        }

        menu.classList.remove("is-open");
      });
    });
  });

  document.addEventListener("click", function () {
    userMenus.forEach(function (menu) {
      menu.classList.remove("is-open");
    });
  });

  /* ============================================================
     LOGIN
     ============================================================ */

  var loginForm = document.querySelector(".login-form-content form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      // Login simulado - redireciona para o dashboard
      window.location.href = "/";
    });
  }

  /* ============================================================
     MASCARAS DE TELEFONE E CPF
     ============================================================ */

  function aplicarMascaraTelefone(valor) {
    var numeros = valor.replace(/\D/g, "").substring(0, 11);
    if (numeros.length <= 2) return numeros;
    if (numeros.length <= 7) return "(" + numeros.substring(0, 2) + ") " + numeros.substring(2);
    return "(" + numeros.substring(0, 2) + ") " + numeros.substring(2, 7) + "-" + numeros.substring(7);
  }

  function aplicarMascaraCpf(valor) {
    var numeros = valor.replace(/\D/g, "").substring(0, 11);
    if (numeros.length <= 3) return numeros;
    if (numeros.length <= 6) return numeros.substring(0, 3) + "." + numeros.substring(3);
    if (numeros.length <= 9) return numeros.substring(0, 3) + "." + numeros.substring(3, 6) + "." + numeros.substring(6);
    return numeros.substring(0, 3) + "." + numeros.substring(3, 6) + "." + numeros.substring(6, 9) + "-" + numeros.substring(9);
  }

  var campoTelefone = document.getElementById("telefone");
  if (campoTelefone) {
    campoTelefone.addEventListener("input", function () {
      this.value = aplicarMascaraTelefone(this.value);
    });
    if (campoTelefone.value) campoTelefone.value = aplicarMascaraTelefone(campoTelefone.value);
  }

  var campoCpf = document.getElementById("cpf");
  if (campoCpf) {
    campoCpf.addEventListener("input", function () {
      this.value = aplicarMascaraCpf(this.value);
    });
    if (campoCpf.value) campoCpf.value = aplicarMascaraCpf(campoCpf.value);
  }

  /* ============================================================
     TOGGLE SITUACAO DO MORADOR
     ============================================================ */

  var statusSelects = document.querySelectorAll("[data-toggle-situacao]");
  statusSelects.forEach(function (select) {
    select.style.cursor = "pointer";
    select.addEventListener("change", function () {
      var moradorId = this.getAttribute("data-toggle-situacao");
      var novaSituacao = this.value;

      var self = this;
      fetch("/moradores/" + moradorId + "/situacao", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "situacao=" + encodeURIComponent(novaSituacao)
      }).then(function (response) {
        if (response.ok) {
          self.classList.remove("status-success", "status-warning", "status-neutral");
          self.classList.add(novaSituacao === "Ativo" ? "status-success" : "status-warning");
        }
      });
    });
  });

  /* ============================================================
     TOGGLE STATUS DA OCORRENCIA
     ============================================================ */

  var ocorrenciaStatusSelects = document.querySelectorAll("[data-toggle-status-ocorrencia]");
  ocorrenciaStatusSelects.forEach(function (select) {
    select.style.cursor = "pointer";
    select.addEventListener("change", function () {
      var ocorrenciaId = this.getAttribute("data-toggle-status-ocorrencia");
      var novoStatus = this.value;

      var self = this;
      fetch("/ocorrencias/" + ocorrenciaId + "/status", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "status=" + encodeURIComponent(novoStatus)
      }).then(function (response) {
        if (response.ok) {
          self.classList.remove("status-success", "status-warning", "status-neutral");
          if (novoStatus === "Em andamento") {
            self.classList.add("status-success");
          } else if (novoStatus === "Em analise") {
            self.classList.add("status-warning");
          } else {
            self.classList.add("status-neutral");
          }
        }
      });
    });
  });

  /* ============================================================
     TOGGLE STATUS DA RESERVA
     ============================================================ */

  var reservaStatusSelects = document.querySelectorAll("[data-toggle-status-reserva]");
  reservaStatusSelects.forEach(function (select) {
    select.style.cursor = "pointer";
    select.addEventListener("change", function () {
      var reservaId = this.getAttribute("data-toggle-status-reserva");
      var novoStatus = this.value;

      var self = this;
      fetch("/reservas/" + reservaId + "/status", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "status=" + encodeURIComponent(novoStatus)
      }).then(function (response) {
        if (response.ok) {
          self.classList.remove("status-success", "status-warning");
          self.classList.add(novoStatus === "Confirmada" ? "status-success" : "status-warning");
        }
      });
    });
  });

});
