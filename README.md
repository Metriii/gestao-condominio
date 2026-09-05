# CondoGestor - Sistema de Gestão de Condomínios

Sistema web para auxiliar síndicos ou administradores no gerenciamento de um condomínio.

## Tecnologias Utilizadas

- Java 8
- Spring Boot 2.7.18
- Spring Web
- Thymeleaf
- HTML5
- CSS3
- JavaScript

## Pré-requisitos

- Java JDK 8 ou superior
- Apache Maven 3.6.0 ou superior

### Instalação do Maven

#### Windows
1. Acesse https://maven.apache.org/download.cgi
2. Baixe a versão mais recente (apache-maven-3.9.x-bin.zip)
3. Extraia o arquivo em `C:\Program Files\Apache\maven`
4. Adicione `C:\Program Files\Apache\maven\bin` ao PATH do sistema
5. Reinicie o terminal

#### Linux/macOS
```bash
# Ubuntu/Debian
sudo apt-get install maven

# macOS com Homebrew
brew install maven
```

### Verificação da Instalação
```bash
mvn --version
```

## Estrutura do Projeto

```
gestao-condominio/
├── pom.xml
├── src/
│   └── main/
│       ├── java/
│       │   └── condominio/
│       │       ├── CondominioApplication.java
│       │       ├── controller/
│       │       │   ├── LoginController.java
│       │       │   ├── DashboardController.java
│       │       │   ├── MoradorController.java
│       │       │   ├── UnidadeController.java
│       │       │   ├── OcorrenciaController.java
│       │       │   └── ReservaController.java
│       │       ├── model/
│       │       │   ├── Morador.java
│       │       │   ├── Unidade.java
│       │       │   ├── Ocorrencia.java
│       │       │   ├── Reserva.java
│       │       │   ├── Usuario.java
│       │       │   └── Condominio.java
│       │       └── service/
│       │           ├── MoradorService.java
│       │           ├── UnidadeService.java
│       │           ├── OcorrenciaService.java
│       │           └── ReservaService.java
│       └── resources/
│           ├── templates/
│           │   ├── login.html
│           │   ├── dashboard.html
│           │   ├── moradores.html
│           │   ├── cadastro-morador.html
│           │   ├── editar-morador.html
│           │   ├── morador.html
│           │   ├── unidades.html
│           │   ├── ocorrencias.html
│           │   ├── registrar-ocorrencia.html
│           │   ├── reservas.html
│           │   └── nova-reserva.html
│           ├── static/
│           │   ├── css/
│           │   │   └── style.css
│           │   └── js/
│           │       └── script.js
│           └── application.properties
├── AGENTS.md
└── README.md
```

## Executando o Projeto

### Opção 1: Usando Maven
```bash
# Navegue até a pasta do projeto
cd gestao-condominio

# Execute a aplicação
mvn spring-boot:run
```

### Opção 2: Usando Maven Wrapper (se disponível)
```bash
# Windows
./mvnw spring-boot:run

# Linux/macOS
./mvnw spring-boot:run
```

### Opção 3: Compilar e executar manualmente
```bash
# Compilar o projeto
mvn clean package

# Executar o JAR
java -jar target/gestao-condominio-1.0.0.jar
```

A aplicação estará disponível em: **http://localhost:8080**

## Rotas Disponíveis

| Rota | Método | Descrição |
|------|--------|-----------|
| `/login` | GET | Página de login |
| `/` | GET | Dashboard principal |
| `/moradores` | GET | Listagem de moradores |
| `/moradores/novo` | GET | Formulário de cadastro |
| `/moradores/{id}` | GET | Detalhes do morador |
| `/moradores/{id}/editar` | GET | Formulário de edição |
| `/moradores/{id}/editar` | POST | Atualizar morador |
| `/unidades` | GET | Listagem de unidades |
| `/ocorrencias` | GET | Listagem de ocorrências |
| `/ocorrencias/nova` | GET | Formulário de ocorrência |
| `/reservas` | GET | Listagem de reservas |
| `/reservas/nova` | GET | Formulário de reserva |

## Funcionalidades

- **Login demonstrativo**: Simulação de autenticação
- **Dashboard**: Visão geral com estatísticas
- **Moradores**: CRUD completo (listar, cadastrar, editar, visualizar)
- **Unidades**: Listagem e consulta de unidades
- **Ocorrências**: Registro e acompanhamento de ocorrências
- **Reservas**: Gestão de reservas de áreas comuns

## Dados Simulados

O sistema utiliza dados demonstrativos armazenados em memória:
- 4 moradores por condomínio
- 16 unidades (blocos A e B)
- 3 ocorrências
- 3 reservas
- 3 áreas comuns

## Desenvolvedores

- Vinicius - Desenvolvimento

## Licença

Este projeto é para fins educacionais.
