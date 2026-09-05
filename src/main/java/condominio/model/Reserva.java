package condominio.model;

public class Reserva {
    private int id;
    private String area;
    private String areaInfo;
    private String solicitante;
    private String data;
    private String horario;
    private String finalidade;
    private String status;
    private String condominio;

    public Reserva() {
    }

    public Reserva(int id, String area, String areaInfo, String solicitante, String data, String horario, 
                   String finalidade, String status, String condominio) {
        this.id = id;
        this.area = area;
        this.areaInfo = areaInfo;
        this.solicitante = solicitante;
        this.data = data;
        this.horario = horario;
        this.finalidade = finalidade;
        this.status = status;
        this.condominio = condominio;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getAreaInfo() {
        return areaInfo;
    }

    public void setAreaInfo(String areaInfo) {
        this.areaInfo = areaInfo;
    }

    public String getSolicitante() {
        return solicitante;
    }

    public void setSolicitante(String solicitante) {
        this.solicitante = solicitante;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getHorario() {
        return horario;
    }

    public void setHorario(String horario) {
        this.horario = horario;
    }

    public String getFinalidade() {
        return finalidade;
    }

    public void setFinalidade(String finalidade) {
        this.finalidade = finalidade;
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
