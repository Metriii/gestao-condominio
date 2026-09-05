package condominio.service;

import condominio.model.Unidade;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UnidadeService {
    private List<Unidade> unidades;

    public UnidadeService() {
        unidades = new ArrayList<>(Arrays.asList(
            // Residencial Jardim
            new Unidade("A", "101", "Primeiro andar", "Ocupada", "01 vaga", "jardim"),
            new Unidade("A", "102", "Primeiro andar", "Disponivel", "01 vaga", "jardim"),
            new Unidade("A", "201", "Segundo andar", "Disponivel", "01 vaga", "jardim"),
            new Unidade("A", "202", "Segundo andar", "Disponivel", "01 vaga", "jardim"),
            new Unidade("A", "301", "Terceiro andar", "Disponivel", "01 vaga", "jardim"),
            new Unidade("A", "302", "Terceiro andar", "Ocupada", "02 vagas", "jardim"),
            new Unidade("A", "401", "Quarto andar", "Disponivel", "01 vaga", "jardim"),
            new Unidade("A", "402", "Quarto andar", "Disponivel", "01 vaga", "jardim"),
            new Unidade("B", "101", "Primeiro andar", "Disponivel", "01 vaga", "jardim"),
            new Unidade("B", "102", "Primeiro andar", "Disponivel", "01 vaga", "jardim"),
            new Unidade("B", "201", "Segundo andar", "Disponivel", "01 vaga", "jardim"),
            new Unidade("B", "202", "Segundo andar", "Ocupada", "01 vaga", "jardim"),
            new Unidade("B", "301", "Terceiro andar", "Disponivel", "01 vaga", "jardim"),
            new Unidade("B", "302", "Terceiro andar", "Disponivel", "01 vaga", "jardim"),
            new Unidade("B", "401", "Quarto andar", "Disponivel", "01 vaga", "jardim"),
            new Unidade("B", "402", "Quarto andar", "Disponivel", "01 vaga", "jardim"),
            // Condominio Parque Verde
            new Unidade("Torre 1", "101", "Primeiro andar", "Disponivel", "01 vaga", "parque"),
            new Unidade("Torre 1", "102", "Primeiro andar", "Disponivel", "01 vaga", "parque"),
            new Unidade("Torre 1", "201", "Segundo andar", "Ocupada", "01 vaga", "parque"),
            new Unidade("Torre 1", "202", "Segundo andar", "Disponivel", "01 vaga", "parque"),
            new Unidade("Torre 1", "301", "Terceiro andar", "Disponivel", "01 vaga", "parque"),
            new Unidade("Torre 1", "302", "Terceiro andar", "Disponivel", "01 vaga", "parque"),
            new Unidade("Torre 1", "401", "Quarto andar", "Ocupada", "02 vagas", "parque"),
            new Unidade("Torre 1", "402", "Quarto andar", "Disponivel", "01 vaga", "parque"),
            new Unidade("Torre 2", "101", "Primeiro andar", "Disponivel", "01 vaga", "parque"),
            new Unidade("Torre 2", "102", "Primeiro andar", "Disponivel", "01 vaga", "parque"),
            new Unidade("Torre 2", "201", "Segundo andar", "Disponivel", "01 vaga", "parque"),
            new Unidade("Torre 2", "202", "Segundo andar", "Disponivel", "01 vaga", "parque"),
            new Unidade("Torre 2", "301", "Terceiro andar", "Ocupada", "01 vaga", "parque"),
            new Unidade("Torre 2", "302", "Terceiro andar", "Disponivel", "01 vaga", "parque"),
            new Unidade("Torre 2", "401", "Quarto andar", "Disponivel", "01 vaga", "parque"),
            new Unidade("Torre 2", "402", "Quarto andar", "Disponivel", "01 vaga", "parque")
        ));
    }

    public List<Unidade> listarTodas(String condominio) {
        return unidades.stream()
                .filter(u -> u.getCondominio().equals(condominio))
                .collect(Collectors.toList());
    }

    public long contarOcupadas(String condominio) {
        return unidades.stream()
                .filter(u -> "Ocupada".equals(u.getSituacao()) && u.getCondominio().equals(condominio))
                .count();
    }

    public List<String> listarBlocos(String condominio) {
        if ("parque".equals(condominio)) {
            return Arrays.asList("Torre 1", "Torre 2");
        }
        return Arrays.asList("A", "B");
    }

    public void atualizarSituacao(String bloco, String numero, String condominio, String novaSituacao) {
        for (Unidade u : unidades) {
            if (u.getBloco().equals(bloco) && u.getNumero().equals(numero) && u.getCondominio().equals(condominio)) {
                u.setSituacao(novaSituacao);
                break;
            }
        }
    }
}
