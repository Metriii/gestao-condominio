package condominio.model;

public class Morador {
    private int id;
    private String nome;
    private String email;
    private String cpf;
    private String telefone;
    private String tipo;
    private String unidade;
    private String bloco;
    private String numero;
    private String situacao;
    private String dataCadastro;
    private String vagasGaragem;
    private int moradoresUnidade;
    private String condominio;

    public Morador() {
    }

    public Morador(int id, String nome, String email, String cpf, String telefone, String tipo, 
                   String unidade, String bloco, String numero, String situacao, String dataCadastro, 
                   String vagasGaragem, int moradoresUnidade, String condominio) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.telefone = telefone;
        this.tipo = tipo;
        this.unidade = unidade;
        this.bloco = bloco;
        this.numero = numero;
        this.situacao = situacao;
        this.dataCadastro = dataCadastro;
        this.vagasGaragem = vagasGaragem;
        this.moradoresUnidade = moradoresUnidade;
        this.condominio = condominio;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getUnidade() {
        return unidade;
    }

    public void setUnidade(String unidade) {
        this.unidade = unidade;
    }

    public String getBloco() {
        return bloco;
    }

    public void setBloco(String bloco) {
        this.bloco = bloco;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getSituacao() {
        return situacao;
    }

    public void setSituacao(String situacao) {
        this.situacao = situacao;
    }

    public String getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(String dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public String getVagasGaragem() {
        return vagasGaragem;
    }

    public void setVagasGaragem(String vagasGaragem) {
        this.vagasGaragem = vagasGaragem;
    }

    public int getMoradoresUnidade() {
        return moradoresUnidade;
    }

    public void setMoradoresUnidade(int moradoresUnidade) {
        this.moradoresUnidade = moradoresUnidade;
    }

    public String getCondominio() {
        return condominio;
    }

    public void setCondominio(String condominio) {
        this.condominio = condominio;
    }
}
