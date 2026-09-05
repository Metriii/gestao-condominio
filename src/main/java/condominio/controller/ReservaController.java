package condominio.controller;

import condominio.model.Usuario;
import condominio.model.Reserva;
import condominio.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

@Controller
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @GetMapping("/reservas")
    public String listarReservas(Model model, HttpSession session) {
        Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        if (usuario == null) return "redirect:/login";
        String condominio = usuario.getCondominio();
        model.addAttribute("usuario", usuario);
        model.addAttribute("reservas", reservaService.listarTodas(condominio));
        model.addAttribute("areasComuns", reservaService.listarAreasComuns(condominio));
        return "reservas";
    }

    @GetMapping("/reservas/nova")
    public String novaReserva(Model model, HttpSession session) {
        Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        if (usuario == null) return "redirect:/login";
        String condominio = usuario.getCondominio();
        model.addAttribute("usuario", usuario);
        Reserva reserva = new Reserva();
        reserva.setCondominio(condominio);
        model.addAttribute("reserva", reserva);
        model.addAttribute("areasComuns", reservaService.listarAreasComuns(condominio));
        return "nova-reserva";
    }

    @PostMapping("/reservas")
    public String salvarReserva(@ModelAttribute Reserva reserva, HttpSession session) {
        Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        if (usuario == null) return "redirect:/login";
        reserva.setCondominio(usuario.getCondominio());
        reserva.setStatus("Aguardando");
        reservaService.salvar(reserva);
        return "redirect:/reservas";
    }

    @PostMapping("/reservas/{id}/status")
    @ResponseBody
    public String toggleStatus(@PathVariable int id, @RequestParam String status, HttpSession session) {
        Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        if (usuario == null) return "error";
        String condominio = usuario.getCondominio();
        Reserva reserva = reservaService.buscarPorId(id, condominio);
        if (reserva != null) {
            reserva.setStatus(status);
            reservaService.atualizar(reserva);
            return "ok";
        }
        return "error";
    }
}
