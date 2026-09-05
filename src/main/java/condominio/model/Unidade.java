package condominio.model;

public class Unidade {
    private String bloco;
    private String numero;
    private String andar;
    private String situacao;
    private String garagem;
    private String condominio;

    public Unidade() {
    }

    public Unidade(String bloco, String numero, String andar, String situacao, String garagem, String condominio) {
        this.bloco = bloco;
        this.numero = numero;
        this.andar = andar;
        this.situacao = situacao;
        this.garagem = garagem;
        this.condominio = condominio;
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

    public String getAndar() {
        return andar;
    }

    public void setAndar(String andar) {
        this.andar = andar;
    }

    public String getSituacao() {
        return situacao;
    }

    public void setSituacao(String situacao) {
        this.situacao = situacao;
    }

    public String getGaragem() {
        return garagem;
    }

    public void setGaragem(String garagem) {
        this.garagem = garagem;
    }

    public String getCondominio() {
        return condominio;
    }

    public void setCondominio(String condominio) {
        this.condominio = condominio;
    }
}
