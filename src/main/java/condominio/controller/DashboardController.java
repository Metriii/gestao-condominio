package condominio.controller;

import condominio.model.Usuario;
import condominio.service.MoradorService;
import condominio.service.UnidadeService;
import condominio.service.OcorrenciaService;
import condominio.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
public class DashboardController {

    @Autowired
    private MoradorService moradorService;

    @Autowired
    private UnidadeService unidadeService;

    @Autowired
    private OcorrenciaService ocorrenciaService;

    @Autowired
    private ReservaService reservaService;

    @GetMapping("/")
    public String dashboard(Model model, HttpSession session, HttpServletResponse response) {
        Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        if (usuario == null) {
            return "redirect:/login";
        }
        
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        response.setHeader("Pragma", "no-cache");
        response.setDateHeader("Expires", 0);
        
        String condominio = usuario.getCondominio();
        
        model.addAttribute("usuario", usuario);
        model.addAttribute("moradoresAtivos", moradorService.contarAtivos(condominio));
        model.addAttribute("unidadesOcupadas", moradorService.contarUnidadesOcupadas(condominio));
        model.addAttribute("totalUnidades", unidadeService.listarTodas(condominio).size());
        model.addAttribute("ocorrenciasAbertas", ocorrenciaService.contarAbertas(condominio));
        model.addAttribute("reservasHoje", reservaService.contarHoje(condominio));
        model.addAttribute("moradores", moradorService.listarAtivos(condominio));
        model.addAttribute("reservas", reservaService.listarTodas(condominio));
        return "dashboard";
    }
}
