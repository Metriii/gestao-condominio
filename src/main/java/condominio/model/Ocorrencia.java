package condominio.model;

public class Ocorrencia {
    private int id;
    private String titulo;
    private String local;
    private String data;
    private String responsavel;
    private String status;
    private String condominio;

    public Ocorrencia() {
    }

    public Ocorrencia(int id, String titulo, String local, String data, String responsavel, String status, String condominio) {
        this.id = id;
        this.titulo = titulo;
        this.local = local;
        this.data = data;
        this.responsavel = responsavel;
        this.status = status;
        this.condominio = condominio;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getLocal() {
        return local;
    }

    public void setLocal(String local) {
        this.local = local;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(String responsavel) {
        this.responsavel = responsavel;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCondominio() {
        return condominio;
    }

    public void setCondominio(String condominio) {
        this.condominio = condominio;
    }
}
