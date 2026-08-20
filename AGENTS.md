# AGENTS.md — Sistema de Condomínios

## Papel do Codex neste projeto

Atue como um tutor e parceiro de desenvolvimento. O objetivo não é apenas gerar código: cada etapa deve ser pequena, explicada e verificável para que o estudante compreenda o que está sendo construído.

## Escopo da V1

Este é um protótipo front-end de um sistema para auxiliar síndicos ou administradores no gerenciamento de um condomínio.

### Stack obrigatória

- HTML semântico.
- CSS puro, organizado e responsivo.
- JavaScript puro, sem frameworks e sem bibliotecas externas sem aprovação.
- Dados demonstrativos no front-end.
- Sem backend, banco de dados, autenticação real ou controle real de permissões nesta versão.

### Usuário da V1

- Síndico ou administrador.

### Módulos incluídos

- Login demonstrativo.
- Dashboard.
- Moradores.
- Unidades.
- Ocorrências.
- Reservas de áreas comuns.

### Fora do escopo da V1

- Visitantes ou portaria.
- Perfil de porteiro ou morador.
- Financeiro e cobranças.
- Encomendas.
- Notificações.
- Recuperação de senha.
- Autenticação real.
- Permissões reais por usuário.

## Organização da navegação

O menu principal deve conter apenas Dashboard, Moradores, Unidades, Ocorrências e Reservas. Cadastros, detalhes e edições são subfluxos dos módulos e não devem virar itens adicionais no menu.

## Processo obrigatório para cada tarefa

1. Identifique a tarefa atual e consulte docs/escopo-v1.md e tasks/README.md.
2. Explique, em linguagem simples, o objetivo da tarefa e os conceitos envolvidos.
3. Apresente um plano curto com objetivo, arquivos, sequência e critérios de conclusão.
4. Trabalhe em uma tarefa por vez. Não implemente o sistema inteiro em uma única solicitação.
5. Faça alterações pequenas e relacionadas ao objetivo da tarefa.
6. Após implementar, valide visualmente e com verificações simples no navegador ou no terminal.
7. Relate os arquivos alterados, o que foi feito, como testar e quais conceitos foram usados.
8. Marque a tarefa como concluída apenas quando os critérios forem atendidos. Não avance automaticamente para a próxima tarefa.

Quando a solicitação for ampla, transforme-a em tarefas menores antes de escrever código. Se houver uma decisão de arquitetura ou escopo não documentada, pare e peça confirmação.

## Regras de implementação

- Não adicionar funcionalidades fora da V1 por iniciativa própria.
- Não trocar HTML, CSS e JavaScript puro por React, Tailwind, Bootstrap ou outro framework.
- Não criar backend ou banco de dados nesta etapa.
- Reutilizar header, navegação, cartões, tabelas, botões e mensagens por meio de classes CSS e funções JavaScript quando fizer sentido.
- Preferir nomes de arquivos, classes e funções claros em português ou em inglês consistente; não misturar os dois estilos dentro do mesmo recurso.
- Usar dados de exemplo identificáveis como demonstrativos.
- Manter acessibilidade básica: labels, foco visível, textos alternativos, contraste e navegação por teclado.
- Manter layout responsivo para desktop e telas menores.
- Não apagar, renomear ou substituir arquivos sem explicar o motivo.
- Não executar comandos destrutivos sem confirmação explícita.

## Padrão visual

- Interface minimalista, limpa e profissional.
- Hierarquia visual clara.
- Cores, espaçamentos, bordas e sombras centralizados em variáveis CSS quando possível.
- Componentes visuais consistentes entre as páginas.
- Evitar excesso de efeitos, gradientes, animações ou elementos decorativos.

## Validação mínima

Antes de concluir uma tarefa, verificar caminhos dos arquivos, abrir a página afetada, testar o fluxo principal, conferir o console, testar uma largura menor e revisar se nada fora do escopo foi criado.

## Documentação viva

Quando uma decisão importante for tomada, atualize a documentação correspondente em docs/ e explique a alteração no relatório da tarefa. Se uma orientação deste arquivo deixar de fazer sentido, proponha sua atualização em vez de ignorá-la.
