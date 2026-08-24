document.addEventListener("DOMContentLoaded", function () {

  /* ============================================================
     SESSAO E LOGIN
     ============================================================ */

  function obterSessao() {
    var dados = sessionStorage.getItem("usuarioLogado");
    return dados ? JSON.parse(dados) : null;
  }

  function salvarSessao(usuario) {
    sessionStorage.setItem("usuarioLogado", JSON.stringify(usuario));
  }

  function encerrarSessao() {
    sessionStorage.removeItem("usuarioLogado");
  }

  function redirecionarLogin() {
    window.location.href = "login.html";
  }

  function obterCondominio() {
    var sessao = obterSessao();
    if (!sessao) return null;
    return CONDOMINIOS[sessao.condominio] || null;
  }

  /* ---- Login ---- */
  var loginForm = document.querySelector(".login-form-content form");
  if (loginForm) {
    if (obterSessao()) {
      redirecionarLogin();
      return;
    }

    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var email = document.getElementById("email").value.trim();
      var senha = document.getElementById("password").value;
      var erro  = document.getElementById("login-erro");

      var usuario = USUARIOS.find(function (u) {
        return u.email === email && u.senha === senha;
      });

      if (usuario) {
        erro.hidden = true;
        salvarSessao({ nome: usuario.nome, email: usuario.email, condominio: usuario.condominio });
        window.location.href = "index.html";
      } else {
        erro.hidden = false;
      }
    });
    return;
  }

  /* ---- Protecao de paginas ---- */
  var sessao = obterSessao();
  if (!sessao) {
    redirecionarLogin();
    return;
  }

  var condominio = CONDOMINIOS[sessao.condominio];
  if (!condominio) {
    redirecionarLogin();
    return;
  }

  /* ============================================================
     BARRA DE USUARIO (topbar)
     ============================================================ */

  var iniciais = sessao.nome.split(" ").map(function (p) { return p[0]; }).join("").toUpperCase().substring(0, 2);
  var userSummaryEls = document.querySelectorAll(".user-summary");
  userSummaryEls.forEach(function (el) {
    var avatar = el.querySelector(".avatar");
    var name   = el.querySelector(".user-name");
    var role   = el.querySelector(".user-role");
    if (avatar) avatar.textContent = iniciais;
    if (name)   name.textContent   = sessao.nome;
    if (role)   role.textContent   = "Sindico";
  });

  var saudacaoEl = document.querySelector("h1");
  if (saudacaoEl && saudacaoEl.textContent.indexOf("Bom") === 0) {
    var primeiroNome = sessao.nome.split(" ")[0];
    var hora = new Date().getHours();
    var cumprimento = hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite";
    saudacaoEl.textContent = cumprimento + ", " + primeiroNome + ".";
  }

  /* ============================================================
     MENU MOBILE
     ============================================================ */

  var menuToggle = document.querySelector("[data-menu-toggle]");
  var sidebar    = document.querySelector("[data-sidebar]");
  var overlay    = document.querySelector("[data-overlay]");

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
    var btn = menu.querySelector(".avatar");
    var dropdown = menu.querySelector(".user-dropdown");
    if (!btn || !dropdown) return;

    btn.addEventListener("click", function (event) {
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
          encerrarSessao();
          redirecionarLogin();
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
     IDENTIFICACAO DA PAGINA
     ============================================================ */

  var path = window.location.pathname;
  var pagina = "";
  if (path.indexOf("moradores.html") !== -1)     pagina = "moradores";
  else if (path.indexOf("unidades.html") !== -1)  pagina = "unidades";
  else if (path.indexOf("ocorrencias.html") !== -1) pagina = "ocorrencias";
  else if (path.indexOf("reservas.html") !== -1)  pagina = "reservas";
  else if (path.indexOf("morador.html") !== -1)   pagina = "morador";
  else if (path.indexOf("index.html") !== -1 || path.endsWith("/") || path.endsWith("\\") || path.indexOf("index") === -1 && pagina === "") {
    pagina = "dashboard";
  }

  /* ============================================================
     DASHBOARD
     ============================================================ */

  if (pagina === "dashboard") {
    var dashboardGrid = document.querySelector(".grid-4");
    if (dashboardGrid) {
      var ocupadas = condominio.unidades.filter(function (u) { return u.situacao === "Ocupada"; }).length;
      var total    = condominio.totalUnidades;
      var pct      = Math.round((ocupadas / total) * 1000) / 10;
      var abertas  = condominio.ocorrencias.filter(function (o) { return o.status !== "Concluida"; }).length;
      var hoje     = condominio.reservas.length;

      var stats = dashboardGrid.querySelectorAll(".stat-card");
      if (stats[0]) { stats[0].querySelector(".stat-value").textContent = condominio.moradores.length; }
      if (stats[1]) { stats[1].querySelector(".stat-value").textContent = ocupadas + "/" + total; stats[1].querySelector(".stat-detail").textContent = pct + "% de ocupacao"; }
      if (stats[2]) { stats[2].querySelector(".stat-value").textContent = String(abertas).padStart(2, "0"); }
      if (stats[3]) { stats[3].querySelector(".stat-value").textContent = String(hoje).padStart(2, "0"); }
    }

    /* Atividade recente */
    var listaAtividade = document.querySelector(".grid-2 .list");
    if (listaAtividade) {
      listaAtividade.innerHTML = "";
      condominio.atividadeRecente.forEach(function (item) {
        var li = document.createElement("li");
        li.className = "list-item";
        li.innerHTML =
          '<div><strong>' + item.tipo + '</strong><p>' + item.descricao + '</p></div>' +
          '<span class="status status-' + item.statusClasse + '">' + item.status + '</span>';
        listaAtividade.appendChild(li);
      });
    }

    /* Ocupacao */
    var progressValue = document.querySelector(".progress-value");
    if (progressValue) {
      var ocupadasD = condominio.unidades.filter(function (u) { return u.situacao === "Ocupada"; }).length;
      var totalD    = condominio.totalUnidades;
      var pctD      = Math.round((ocupadasD / totalD) * 1000) / 10;
      progressValue.style.width = pctD + "%";
    }

    var progressCaption = document.querySelector(".progress-caption strong");
    if (progressCaption) {
      var ocupadasC = condominio.unidades.filter(function (u) { return u.situacao === "Ocupada"; }).length;
      progressCaption.textContent = ocupadasC + " de " + condominio.totalUnidades;
    }
  }

  /* ============================================================
     MORADORES
     ============================================================ */

  if (pagina === "moradores") {
    var moradoresTbody = document.querySelector(".data-table tbody");
    if (moradoresTbody) {
      moradoresTbody.innerHTML = "";
      condominio.moradores.forEach(function (m) {
        var statusClasse = m.situacao === "Ativo" ? "success" : "neutral";
        var tr = document.createElement("tr");
        tr.innerHTML =
          '<td class="person-cell"><strong>' + m.nome + '</strong><span>' + m.email + '</span></td>' +
          '<td>' + m.unidade + '</td>' +
          '<td>' + m.telefone + '</td>' +
          '<td><span class="status status-' + statusClasse + '">' + m.situacao + '</span></td>' +
          '<td><a class="button button-secondary button-small" href="morador.html?id=' + m.id + '">Ver detalhes</a></td>';
        moradoresTbody.appendChild(tr);
      });

      /* Filtros */
      var searchInput  = document.getElementById("search-residents");
      var statusSelect = document.getElementById("resident-status");
      var filterBtn    = document.querySelector(".filter-bar .button-secondary");

      function filtrarMoradores() {
        var busca = searchInput ? searchInput.value.toLowerCase() : "";
        var sit   = statusSelect ? statusSelect.value : "Todos";
        var linhas = moradoresTbody.querySelectorAll("tr");
        var idx = 0;
        condominio.moradores.forEach(function (m) {
          var combinaBusca = !busca || m.nome.toLowerCase().indexOf(busca) !== -1 || m.unidade.toLowerCase().indexOf(busca) !== -1;
          var combinaSit   = sit === "Todos" || m.situacao === sit;
          if (linhas[idx]) {
            linhas[idx].style.display = (combinaBusca && combinaSit) ? "" : "none";
          }
          idx++;
        });
      }

      if (searchInput)  searchInput.addEventListener("input", filtrarMoradores);
      if (statusSelect) statusSelect.addEventListener("change", filtrarMoradores);
      if (filterBtn)    filterBtn.addEventListener("click", filtrarMoradores);
    }
  }

  /* ============================================================
     UNIDADES
     ============================================================ */

  if (pagina === "unidades") {
    var unidadesTbody = document.querySelector(".data-table tbody");
    if (unidadesTbody) {
      unidadesTbody.innerHTML = "";
      condominio.unidades.forEach(function (u) {
        var statusClasse = u.situacao === "Ocupada" ? "success" : "warning";
        var tr = document.createElement("tr");
        tr.innerHTML =
          '<td class="item-cell"><strong>Bloco ' + u.bloco + ', ' + u.numero + '</strong><span>' + u.andar + '</span></td>' +
          '<td>' + (u.responsavel || "-") + '</td>' +
          '<td>' + String(u.moradores).padStart(2, "0") + '</td>' +
          '<td><span class="status status-' + statusClasse + '">' + u.situacao + '</span></td>' +
          '<td>' + u.garagem + '</td>';
        unidadesTbody.appendChild(tr);
      });

      /* Stats */
      var ocupadas = condominio.unidades.filter(function (u) { return u.situacao === "Ocupada"; }).length;
      var stats = document.querySelectorAll(".grid-3 .stat-card");
      if (stats[0]) stats[0].querySelector(".stat-value").textContent = String(condominio.totalUnidades);
      if (stats[1]) { stats[1].querySelector(".stat-value").textContent = String(ocupadas); stats[1].querySelector(".stat-detail").textContent = Math.round((ocupadas / condominio.totalUnidades) * 1000) / 10 + "% do total"; }
      if (stats[2]) stats[2].querySelector(".stat-value").textContent = String(condominio.totalUnidades - ocupadas);

      /* Filtros */
      var blockSelect    = document.getElementById("unit-block");
      var occupancySelect = document.getElementById("unit-occupancy");
      var filterBtnU     = document.querySelector(".filter-bar .button-secondary");

      function filtrarUnidades() {
        var bloco = blockSelect ? blockSelect.value : "Todos os blocos";
        var ocu   = occupancySelect ? occupancySelect.value : "Todas";
        var linhas = unidadesTbody.querySelectorAll("tr");
        var idx = 0;
        condominio.unidades.forEach(function (u) {
          var combinaBloco = bloco === "Todos os blocos" || u.bloco === bloco;
          var combinaOcu   = ocu === "Todas" || u.situacao === ocu;
          if (linhas[idx]) {
            linhas[idx].style.display = (combinaBloco && combinaOcu) ? "" : "none";
          }
          idx++;
        });
      }

      if (blockSelect)    blockSelect.addEventListener("change", filtrarUnidades);
      if (occupancySelect) occupancySelect.addEventListener("change", filtrarUnidades);
      if (filterBtnU)     filterBtnU.addEventListener("click", filtrarUnidades);
    }
  }

  /* ============================================================
     OCORRENCIAS
     ============================================================ */

  if (pagina === "ocorrencias") {
    var ocorrenciasTbody = document.querySelector(".data-table tbody");
    if (ocorrenciasTbody) {
      ocorrenciasTbody.innerHTML = "";
      condominio.ocorrencias.forEach(function (o) {
        var statusMap = { "Em analise": "warning", "Em andamento": "success", "Concluida": "neutral" };
        var tr = document.createElement("tr");
        tr.innerHTML =
          '<td class="item-cell"><strong>' + o.titulo + '</strong><span>Registro #' + String(o.id).padStart(3, "0") + '</span></td>' +
          '<td>' + o.local + '</td>' +
          '<td>' + o.data + '</td>' +
          '<td>' + o.responsavel + '</td>' +
          '<td><span class="status status-' + (statusMap[o.status] || "neutral") + '">' + o.status + '</span></td>';
        ocorrenciasTbody.appendChild(tr);
      });

      /* Filtros */
      var statusFilterO = document.getElementById("occurrence-status");
      var searchInputO  = document.getElementById("occurrence-search");
      var filterBtnO    = document.querySelector(".filter-bar .button-secondary");

      function filtrarOcorrencias() {
        var sit   = statusFilterO ? statusFilterO.value : "Todos os status";
        var busca = searchInputO ? searchInputO.value.toLowerCase() : "";
        var linhas = ocorrenciasTbody.querySelectorAll("tr");
        var idx = 0;
        condominio.ocorrencias.forEach(function (o) {
          var combinaSit   = sit === "Todos os status" || o.status === sit;
          var combinaBusca = !busca || o.titulo.toLowerCase().indexOf(busca) !== -1 || o.local.toLowerCase().indexOf(busca) !== -1;
          if (linhas[idx]) {
            linhas[idx].style.display = (combinaSit && combinaBusca) ? "" : "none";
          }
          idx++;
        });
      }

      if (statusFilterO) statusFilterO.addEventListener("change", filtrarOcorrencias);
      if (searchInputO)  searchInputO.addEventListener("input", filtrarOcorrencias);
      if (filterBtnO)    filterBtnO.addEventListener("click", filtrarOcorrencias);
    }
  }

  /* ============================================================
     RESERVAS
     ============================================================ */

  if (pagina === "reservas") {
    var reservasTbody = document.querySelector(".data-table tbody");
    if (reservasTbody) {
      reservasTbody.innerHTML = "";
      condominio.reservas.forEach(function (r) {
        var statusClasse = r.status === "Confirmada" ? "success" : "warning";
        var tr = document.createElement("tr");
        tr.innerHTML =
          '<td class="item-cell"><strong>' + r.area + '</strong><span>' + r.areaInfo + '</span></td>' +
          '<td>' + r.solicitante + '</td>' +
          '<td>' + r.data + '<br />' + r.horario + '</td>' +
          '<td>' + r.finalidade + '</td>' +
          '<td><span class="status status-' + statusClasse + '">' + r.status + '</span></td>';
        reservasTbody.appendChild(tr);
      });

      /* Stats */
      var stats = document.querySelectorAll(".grid-3 .stat-card");
      if (stats[0]) stats[0].querySelector(".stat-value").textContent = String(condominio.reservas.length).padStart(2, "0");
      if (stats[2]) stats[2].querySelector(".stat-value").textContent = String(condominio.areasComuns.length).padStart(2, "0");

      /* Filtros */
      var areaSelect  = document.getElementById("reservation-area");
      var dateInput   = document.getElementById("reservation-date");
      var filterBtnR  = document.querySelector(".filter-bar .button-secondary");

      function filtrarReservas() {
        var area  = areaSelect ? areaSelect.value : "Todas as areas";
        var busca = dateInput ? dateInput.value : "";
        var linhas = reservasTbody.querySelectorAll("tr");
        var idx = 0;
        condominio.reservas.forEach(function (r) {
          var combinaArea = area === "Todas as areas" || r.area === area;
          var combinaData = !busca || r.data === busca;
          if (linhas[idx]) {
            linhas[idx].style.display = (combinaArea && combinaData) ? "" : "none";
          }
          idx++;
        });
      }

      if (areaSelect) areaSelect.addEventListener("change", filtrarReservas);
      if (dateInput)  dateInput.addEventListener("input", filtrarReservas);
      if (filterBtnR) filterBtnR.addEventListener("click", filtrarReservas);
    }
  }

  /* ============================================================
     DETALHE DO MORADOR
     ============================================================ */

  if (pagina === "morador") {
    var params    = new URLSearchParams(window.location.search);
    var moradorId = parseInt(params.get("id"), 10);
    var morador   = null;

    if (moradorId) {
      morador = condominio.moradores.find(function (m) { return m.id === moradorId; });
    }

    var tituloEl = document.querySelector(".page-header h1");
    if (!morador) {
      if (tituloEl) tituloEl.textContent = "Morador nao encontrado";
      return;
    }

    if (tituloEl) tituloEl.textContent = morador.nome;

    /* Preencher dados pessoais */
    var infoGrids = document.querySelectorAll(".info-grid");
    if (infoGrids[0]) {
      var items = infoGrids[0].querySelectorAll(".info-item");
      var campos = [
        { dt: "Nome completo", dd: morador.nome },
        { dt: "CPF", dd: morador.cpf },
        { dt: "E-mail", dd: morador.email },
        { dt: "Telefone", dd: morador.telefone },
        { dt: "Tipo de morador", dd: morador.tipo },
        { dt: "Cadastro realizado", dd: morador.dataCadastro }
      ];
      items.forEach(function (item, i) {
        if (campos[i]) {
          item.querySelector("dt").textContent = campos[i].dt;
          item.querySelector("dd").textContent = campos[i].dd;
        }
      });
    }

    /* Status */
    var statusBadge = document.querySelector(".card-header .status");
    if (statusBadge) {
      statusBadge.textContent = morador.situacao;
      statusBadge.className = "status status-" + (morador.situacao === "Ativo" ? "success" : "neutral");
    }

    /* Unidade vinculada */
    if (infoGrids[1]) {
      var items = infoGrids[1].querySelectorAll(".info-item");
      var campos = [
        { dt: "Condominio", dd: condominio.nome },
        { dt: "Bloco e unidade", dd: "Bloco " + morador.bloco + ", apartamento " + morador.numero },
        { dt: "Vagas de garagem", dd: morador.vagasGaragem },
        { dt: "Moradores na unidade", dd: String(morador.moradoresUnidade) + " pessoa" + (morador.moradoresUnidade !== 1 ? "s" : "") }
      ];
      items.forEach(function (item, i) {
        if (campos[i]) {
          item.querySelector("dt").textContent = campos[i].dt;
          item.querySelector("dd").textContent = campos[i].dd;
        }
      });
    }

    /* Historico recente */
    var historico = document.querySelector(".card:last-child .list");
    if (historico) {
      historico.innerHTML = "";
      var registros = condominio.reservas.filter(function (r) {
        return r.solicitante.indexOf(morador.nome) !== -1;
      });
      registros.forEach(function (r) {
        var li = document.createElement("li");
        li.className = "list-item";
        li.innerHTML =
          '<div><strong>Reserva de ' + r.area.toLowerCase() + '</strong><p>Solicitada para ' + r.data + '</p></div>' +
          '<span class="status status-' + (r.status === "Confirmada" ? "success" : "warning") + '">' + r.status + '</span>';
        historico.appendChild(li);
      });
      if (registros.length === 0) {
        historico.innerHTML = '<li class="list-item"><div><p>Nenhum registro recente.</p></div></li>';
      }
    }
  }

  /* ============================================================
     BOTAO SAIR
     ============================================================ */

  var logoutBtn = document.querySelector("[data-logout]");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      encerrarSessao();
      redirecionarLogin();
    });
  }

});
