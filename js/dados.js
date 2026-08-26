var USUARIOS = [
  {
    email: "sindico@condominio.com",
    senha: "123456",
    nome: "Vinicius",
    condominio: "jardim"
  },
  {
    email: "admin@condominio.com",
    senha: "admin",
    nome: "Carlos Lima",
    condominio: "parque"
  }
];

var CONDOMINIOS = {
  jardim: {
    nome: "Residencial Jardim",
    moradores: [
      {
        id: 1,
        nome: "Marina Costa",
        email: "marina.costa@email.com",
        cpf: "***.***.***-42",
        telefone: "(11) 98888-1234",
        tipo: "Proprietaria",
        unidade: "Bloco A, 302",
        bloco: "A",
        numero: "302",
        situacao: "Ativo",
        dataCadastro: "12 de agosto de 2026",
        vagasGaragem: "02 e 03",
        moradoresUnidade: 3
      },
      {
        id: 2,
        nome: "Rafael Almeida",
        email: "rafael.almeida@email.com",
        cpf: "***.***.***-78",
        telefone: "(11) 97777-4567",
        tipo: "Proprietario",
        unidade: "Bloco B, 202",
        bloco: "B",
        numero: "202",
        situacao: "Ativo",
        dataCadastro: "05 de julho de 2026",
        vagasGaragem: "01",
        moradoresUnidade: 2
      },
      {
        id: 3,
        nome: "Beatriz Martins",
        email: "beatriz.martins@email.com",
        cpf: "***.***.***-15",
        telefone: "(11) 96666-7890",
        tipo: "Locataria",
        unidade: "Bloco A, 101",
        bloco: "A",
        numero: "101",
        situacao: "Ativo",
        dataCadastro: "20 de junho de 2026",
        vagasGaragem: "01",
        moradoresUnidade: 2
      },
      {
        id: 4,
        nome: "Joao Ribeiro",
        email: "joao.ribeiro@email.com",
        cpf: "***.***.***-90",
        telefone: "(11) 95555-0123",
        tipo: "Proprietario",
        unidade: "Bloco B, 401",
        bloco: "B",
        numero: "401",
        situacao: "Inativo",
        dataCadastro: "01 de maio de 2026",
        vagasGaragem: "01",
        moradoresUnidade: 0
      }
    ],
    unidades: [
      { bloco: "A", numero: "101", andar: "Primeiro andar", responsavel: "Beatriz Martins", moradores: 2, situacao: "Ocupada", garagem: "01 vaga" },
      { bloco: "A", numero: "102", andar: "Primeiro andar", responsavel: "", moradores: 0, situacao: "Disponivel", garagem: "01 vaga" },
      { bloco: "A", numero: "201", andar: "Segundo andar", responsavel: "", moradores: 0, situacao: "Disponivel", garagem: "01 vaga" },
      { bloco: "A", numero: "202", andar: "Segundo andar", responsavel: "", moradores: 0, situacao: "Disponivel", garagem: "01 vaga" },
      { bloco: "A", numero: "301", andar: "Terceiro andar", responsavel: "", moradores: 0, situacao: "Disponivel", garagem: "01 vaga" },
      { bloco: "A", numero: "302", andar: "Terceiro andar", responsavel: "Marina Costa", moradores: 3, situacao: "Ocupada", garagem: "02 vagas" },
      { bloco: "A", numero: "401", andar: "Quarto andar", responsavel: "", moradores: 0, situacao: "Disponivel", garagem: "01 vaga" },
      { bloco: "A", numero: "402", andar: "Quarto andar", responsavel: "", moradores: 0, situacao: "Disponivel", garagem: "01 vaga" },
      { bloco: "B", numero: "101", andar: "Primeiro andar", responsavel: "", moradores: 0, situacao: "Disponivel", garagem: "01 vaga" },
      { bloco: "B", numero: "102", andar: "Primeiro andar", responsavel: "", moradores: 0, situacao: "Disponivel", garagem: "01 vaga" },
      { bloco: "B", numero: "201", andar: "Segundo andar", responsavel: "", moradores: 0, situacao: "Disponivel", garagem: "01 vaga" },
      { bloco: "B", numero: "202", andar: "Segundo andar", responsavel: "Rafael Almeida", moradores: 2, situacao: "Ocupada", garagem: "01 vaga" },
      { bloco: "B", numero: "301", andar: "Terceiro andar", responsavel: "", moradores: 0, situacao: "Disponivel", garagem: "01 vaga" },
      { bloco: "B", numero: "302", andar: "Terceiro andar", responsavel: "", moradores: 0, situacao: "Disponivel", garagem: "01 vaga" },
      { bloco: "B", numero: "401", andar: "Quarto andar", responsavel: "Joao Ribeiro", moradores: 0, situacao: "Disponivel", garagem: "01 vaga" },
      { bloco: "B", numero: "402", andar: "Quarto andar", responsavel: "", moradores: 0, situacao: "Disponivel", garagem: "01 vaga" }
    ],
    totalUnidades: 16,
    blocos: ["A", "B"],
    ocorrencias: [
      { id: 24, titulo: "Vazamento no banheiro", local: "Bloco B, 202", data: "18/08/2026", responsavel: "Administracao", status: "Em analise" },
      { id: 23, titulo: "Lampada queimada", local: "Garagem B", data: "17/08/2026", responsavel: "Manutencao", status: "Em andamento" },
      { id: 22, titulo: "Portao com ruido", local: "Entrada principal", data: "15/08/2026", responsavel: "Manutencao", status: "Concluida" }
    ],
    areasComuns: [
      { nome: "Salao de festas", capacidade: "50 pessoas", descricao: "Capacidade: 50 pessoas" },
      { nome: "Churrasqueira", capacidade: "20 pessoas", descricao: "Capacidade: 20 pessoas" },
      { nome: "Quadra", capacidade: "esportivo", descricao: "Uso esportivo" }
    ],
    reservas: [
      { area: "Salao de festas", areaInfo: "Capacidade: 50 pessoas", solicitante: "Marina Costa, 302", data: "18/08/2026", horario: "18:00 - 23:00", finalidade: "Aniversario", status: "Confirmada" },
      { area: "Churrasqueira", areaInfo: "Capacidade: 20 pessoas", solicitante: "Rafael Almeida, 202", data: "18/08/2026", horario: "12:00 - 16:00", finalidade: "Almoco em familia", status: "Confirmada" },
      { area: "Quadra", areaInfo: "Uso esportivo", solicitante: "Beatriz Martins, 101", data: "19/08/2026", horario: "19:00 - 20:00", finalidade: "Volei", status: "Aguardando" }
    ],
    atividadeRecente: [
      { tipo: "Ocorrencia atualizada", descricao: "Vazamento no bloco B, unidade 202", status: "Em analise", statusClasse: "warning" },
      { tipo: "Reserva confirmada", descricao: "Salao de festas para 18/08", status: "Confirmada", statusClasse: "success" },
      { tipo: "Novo morador cadastrado", descricao: "Rafael Almeida, unidade 202", status: "Hoje", statusClasse: "neutral" }
    ]
  },

  parque: {
    nome: "Condominio Parque Verde",
    moradores: [
      {
        id: 1,
        nome: "Fernanda Oliveira",
        email: "fernanda.oliveira@email.com",
        cpf: "***.***.***-33",
        telefone: "(21) 99999-1111",
        tipo: "Proprietaria",
        unidade: "Torre 1, 502",
        bloco: "Torre 1",
        numero: "502",
        situacao: "Ativo",
        dataCadastro: "10 de julho de 2026",
        vagasGaragem: "01 e 02",
        moradoresUnidade: 4
      },
      {
        id: 2,
        nome: "Pedro Santos",
        email: "pedro.santos@email.com",
        cpf: "***.***.***-55",
        telefone: "(21) 98888-2222",
        tipo: "Proprietario",
        unidade: "Torre 2, 301",
        bloco: "Torre 2",
        numero: "301",
        situacao: "Ativo",
        dataCadastro: "15 de junho de 2026",
        vagasGaragem: "01",
        moradoresUnidade: 2
      },
      {
        id: 3,
        nome: "Camila Ferreira",
        email: "camila.ferreira@email.com",
        cpf: "***.***.***-77",
        telefone: "(21) 97777-3333",
        tipo: "Locataria",
        unidade: "Torre 1, 201",
        bloco: "Torre 1",
        numero: "201",
        situacao: "Ativo",
        dataCadastro: "01 de agosto de 2026",
        vagasGaragem: "01",
        moradoresUnidade: 1
      },
      {
        id: 4,
        nome: "Lucas Mendes",
        email: "lucas.mendes@email.com",
        cpf: "***.***.***-88",
        telefone: "(21) 96666-4444",
        tipo: "Proprietario",
        unidade: "Torre 2, 102",
        bloco: "Torre 2",
        numero: "102",
        situacao: "Inativo",
        dataCadastro: "20 de maio de 2026",
        vagasGaragem: "01",
        moradoresUnidade: 0
      }
    ],
    unidades: [
      { bloco: "Torre 1", numero: "201", andar: "Segundo andar", responsavel: "Camila Ferreira", moradores: 1, situacao: "Ocupada", garagem: "01 vaga" },
      { bloco: "Torre 1", numero: "502", andar: "Quinto andar", responsavel: "Fernanda Oliveira", moradores: 4, situacao: "Ocupada", garagem: "02 vagas" },
      { bloco: "Torre 2", numero: "102", andar: "Primeiro andar", responsavel: "Lucas Mendes", moradores: 0, situacao: "Disponivel", garagem: "01 vaga" },
      { bloco: "Torre 2", numero: "301", andar: "Terceiro andar", responsavel: "Pedro Santos", moradores: 2, situacao: "Ocupada", garagem: "01 vaga" }
    ],
    totalUnidades: 60,
    blocos: ["Torre 1", "Torre 2"],
    ocorrencias: [
      { id: 15, titulo: "Portao da garagem emperrando", local: "Torre 2, garagem", data: "19/08/2026", responsavel: "Manutencao", status: "Em andamento" },
      { id: 14, titulo: "Barulho no corredor", local: "Torre 1, 5o andar", data: "17/08/2026", responsavel: "Administracao", status: "Em analise" },
      { id: 13, titulo: "Vazamento na area da piscina", local: "Area externa", data: "14/08/2026", responsavel: "Manutencao", status: "Concluida" }
    ],
    areasComuns: [
      { nome: "Piscina", capacidade: "30 pessoas", descricao: "Capacidade: 30 pessoas" },
      { nome: "Academia", capacidade: "15 pessoas", descricao: "Capacidade: 15 pessoas" },
      { nome: "Salao de festas", capacidade: "80 pessoas", descricao: "Capacidade: 80 pessoas" }
    ],
    reservas: [
      { area: "Piscina", areaInfo: "Capacidade: 30 pessoas", solicitante: "Fernanda Oliveira, 502", data: "20/08/2026", horario: "14:00 - 18:00", finalidade: "Festa infantil", status: "Confirmada" },
      { area: "Academia", areaInfo: "Capacidade: 15 pessoas", solicitante: "Pedro Santos, 301", data: "19/08/2026", horario: "07:00 - 08:00", finalidade: "Aula de yoga", status: "Confirmada" },
      { area: "Salao de festas", areaInfo: "Capacidade: 80 pessoas", solicitante: "Camila Ferreira, 201", data: "22/08/2026", horario: "19:00 - 23:00", finalidade: "Formatura", status: "Aguardando" }
    ],
    atividadeRecente: [
      { tipo: "Ocorrencia em andamento", descricao: "Portao da garagem emperrando, Torre 2", status: "Em andamento", statusClasse: "success" },
      { tipo: "Reserva confirmada", descricao: "Piscina reservada para 20/08", status: "Confirmada", statusClasse: "success" },
      { tipo: "Novo morador cadastrado", descricao: "Camila Ferreira, unidade 201", status: "Hoje", statusClasse: "neutral" }
    ]
  }
};
