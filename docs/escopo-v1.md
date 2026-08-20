# Escopo funcional — V1

## Objetivo

Criar uma interface web simples e profissional para demonstrar como um síndico ou administrador pode visualizar e organizar informações básicas do condomínio.

## Fluxo principal

1. O usuário acessa o login.
2. Informa dados demonstrativos.
3. Entra no dashboard.
4. Usa o menu para acessar moradores, unidades, ocorrências e reservas.
5. Consulta informações e executa ações demonstrativas de cadastro, edição ou visualização.

## Páginas previstas

| Área | Responsabilidade |
|---|---|
| Login | Simular a entrada do síndico no sistema |
| Dashboard | Exibir um resumo do condomínio |
| Moradores | Listar e consultar moradores |
| Cadastro de morador | Demonstrar o preenchimento de um novo morador |
| Detalhes do morador | Exibir informações de um morador |
| Unidades | Listar apartamentos ou casas do condomínio |
| Ocorrências | Listar e registrar ocorrências |
| Reservas | Listar e demonstrar reservas de áreas comuns |

Os nomes finais dos arquivos devem ser definidos na tarefa de estrutura inicial e mantidos de forma consistente.

## Decisões da V1

- O sistema é destinado inicialmente ao síndico ou administrador.
- Visitantes não fazem parte da V1 porque esse fluxo pertence à portaria.
- O login é demonstrativo.
- Os dados são demonstrativos e podem ser mantidos em arrays JavaScript ou outra solução simples somente quando a tarefa exigir.
- A interface deve funcionar sem backend.
- O menu deve conter somente Dashboard, Moradores, Unidades, Ocorrências e Reservas.

## Não implementar agora

Financeiro, pagamentos, visitantes, portaria, encomendas, notificações, recuperação de senha, autenticação real, banco de dados, API, permissões reais e perfis adicionais.
