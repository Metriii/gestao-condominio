package condominio.service;

import condominio.model.Morador;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MoradorService {
    private List<Morador> moradores;

    public MoradorService() {
        moradores = new ArrayList<>(Arrays.asList(
            // Residencial Jardim
            new Morador(1, "Marina Costa", "marina.costa@email.com", "***.***.***-42", 
                        "(11) 98888-1234", "Proprietaria", "Bloco A, 302", "A", "302", 
                        "Ativo", "12 de agosto de 2026", "02 e 03", 3, "jardim"),
            new Morador(2, "Rafael Almeida", "rafael.almeida@email.com", "***.***.***-78", 
                        "(11) 97777-4567", "Proprietario", "Bloco B, 202", "B", "202", 
                        "Ativo", "05 de julho de 2026", "01", 2, "jardim"),
            new Morador(3, "Beatriz Martins", "beatriz.martins@email.com", "***.***.***-15", 
                        "(11) 96666-7890", "Locataria", "Bloco A, 101", "A", "101", 
                        "Ativo", "20 de junho de 2026", "01", 2, "jardim"),
            new Morador(4, "Joao Ribeiro", "joao.ribeiro@email.com", "***.***.***-90", 
                        "(11) 95555-0123", "Proprietario", "Bloco B, 401", "B", "401", 
                        "Inativo", "01 de maio de 2026", "01", 0, "jardim"),
            // Condominio Parque Verde
            new Morador(1, "Fernanda Oliveira", "fernanda.oliveira@email.com", "***.***.***-33", 
                        "(21) 99999-1111", "Proprietaria", "Torre 1, 401", "Torre 1", "401", 
                        "Ativo", "10 de julho de 2026", "01 e 02", 4, "parque"),
            new Morador(2, "Pedro Santos", "pedro.santos@email.com", "***.***.***-55", 
                        "(21) 98888-2222", "Proprietario", "Torre 2, 301", "Torre 2", "301", 
                        "Ativo", "15 de junho de 2026", "01", 2, "parque"),
            new Morador(3, "Camila Ferreira", "camila.ferreira@email.com", "***.***.***-77", 
                        "(21) 97777-3333", "Locataria", "Torre 1, 201", "Torre 1", "201", 
                        "Ativo", "01 de agosto de 2026", "01", 1, "parque"),
            new Morador(4, "Lucas Mendes", "lucas.mendes@email.com", "***.***.***-88", 
                        "(21) 96666-4444", "Proprietario", "Torre 2, 102", "Torre 2", "102", 
                        "Inativo", "20 de maio de 2026", "01", 0, "parque")
        ));
    }

    public List<Morador> listarTodos(String condominio) {
        return moradores.stream()
                .filter(m -> m.getCondominio().equals(condominio))
                .collect(Collectors.toList());
    }

    public Morador buscarPorId(int id, String condominio) {
        return moradores.stream()
                .filter(m -> m.getId() == id && m.getCondominio().equals(condominio))
                .findFirst()
                .orElse(null);
    }

    public void salvar(Morador morador) {
        int novoId = moradores.stream()
                .filter(m -> m.getCondominio().equals(morador.getCondominio()))
                .mapToInt(Morador::getId)
                .max()
                .orElse(0) + 1;
        morador.setId(novoId);
        moradores.add(morador);
    }

    public void atualizar(Morador moradorAtualizado) {
        for (int i = 0; i < moradores.size(); i++) {
            if (moradores.get(i).getId() == moradorAtualizado.getId() && 
                moradores.get(i).getCondominio().equals(moradorAtualizado.getCondominio())) {
                moradores.set(i, moradorAtualizado);
                break;
            }
        }
    }

    public List<Morador> listarAtivos(String condominio) {
        return moradores.stream()
                .filter(m -> "Ativo".equals(m.getSituacao()) && m.getCondominio().equals(condominio))
                .collect(Collectors.toList());
    }

    public long contarAtivos(String condominio) {
        return moradores.stream()
                .filter(m -> "Ativo".equals(m.getSituacao()) && m.getCondominio().equals(condominio))
                .count();
    }

    public long contarUnidadesOcupadas(String condominio) {
        return moradores.stream()
                .filter(m -> "Ativo".equals(m.getSituacao()) && m.getCondominio().equals(condominio))
                .map(m -> m.getBloco() + m.getNumero())
                .distinct()
                .count();
    }

    public void excluir(int id, String condominio) {
        moradores.removeIf(m -> m.getId() == id && m.getCondominio().equals(condominio));
    }
}
