package condominio.model;

import java.util.List;

public class Condominio {
    private String nome;
    private List<Morador> moradores;
    private List<Unidade> unidades;
    private List<String> blocos;
    private List<Ocorrencia> ocorrencias;
    private List<Reserva> reservas;
    private List<String> atividadeRecente;

    public Condominio() {
    }

    public Condominio(String nome, List<Morador> moradores, List<Unidade> unidades, List<String> blocos,
                      List<Ocorrencia> ocorrencias, List<Reserva> reservas, List<String> atividadeRecente) {
        this.nome = nome;
        this.moradores = moradores;
        this.unidades = unidades;
        this.blocos = blocos;
        this.ocorrencias = ocorrencias;
        this.reservas = reservas;
        this.atividadeRecente = atividadeRecente;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public List<Morador> getMoradores() {
        return moradores;
    }

    public void setMoradores(List<Morador> moradores) {
        this.moradores = moradores;
    }

    public List<Unidade> getUnidades() {
        return unidades;
    }

    public void setUnidades(List<Unidade> unidades) {
        this.unidades = unidades;
    }

    public List<String> getBlocos() {
        return blocos;
    }

    public void setBlocos(List<String> blocos) {
        this.blocos = blocos;
    }

    public List<Ocorrencia> getOcorrencias() {
        return ocorrencias;
    }

    public void setOcorrencias(List<Ocorrencia> ocorrencias) {
        this.ocorrencias = ocorrencias;
    }

    public List<Reserva> getReservas() {
        return reservas;
    }

    public void setReservas(List<Reserva> reservas) {
        this.reservas = reservas;
    }

    public List<String> getAtividadeRecente() {
        return atividadeRecente;
    }

    public void setAtividadeRecente(List<String> atividadeRecente) {
        this.atividadeRecente = atividadeRecente;
    }
}
