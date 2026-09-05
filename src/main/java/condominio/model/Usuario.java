package condominio.model;

public class Usuario {
    private String email;
    private String senha;
    private String nome;
    private String condominio;

    public Usuario() {
    }

    public Usuario(String email, String senha, String nome, String condominio) {
        this.email = email;
        this.senha = senha;
        this.nome = nome;
        this.condominio = condominio;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCondominio() {
        return condominio;
    }

    public void setCondominio(String condominio) {
        this.condominio = condominio;
    }
}
