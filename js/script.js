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
  else if (path.indexOf("registrar-ocorrencia.html") !== -1) pagina = "registrar-ocorrencia";
  else if (path.indexOf("ocorrencias.html") !== -1) pagina = "ocorrencias";
  else if (path.indexOf("nova-reserva.html") !== -1) pagina = "nova-reserva";
  else if (path.indexOf("reservas.html") !== -1)  pagina = "reservas";
  else if (path.indexOf("cadastro-morador.html") !== -1) pagina = "cadastro-morador";
  else if (path.indexOf("editar-morador.html") !== -1) pagina = "editar-morador";
  else if (path.indexOf("morador.html") !== -1)   pagina = "morador";
  else if (path.indexOf("index.html") !== -1 || path.endsWith("/") || path.endsWith("\\") || path.indexOf("index") === -1 && pagina === "") {
    pagina = "dashboard";
  }

  /* ============================================================
     INICIALIZAR DADOS DEMO NO SESSIONSTORAGE
     ============================================================ */

  function iniciarDadosDemo() {
    var chaveCad = "novosMoradores_" + sessao.condominio;
    var existentes = [];
    try { existentes = JSON.parse(sessionStorage.getItem(chaveCad)) || []; } catch (e) { existentes = []; }

    if (existentes.length > 0) return;

    var demo = condominio.moradores.map(function (m) {
      return Object.assign({}, m);
    });
    sessionStorage.setItem(chaveCad, JSON.stringify(demo));
  }

  iniciarDadosDemo();

  /* ============================================================
     BUSCAR MORADOR POR ID (edições > cadastrados)
     ============================================================ */

  function buscarMorador(id) {
    var chaveEdicoes = "edicoesMoradores_" + sessao.condominio;
    var edicoes = [];
    try { edicoes = JSON.parse(sessionStorage.getItem(chaveEdicoes)) || []; } catch (e) { edicoes = []; }
    var editado = edicoes.find(function (m) { return m.id === id; });
    if (editado) return editado;

    var chaveCad = "novosMoradores_" + sessao.condominio;
    var cadastrados = [];
    try { cadastrados = JSON.parse(sessionStorage.getItem(chaveCad)) || []; } catch (e) { cadastrados = []; }
    return cadastrados.find(function (m) { return m.id === id; }) || null;
  }

  /* ============================================================
     OBTER TODOS OS MORADORES (cadastrados + edições)
     ============================================================ */

  function obterTodosMoradores() {
    var chaveCad = "novosMoradores_" + sessao.condominio;
    var lista = [];
    try { lista = JSON.parse(sessionStorage.getItem(chaveCad)) || []; } catch (e) { lista = []; }
    lista = lista.map(function (m) { return Object.assign({}, m); });

    var chaveEd = "edicoesMoradores_" + sessao.condominio;
    var edicoes = [];
    try { edicoes = JSON.parse(sessionStorage.getItem(chaveEd)) || []; } catch (e) { edicoes = []; }
    edicoes.forEach(function (editado) {
      for (var i = 0; i < lista.length; i++) {
        if (lista[i].id === editado.id) {
          lista[i] = Object.assign({}, editado);
          break;
        }
      }
    });

    return lista;
  }

  /* ============================================================
     DASHBOARD
     ============================================================ */

  if (pagina === "dashboard") {
    var dashboardGrid = document.querySelector(".grid-4");
    if (dashboardGrid) {
      var todosMoradores = obterTodosMoradores();
      var unidades      = condominio.unidades;
      var totalU        = unidades.length;

      /* Contar ocupadas: demo + moradores cadastrados/edicados */
      var ocupadasDemo = unidades.filter(function (u) { return u.situacao === "Ocupada"; }).length;
      var chavesOcupadas = {};
      unidades.forEach(function (u) {
        if (u.situacao === "Ocupada") chavesOcupadas[u.bloco + "_" + u.numero] = true;
      });
      var extras = 0;
      todosMoradores.forEach(function (m) {
        var chave = m.bloco + "_" + m.numero;
        if (!chavesOcupadas[chave]) {
          chavesOcupadas[chave] = true;
          extras++;
        }
      });
      var ocupadas = ocupadasDemo + extras;
      var pct      = Math.round((ocupadas / totalU) * 1000) / 10;
      var abertas  = condominio.ocorrencias.filter(function (o) { return o.status !== "Concluida"; }).length;

      var chaveNovasOc = "novasOcorrencias_" + sessao.condominio;
      var novasOcorrencias = [];
      try { novasOcorrencias = JSON.parse(sessionStorage.getItem(chaveNovasOc)) || []; } catch (e) { novasOcorrencias = []; }
      abertas += novasOcorrencias.filter(function (o) { return o.status !== "Concluida"; }).length;
      var reservasHoje = condominio.reservas.length;

      var stats = dashboardGrid.querySelectorAll(".stat-card");
      if (stats[0]) { stats[0].querySelector(".stat-value").textContent = todosMoradores.length; }
      if (stats[1]) { stats[1].querySelector(".stat-value").textContent = ocupadas + "/" + totalU; stats[1].querySelector(".stat-detail").textContent = pct + "% de ocupacao"; }
      if (stats[2]) { stats[2].querySelector(".stat-value").textContent = String(abertas).padStart(2, "0"); }
      if (stats[3]) { stats[3].querySelector(".stat-value").textContent = String(reservasHoje).padStart(2, "0"); }
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

    /* Ocupacao - barra de progresso */
    var progressValue = document.querySelector(".progress-value");
    var progressCaption = document.querySelector(".progress-caption strong");
    if (progressValue) progressValue.style.width = pct + "%";
    if (progressCaption) progressCaption.textContent = ocupadas + " de " + totalU;

    /* Ocupacao - por bloco */
    var progressSummary = document.querySelector(".progress-summary");
    if (progressSummary && condominio.blocos) {
      progressSummary.innerHTML = "";
      condominio.blocos.forEach(function (bloco) {
        var unidadesBloco = unidades.filter(function (u) { return u.bloco === bloco; });
        var ocuBloco = 0;
        unidadesBloco.forEach(function (u) {
          if (chavesOcupadas[u.bloco + "_" + u.numero]) ocuBloco++;
        });
        var div = document.createElement("div");
        div.innerHTML = '<p class="stat-label">Bloco ' + bloco + '</p><strong>' + ocuBloco + ' de ' + unidadesBloco.length + '</strong>';
        progressSummary.appendChild(div);
      });
    }
  }

  /* ============================================================
     MORADORES
     ============================================================ */

  if (pagina === "moradores") {
    var moradoresTbody = document.querySelector(".data-table tbody");
    if (moradoresTbody) {
      var todosMoradores = obterTodosMoradores();

      moradoresTbody.innerHTML = "";
      todosMoradores.forEach(function (m) {
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
        todosMoradores.forEach(function (m) {
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
      var todosMoradores = obterTodosMoradores();
      var unidades = condominio.unidades;

      console.log("Todos os moradores:", todosMoradores.length, todosMoradores);

      /* Cruzar unidades com moradores */
      var unidadesInfo = unidades.map(function (u) {
        var moradoresUnidade = todosMoradores.filter(function (m) {
          return m.bloco === u.bloco && m.numero === u.numero && m.situacao === "Ativo";
        });
        var nomes = moradoresUnidade.map(function (m) { return m.nome; });
        var qtd = moradoresUnidade.length;
        var situacao = qtd > 0 ? "Ocupada" : "Disponivel";
        return {
          bloco: u.bloco,
          numero: u.numero,
          andar: u.andar,
          garagem: u.garagem,
          responsaveis: nomes,
          qtdMoradores: qtd,
          situacao: situacao
        };
      });

      /* Renderizar tabela */
      unidadesTbody.innerHTML = "";
      unidadesInfo.forEach(function (u) {
        var statusClasse = u.situacao === "Ocupada" ? "success" : "warning";
        var responsavel = u.responsaveis.length > 0 ? u.responsaveis.join(", ") : "-";
        var tr = document.createElement("tr");
        tr.innerHTML =
          '<td class="item-cell"><strong>Bloco ' + u.bloco + ', ' + u.numero + '</strong><span>' + u.andar + '</span></td>' +
          '<td>' + responsavel + '</td>' +
          '<td>' + String(u.qtdMoradores).padStart(2, "0") + '</td>' +
          '<td><span class="status status-' + statusClasse + '">' + u.situacao + '</span></td>' +
          '<td>' + u.garagem + '</td>';
        unidadesTbody.appendChild(tr);
      });

      /* Stats */
      var ocupadas = unidadesInfo.filter(function (u) { return u.situacao === "Ocupada"; }).length;
      var totalU = unidadesInfo.length;
      var pct = Math.round((ocupadas / totalU) * 1000) / 10;
      var stats = document.querySelectorAll(".grid-3 .stat-card");
      if (stats[0]) stats[0].querySelector(".stat-value").textContent = String(totalU);
      if (stats[1]) { stats[1].querySelector(".stat-value").textContent = ocupadas + " de " + totalU; stats[1].querySelector(".stat-detail").textContent = pct + "% do total"; }
      if (stats[2]) stats[2].querySelector(".stat-value").textContent = String(totalU - ocupadas);

      /* Filtros */
      var blockSelect    = document.getElementById("unit-block");
      var occupancySelect = document.getElementById("unit-occupancy");
      var filterBtnU     = document.querySelector(".filter-bar .button-secondary");

      function filtrarUnidades() {
        var bloco = blockSelect ? blockSelect.value : "Todos os blocos";
        var ocu   = occupancySelect ? occupancySelect.value : "Todas";
        var linhas = unidadesTbody.querySelectorAll("tr");
        var idx = 0;
        unidadesInfo.forEach(function (u) {
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
      var chaveNovas = "novasOcorrencias_" + sessao.condominio;
      var novasOcorrencias = [];
      try { novasOcorrencias = JSON.parse(sessionStorage.getItem(chaveNovas)) || []; } catch (e) { novasOcorrencias = []; }

      var chaveOverrides = "statusOverrides_" + sessao.condominio;
      var overrides = {};
      try { overrides = JSON.parse(sessionStorage.getItem(chaveOverrides)) || {}; } catch (e) { overrides = {}; }

      var todasOcorrencias = condominio.ocorrencias.concat(novasOcorrencias);

      function aplicarOverrides(lista) {
        return lista.map(function (o) {
          var copia = Object.assign({}, o);
          if (overrides[copia.id] !== undefined) copia.status = overrides[copia.id];
          return copia;
        });
      }

      function salvarOverride(id, novoStatus) {
        overrides[id] = novoStatus;
        sessionStorage.setItem(chaveOverrides, JSON.stringify(overrides));
      }

      var statusMap = { "Em analise": "warning", "Em andamento": "success", "Concluida": "neutral" };

      function renderizarOcorrencias() {
        var lista = aplicarOverrides(todasOcorrencias);
        ocorrenciasTbody.innerHTML = "";
        lista.forEach(function (o) {
          var tr = document.createElement("tr");
          var statusClasse = statusMap[o.status] || "neutral";
          tr.innerHTML =
            '<td class="item-cell"><strong>' + o.titulo + '</strong><span>Registro #' + String(o.id).padStart(3, "0") + '</span></td>' +
            '<td>' + o.local + '</td>' +
            '<td>' + o.data + '</td>' +
            '<td>' + o.responsavel + '</td>' +
            '<td class="status-cell"><span class="status status-' + statusClasse + '" data-ocorrencia-id="' + o.id + '" style="cursor:pointer" title="Clique para alterar">' + o.status + '</span></td>';
          ocorrenciasTbody.appendChild(tr);
        });

        var stats = document.querySelectorAll(".grid-3 .stat-card");
        var total = lista.length;
        var emAndamento = lista.filter(function (o) { return o.status === "Em andamento"; }).length;
        var concluidas = lista.filter(function (o) { return o.status === "Concluida"; }).length;
        if (stats[0]) stats[0].querySelector(".stat-value").textContent = String(total).padStart(2, "0");
        if (stats[1]) stats[1].querySelector(".stat-value").textContent = String(emAndamento).padStart(2, "0");
        if (stats[2]) stats[2].querySelector(".stat-value").textContent = String(concluidas).padStart(2, "0");

        var spansStatus = ocorrenciasTbody.querySelectorAll(".status-cell .status");
        spansStatus.forEach(function (span) {
          span.addEventListener("click", function () {
            var ocId = parseInt(span.getAttribute("data-ocorrencia-id"));
            var oc = lista.find(function (o) { return o.id === ocId; });
            if (!oc) return;

            var select = document.createElement("select");
            select.className = "status-select";
            ["Em analise", "Em andamento", "Concluida"].forEach(function (opt) {
              var option = document.createElement("option");
              option.value = opt;
              option.textContent = opt;
              if (opt === oc.status) option.selected = true;
              select.appendChild(option);
            });

            span.replaceWith(select);
            select.focus();

            function salvar() {
              var novoStatus = select.value;
              salvarOverride(ocId, novoStatus);
              renderizarOcorrencias();
            }

            select.addEventListener("change", salvar);
            select.addEventListener("blur", salvar);
          });
        });
      }

      renderizarOcorrencias();

      /* Filtros */
      var statusFilterO = document.getElementById("occurrence-status");
      var searchInputO  = document.getElementById("occurrence-search");
      var filterBtnO    = document.querySelector(".filter-bar .button-secondary");

      function filtrarOcorrencias() {
        var sit   = statusFilterO ? statusFilterO.value : "Todos os status";
        var busca = searchInputO ? searchInputO.value.toLowerCase() : "";
        var linhas = ocorrenciasTbody.querySelectorAll("tr");
        var lista = aplicarOverrides(todasOcorrencias);
        var idx = 0;
        lista.forEach(function (o) {
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
     REGISTRAR OCORRENCIA
     ============================================================ */

  if (pagina === "registrar-ocorrencia") {
    var dataInput = document.getElementById("data");
    if (dataInput) {
      var hoje = new Date();
      var dia = String(hoje.getDate()).padStart(2, "0");
      var mes = String(hoje.getMonth() + 1).padStart(2, "0");
      var ano = hoje.getFullYear();
      dataInput.value = ano + "-" + mes + "-" + dia;
    }

    var form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        var chaveNovas = "novasOcorrencias_" + sessao.condominio;
        var novasOcorrencias = [];
        try { novasOcorrencias = JSON.parse(sessionStorage.getItem(chaveNovas)) || []; } catch (e2) { novasOcorrencias = []; }

        var todasOcorrencias = condominio.ocorrencias.concat(novasOcorrencias);
        var maxId = 0;
        todasOcorrencias.forEach(function (o) { if (o.id > maxId) maxId = o.id; });

        var dataValor = dataInput.value;
        var partes = dataValor.split("-");
        var dataFormatada = partes[2] + "/" + partes[1] + "/" + partes[0];

        var novaOcorrencia = {
          id: maxId + 1,
          titulo: document.getElementById("ocorrencia").value,
          local: document.getElementById("local").value,
          data: dataFormatada,
          responsavel: document.getElementById("responsavel").value,
          status: document.getElementById("status").value
        };

        novasOcorrencias.push(novaOcorrencia);
        sessionStorage.setItem(chaveNovas, JSON.stringify(novasOcorrencias));
        window.location.href = "ocorrencias.html";
      });
    }
  }

  /* ============================================================
     RESERVAS
     ============================================================ */

  if (pagina === "reservas") {
    var reservasTbody = document.querySelector(".data-table tbody");
    if (reservasTbody) {
      var chaveNovasR = "novasReservas_" + sessao.condominio;
      var novasReservas = [];
      try { novasReservas = JSON.parse(sessionStorage.getItem(chaveNovasR)) || []; } catch (e) { novasReservas = []; }

      var chaveOverridesR = "statusOverridesReservas_" + sessao.condominio;
      var overridesR = {};
      try { overridesR = JSON.parse(sessionStorage.getItem(chaveOverridesR)) || {}; } catch (e) { overridesR = {}; }

      var todasReservas = condominio.reservas.concat(novasReservas);

      function aplicarOverridesR(lista) {
        return lista.map(function (r, i) {
          var copia = Object.assign({}, r);
          copia._indice = i;
          if (overridesR[i] !== undefined) copia.status = overridesR[i];
          return copia;
        });
      }

      function salvarOverrideR(indice, novoStatus) {
        overridesR[indice] = novoStatus;
        sessionStorage.setItem(chaveOverridesR, JSON.stringify(overridesR));
      }

      function parseHorario(horarioStr) {
        var partes = horarioStr.split(" - ");
        if (partes.length !== 2) return null;
        var ini = partes[0].trim().split(":");
        var fim = partes[1].trim().split(":");
        return {
          iniMin: parseInt(ini[0], 10) * 60 + parseInt(ini[1], 10),
          fimMin: parseInt(fim[0], 10) * 60 + parseInt(fim[1], 10)
        };
      }

      function haConflito(area, data, horario, indiceAtual, lista) {
        var novoIntervalo = parseHorario(horario);
        if (!novoIntervalo) return false;

        for (var i = 0; i < lista.length; i++) {
          if (i === indiceAtual) continue;
          var r = lista[i];
          if (r.area !== area) continue;
          if (r.data !== data) continue;
          if (r.status !== "Confirmada") continue;

          var existente = parseHorario(r.horario);
          if (!existente) continue;

          if (novoIntervalo.iniMin < existente.fimMin && novoIntervalo.fimMin > existente.iniMin) {
            return true;
          }
        }
        return false;
      }

      function renderizarReservas() {
        var lista = aplicarOverridesR(todasReservas);
        reservasTbody.innerHTML = "";
        lista.forEach(function (r) {
          var statusClasse = r.status === "Confirmada" ? "success" : "warning";
          var tr = document.createElement("tr");
          var acoesHtml = "";
          if (r.status === "Aguardando") {
            acoesHtml = '<td><button class="button button-primary button-small btn-confirmar-reserva" data-indice="' + r._indice + '">Confirmar</button></td>';
          } else {
            acoesHtml = '<td></td>';
          }
          tr.innerHTML =
            '<td class="item-cell"><strong>' + r.area + '</strong><span>' + r.areaInfo + '</span></td>' +
            '<td>' + r.solicitante + '</td>' +
            '<td>' + r.data + '<br />' + r.horario + '</td>' +
            '<td>' + r.finalidade + '</td>' +
            '<td><span class="status status-' + statusClasse + '">' + r.status + '</span></td>' +
            acoesHtml;
          reservasTbody.appendChild(tr);
        });

        var stats = document.querySelectorAll(".grid-3 .stat-card");
        var hoje = new Date();
        var hojeStr = String(hoje.getDate()).padStart(2, "0") + "/" + String(hoje.getMonth() + 1).padStart(2, "0") + "/" + hoje.getFullYear();
        var reservasHoje = lista.filter(function (r) { return r.data === hojeStr; }).length;
        var proximos7 = 0;
        for (var i = 1; i <= 7; i++) {
          var d = new Date(hoje);
          d.setDate(d.getDate() + i);
          var dStr = String(d.getDate()).padStart(2, "0") + "/" + String(d.getMonth() + 1).padStart(2, "0") + "/" + d.getFullYear();
          proximos7 += lista.filter(function (r) { return r.data === dStr; }).length;
        }
        if (stats[0]) stats[0].querySelector(".stat-value").textContent = String(reservasHoje).padStart(2, "0");
        if (stats[1]) stats[1].querySelector(".stat-value").textContent = String(proximos7).padStart(2, "0");
        if (stats[2]) stats[2].querySelector(".stat-value").textContent = String(condominio.areasComuns.length).padStart(2, "0");

        var btnsConfirmar = reservasTbody.querySelectorAll(".btn-confirmar-reserva");
        btnsConfirmar.forEach(function (btn) {
          btn.addEventListener("click", function () {
            var indice = parseInt(btn.getAttribute("data-indice"), 10);
            var reserva = todasReservas[indice];
            if (!reserva) return;

            if (haConflito(reserva.area, reserva.data, reserva.horario, indice, todasReservas)) {
              alert("Nao foi possivel confirmar. Ja existe uma reserva confirmada para " + reserva.area + " nesse horario.");
              return;
            }

            salvarOverrideR(indice, "Confirmada");
            renderizarReservas();
          });
        });
      }

      renderizarReservas();

      /* Filtros */
      var areaSelect  = document.getElementById("reservation-area");
      var dateInput   = document.getElementById("reservation-date");
      var filterBtnR  = document.querySelector(".filter-bar .button-secondary");

      function filtrarReservas() {
        var area  = areaSelect ? areaSelect.value : "Todas as areas";
        var busca = dateInput ? dateInput.value : "";
        var linhas = reservasTbody.querySelectorAll("tr");
        var idx = 0;
        todasReservas.forEach(function (r) {
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
     NOVA RESERVA
     ============================================================ */

  if (pagina === "nova-reserva") {
    var areaSelectN = document.getElementById("area");
    var campoOutrosArea = document.getElementById("campo-outros-area");
    var campoOutrosCap = document.getElementById("campo-outros-capacidade");
    var inputOutraNome = document.getElementById("outra-area-nome");
    var inputOutraCap = document.getElementById("outra-area-capacidade");

    if (areaSelectN && condominio.areasComuns) {
      condominio.areasComuns.forEach(function (a) {
        var option = document.createElement("option");
        option.value = a.nome;
        option.textContent = a.nome + " - " + a.capacidade;
        areaSelectN.appendChild(option);
      });
      var optionOutros = document.createElement("option");
      optionOutros.value = "outros";
      optionOutros.textContent = "Outros";
      areaSelectN.appendChild(optionOutros);
    }

    if (areaSelectN) {
      areaSelectN.addEventListener("change", function () {
        var isOutros = areaSelectN.value === "outros";
        campoOutrosArea.style.display = isOutros ? "" : "none";
        campoOutrosCap.style.display = isOutros ? "" : "none";
        if (isOutros) {
          inputOutraNome.required = true;
          inputOutraCap.required = true;
        } else {
          inputOutraNome.required = false;
          inputOutraCap.required = false;
          inputOutraNome.value = "";
          inputOutraCap.value = "";
        }
      });
    }

    var dataInputN = document.getElementById("data");
    if (dataInputN) {
      var hoje = new Date();
      var dia = String(hoje.getDate()).padStart(2, "0");
      var mes = String(hoje.getMonth() + 1).padStart(2, "0");
      var ano = hoje.getFullYear();
      dataInputN.value = ano + "-" + mes + "-" + dia;
    }

    var formR = document.querySelector("form");
    if (formR) {
      formR.addEventListener("submit", function (e) {
        e.preventDefault();

        var chaveNovasR = "novasReservas_" + sessao.condominio;
        var novasReservas = [];
        try { novasReservas = JSON.parse(sessionStorage.getItem(chaveNovasR)) || []; } catch (e2) { novasReservas = []; }

        var areaSelecionada = document.getElementById("area").value;
        var areaObj = null;
        condominio.areasComuns.forEach(function (a) { if (a.nome === areaSelecionada) areaObj = a; });

        var nomeArea = areaSelecionada;
        var capacidadeArea = "";
        if (areaSelecionada === "outros") {
          nomeArea = inputOutraNome.value.trim();
          capacidadeArea = inputOutraCap.value.trim();
        }

        var dataValor = dataInputN.value;
        var partes = dataValor.split("-");
        var dataFormatada = partes[2] + "/" + partes[1] + "/" + partes[0];

        var novaReserva = {
          area: nomeArea,
          areaInfo: areaSelecionada === "outros" ? "Capacidade: " + capacidadeArea : (areaObj ? areaObj.descricao : ""),
          solicitante: document.getElementById("solicitante").value,
          data: dataFormatada,
          horario: document.getElementById("horario").value,
          finalidade: document.getElementById("finalidade").value,
          status: "Aguardando"
        };

        novasReservas.push(novaReserva);
        sessionStorage.setItem(chaveNovasR, JSON.stringify(novasReservas));
        window.location.href = "reservas.html";
      });
    }
  }

  /* ============================================================
     DETALHE DO MORADOR
     ============================================================ */

  if (pagina === "morador") {
    var params    = new URLSearchParams(window.location.search);
    var moradorId = parseInt(params.get("id"), 10);
    var morador   = moradorId ? buscarMorador(moradorId) : null;

    var tituloEl = document.querySelector(".page-header h1");
    if (!morador) {
      if (tituloEl) tituloEl.textContent = "Morador nao encontrado";
      return;
    }

    if (tituloEl) tituloEl.textContent = morador.nome;

    /* Link de edicao */
    var editLink = document.querySelector(".header-actions .button-primary");
    if (editLink) editLink.href = "editar-morador.html?id=" + moradorId;

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
     CADASTRO DE MORADOR
     ============================================================ */

  if (pagina === "cadastro-morador") {
    var blockSelect    = document.getElementById("block");
    var unitSelect     = document.getElementById("unit");
    var documentInput  = document.getElementById("document");
    var phoneInput     = document.getElementById("phone");
    var UNIDADES_FIXAS = ["101", "102", "201", "202", "301", "302", "401", "402"];

    /* --- Popular blocos e unidades dinamicamente --- */
    if (blockSelect && condominio.blocos) {
      blockSelect.innerHTML = '<option value="">Selecione</option>';
      condominio.blocos.forEach(function (bloco) {
        var opt = document.createElement("option");
        opt.value = bloco;
        opt.textContent = "Bloco " + bloco;
        blockSelect.appendChild(opt);
      });
    }

    function popularUnidades() {
      if (!unitSelect) return;
      var blocoSelecionado = blockSelect ? blockSelect.value : "";
      unitSelect.innerHTML = '<option value="">Selecione</option>';
      if (!blocoSelecionado) return;

      UNIDADES_FIXAS.forEach(function (numero) {
        var opt = document.createElement("option");
        opt.value = numero;
        opt.textContent = numero;
        unitSelect.appendChild(opt);
      });
    }

    if (blockSelect) {
      blockSelect.addEventListener("change", function () {
        var unidadeAnterior = unitSelect ? unitSelect.value : "";
        popularUnidades();
        if (unidadeAnterior && unitSelect && unitSelect.value !== unidadeAnterior) {
          unitSelect.value = "";
        }
      });
    }

    /* --- Mascara de CPF: 000.000.000-00 --- */
    if (documentInput) {
      documentInput.addEventListener("input", function () {
        var apenasDigitos = this.value.replace(/\D/g, "").substring(0, 11);
        var formatado = "";
        for (var i = 0; i < apenasDigitos.length; i++) {
          if (i === 3 || i === 6) formatado += ".";
          if (i === 9) formatado += "-";
          formatado += apenasDigitos[i];
        }
        this.value = formatado;
      });
    }

    /* --- Mascara de Telefone: (00) 00000-0000 --- */
    if (phoneInput) {
      phoneInput.addEventListener("input", function () {
        var apenasDigitos = this.value.replace(/\D/g, "").substring(0, 11);
        var formatado = "";
        if (apenasDigitos.length > 0) {
          formatado += "(" + apenasDigitos.substring(0, 2);
        }
        if (apenasDigitos.length >= 3) {
          formatado += ") " + apenasDigitos.substring(2, 7);
        }
        if (apenasDigitos.length >= 8) {
          formatado += "-" + apenasDigitos.substring(7, 11);
        }
        this.value = formatado;
      });
    }

    /* --- Salvar novo morador e redirecionar --- */
    var formCadastro = document.querySelector("form");
    if (formCadastro) {
      formCadastro.addEventListener("submit", function (event) {
        event.preventDefault();

        var nome      = document.getElementById("full-name").value.trim();
        var cpf       = document.getElementById("document").value.trim();
        var email     = document.getElementById("email").value.trim();
        var telefone  = document.getElementById("phone").value.trim();
        var bloco     = blockSelect ? blockSelect.value : "";
        var unidade   = unitSelect ? unitSelect.value : "";

        if (!nome || !email || !bloco || !unidade) return;

        var chave = "novosMoradores_" + sessao.condominio;
        var salvos = [];
        try { salvos = JSON.parse(sessionStorage.getItem(chave)) || []; } catch (e) { salvos = []; }

        var novoId = condominio.moradores.length + salvos.length + 1;
        var novoMorador = {
          id: novoId,
          nome: nome,
          email: email,
          cpf: cpf || "***.***.***-00",
          telefone: telefone || "(00) 00000-0000",
          tipo: "Proprietario",
          unidade: "Bloco " + bloco + ", " + unidade,
          bloco: bloco,
          numero: unidade,
          situacao: "Ativo",
          dataCadastro: new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" }),
          vagasGaragem: "01",
          moradoresUnidade: 1
        };

        salvos.push(novoMorador);
        sessionStorage.setItem(chave, JSON.stringify(salvos));
        window.location.href = "moradores.html";
      });
    }
  }

  /* ============================================================
     EDITAR MORADOR
     ============================================================ */

  if (pagina === "editar-morador") {
    var params    = new URLSearchParams(window.location.search);
    var moradorId = parseInt(params.get("id"), 10);
    var morador   = moradorId ? buscarMorador(moradorId) : null;

    var blockSelectE   = document.getElementById("block");
    var unitSelectE    = document.getElementById("unit");
    var documentInputE = document.getElementById("document");
    var phoneInputE    = document.getElementById("phone");
    var UNIDADES_FIXAS = ["101", "102", "201", "202", "301", "302", "401", "402"];

    if (!morador) {
      var tituloEl = document.querySelector(".page-header h1");
      if (tituloEl) tituloEl.textContent = "Morador nao encontrado";
    } else {
      /* Preencher campos */
      var nomeInput = document.getElementById("full-name");
      var emailInput = document.getElementById("email");
      if (nomeInput) nomeInput.value = morador.nome || "";
      if (emailInput) emailInput.value = morador.email || "";
      if (documentInputE) documentInputE.value = morador.cpf || "";
      if (phoneInputE) phoneInputE.value = morador.telefone || "";

      /* Popular blocos */
      if (blockSelectE && condominio.blocos) {
        blockSelectE.innerHTML = '<option value="">Selecione</option>';
        condominio.blocos.forEach(function (bloco) {
          var opt = document.createElement("option");
          opt.value = bloco;
          opt.textContent = "Bloco " + bloco;
          if (bloco === morador.bloco) opt.selected = true;
          blockSelectE.appendChild(opt);
        });
      }

      /* Popular unidades do bloco atual */
      function popularUnidadesEdicao() {
        if (!unitSelectE) return;
        var blocoSel = blockSelectE ? blockSelectE.value : "";
        unitSelectE.innerHTML = '<option value="">Selecione</option>';
        if (!blocoSel) return;
        UNIDADES_FIXAS.forEach(function (numero) {
          var opt = document.createElement("option");
          opt.value = numero;
          opt.textContent = numero;
          if (numero === morador.numero) opt.selected = true;
          unitSelectE.appendChild(opt);
        });
      }

      popularUnidadesEdicao();

      if (blockSelectE) {
        blockSelectE.addEventListener("change", function () {
          popularUnidadesEdicao();
        });
      }

      /* Mascara de CPF */
      if (documentInputE) {
        documentInputE.addEventListener("input", function () {
          var apenasDigitos = this.value.replace(/\D/g, "").substring(0, 11);
          var formatado = "";
          for (var i = 0; i < apenasDigitos.length; i++) {
            if (i === 3 || i === 6) formatado += ".";
            if (i === 9) formatado += "-";
            formatado += apenasDigitos[i];
          }
          this.value = formatado;
        });
      }

      /* Mascara de Telefone */
      if (phoneInputE) {
        phoneInputE.addEventListener("input", function () {
          var apenasDigitos = this.value.replace(/\D/g, "").substring(0, 11);
          var formatado = "";
          if (apenasDigitos.length > 0) {
            formatado += "(" + apenasDigitos.substring(0, 2);
          }
          if (apenasDigitos.length >= 3) {
            formatado += ") " + apenasDigitos.substring(2, 7);
          }
          if (apenasDigitos.length >= 8) {
            formatado += "-" + apenasDigitos.substring(7, 11);
          }
          this.value = formatado;
        });
      }

      /* Cancelar link com id */
      var cancelLink = document.querySelector(".form-actions .button-secondary");
      if (cancelLink) cancelLink.href = "morador.html?id=" + moradorId;

      /* Salvar alteracoes */
      var formEditar = document.querySelector("form");
      if (formEditar) {
        formEditar.addEventListener("submit", function (event) {
          event.preventDefault();

          var nome     = nomeInput ? nomeInput.value.trim() : "";
          var cpf      = documentInputE ? documentInputE.value.trim() : "";
          var email    = emailInput ? emailInput.value.trim() : "";
          var telefone = phoneInputE ? phoneInputE.value.trim() : "";
          var bloco    = blockSelectE ? blockSelectE.value : "";
          var unidade  = unitSelectE ? unitSelectE.value : "";

          if (!nome || !email || !bloco || !unidade) return;

          var moradorEditado = {
            id: morador.id,
            nome: nome,
            email: email,
            cpf: cpf || "***.***.***-00",
            telefone: telefone || "(00) 00000-0000",
            tipo: morador.tipo,
            unidade: "Bloco " + bloco + ", " + unidade,
            bloco: bloco,
            numero: unidade,
            situacao: morador.situacao,
            dataCadastro: morador.dataCadastro,
            vagasGaragem: morador.vagasGaragem,
            moradoresUnidade: morador.moradoresUnidade
          };

          var chaveEdicoes = "edicoesMoradores_" + sessao.condominio;
          var edicoes = [];
          try { edicoes = JSON.parse(sessionStorage.getItem(chaveEdicoes)) || []; } catch (e) { edicoes = []; }

          var idx = -1;
          for (var i = 0; i < edicoes.length; i++) {
            if (edicoes[i].id === moradorEditado.id) { idx = i; break; }
          }
          if (idx !== -1) {
            edicoes[idx] = moradorEditado;
          } else {
            edicoes.push(moradorEditado);
          }

          sessionStorage.setItem(chaveEdicoes, JSON.stringify(edicoes));
          window.location.href = "morador.html?id=" + moradorId;
        });
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
