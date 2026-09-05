package condominio.service;

import condominio.model.Ocorrencia;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OcorrenciaService {
    private List<Ocorrencia> ocorrencias;

    public OcorrenciaService() {
        ocorrencias = new ArrayList<>(Arrays.asList(
            // Residencial Jardim
            new Ocorrencia(24, "Vazamento no banheiro", "Bloco B, 202", "18/08/2026", "Administracao", "Em analise", "jardim"),
            new Ocorrencia(23, "Lampada queimada", "Garagem B", "17/08/2026", "Manutencao", "Em andamento", "jardim"),
            new Ocorrencia(22, "Portao com ruido", "Entrada principal", "15/08/2026", "Manutencao", "Concluido", "jardim"),
            // Condominio Parque Verde
            new Ocorrencia(31, "Portao da piscina travando", "Area da piscina", "20/08/2026", "Administracao", "Em analise", "parque"),
            new Ocorrencia(32, "Luzes do estacionamento apagadas", "Estacionamento Torre 2", "18/08/2026", "Manutencao", "Em andamento", "parque"),
            new Ocorrencia(33, "Filtro da piscina com defeito", "Area da piscina", "14/08/2026", "Manutencao", "Concluido", "parque")
        ));
    }

    public List<Ocorrencia> listarTodas(String condominio) {
        return ocorrencias.stream()
                .filter(o -> o.getCondominio().equals(condominio))
                .collect(Collectors.toList());
    }

    public Ocorrencia buscarPorId(int id, String condominio) {
        return ocorrencias.stream()
                .filter(o -> o.getId() == id && o.getCondominio().equals(condominio))
                .findFirst()
                .orElse(null);
    }

    public void salvar(Ocorrencia ocorrencia) {
        int novoId = ocorrencias.stream()
                .filter(o -> o.getCondominio().equals(ocorrencia.getCondominio()))
                .mapToInt(Ocorrencia::getId)
                .max()
                .orElse(0) + 1;
        ocorrencia.setId(novoId);
        ocorrencias.add(ocorrencia);
    }

    public long contarAbertas(String condominio) {
        return ocorrencias.stream()
                .filter(o -> !"Concluido".equals(o.getStatus()) && !"Concluida".equals(o.getStatus()) && o.getCondominio().equals(condominio))
                .count();
    }

    public long contarPorStatus(String condominio, String status) {
        return ocorrencias.stream()
                .filter(o -> status.equals(o.getStatus()) && o.getCondominio().equals(condominio))
                .count();
    }

    public void atualizar(Ocorrencia ocorrenciaAtualizada) {
        for (int i = 0; i < ocorrencias.size(); i++) {
            if (ocorrencias.get(i).getId() == ocorrenciaAtualizada.getId() &&
                ocorrencias.get(i).getCondominio().equals(ocorrenciaAtualizada.getCondominio())) {
                ocorrencias.set(i, ocorrenciaAtualizada);
                break;
            }
        }
    }
}
