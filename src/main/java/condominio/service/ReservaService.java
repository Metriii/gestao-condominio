package condominio.service;

import condominio.model.Reserva;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservaService {
    private List<Reserva> reservas;

    public ReservaService() {
        reservas = new ArrayList<>(Arrays.asList(
            // Residencial Jardim
            new Reserva(1, "Salao de festas", "Capacidade: 50 pessoas", "Marina Costa, 302", 
                       "18/08/2026", "18:00 - 23:00", "Aniversario", "Confirmada", "jardim"),
            new Reserva(2, "Churrasqueira", "Capacidade: 20 pessoas", "Rafael Almeida, 202", 
                       "18/08/2026", "12:00 - 16:00", "Almoco em familia", "Confirmada", "jardim"),
            new Reserva(3, "Quadra", "Uso esportivo", "Beatriz Martins, 101", 
                       "19/08/2026", "19:00 - 20:00", "Volei", "Aguardando", "jardim"),
            // Condominio Parque Verde
            new Reserva(1, "Piscina", "Capacidade: 30 pessoas", "Fernanda Oliveira, 401", 
                       "18/08/2026", "09:00 - 12:00", "Natacao", "Confirmada", "parque"),
            new Reserva(2, "Academia", "Capacidade: 15 pessoas", "Pedro Santos, 301", 
                       "19/08/2026", "07:00 - 08:00", "Treino", "Aguardando", "parque"),
            new Reserva(3, "Salao de festas", "Capacidade: 80 pessoas", "Camila Ferreira, 201", 
                       "20/08/2026", "19:00 - 23:00", "Reuniao de moradores", "Confirmada", "parque")
        ));
    }

    public List<Reserva> listarTodas(String condominio) {
        return reservas.stream()
                .filter(r -> r.getCondominio().equals(condominio))
                .collect(Collectors.toList());
    }

    public void salvar(Reserva reserva) {
        int novoId = reservas.stream()
                .filter(r -> r.getCondominio().equals(reserva.getCondominio()))
                .mapToInt(Reserva::getId)
                .max()
                .orElse(0) + 1;
        reserva.setId(novoId);
        reservas.add(reserva);
    }

    public Reserva buscarPorId(int id, String condominio) {
        return reservas.stream()
                .filter(r -> r.getId() == id && r.getCondominio().equals(condominio))
                .findFirst()
                .orElse(null);
    }

    public void atualizar(Reserva reservaAtualizada) {
        for (int i = 0; i < reservas.size(); i++) {
            if (reservas.get(i).getId() == reservaAtualizada.getId() &&
                reservas.get(i).getCondominio().equals(reservaAtualizada.getCondominio())) {
                reservas.set(i, reservaAtualizada);
                break;
            }
        }
    }

    public long contarHoje(String condominio) {
        return reservas.stream()
                .filter(r -> r.getCondominio().equals(condominio) && "Confirmada".equals(r.getStatus()))
                .count();
    }

    public List<String> listarAreasComuns(String condominio) {
        if ("parque".equals(condominio)) {
            return Arrays.asList("Piscina", "Academia", "Salao de festas");
        }
        return Arrays.asList("Salao de festas", "Churrasqueira", "Quadra");
    }
}
