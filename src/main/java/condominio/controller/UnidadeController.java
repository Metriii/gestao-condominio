package condominio.controller;

import condominio.model.Usuario;
import condominio.model.Morador;
import condominio.service.UnidadeService;
import condominio.service.MoradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class UnidadeController {

    @Autowired
    private UnidadeService unidadeService;

    @Autowired
    private MoradorService moradorService;

    @GetMapping("/unidades")
    public String listarUnidades(Model model, HttpSession session, HttpServletResponse response) {
        Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        if (usuario == null) return "redirect:/login";
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        response.setHeader("Pragma", "no-cache");
        response.setDateHeader("Expires", 0);
        String condominio = usuario.getCondominio();
        model.addAttribute("usuario", usuario);
        model.addAttribute("unidades", unidadeService.listarTodas(condominio));
        model.addAttribute("blocos", unidadeService.listarBlocos(condominio));
        long total = unidadeService.listarTodas(condominio).size();
        long ocupadas = unidadeService.contarOcupadas(condominio);
        model.addAttribute("totalUnidades", total);
        model.addAttribute("unidadesOcupadas", ocupadas);
        model.addAttribute("unidadesDisponiveis", total - ocupadas);

        List<Morador> moradoresAtivos = moradorService.listarAtivos(condominio);
        Map<String, String> responsaveis = new HashMap<>();
        Map<String, Integer> qtdMoradores = new HashMap<>();

        for (Morador m : moradoresAtivos) {
            String chave = m.getBloco() + m.getNumero();
            qtdMoradores.merge(chave, 1, Integer::sum);
            if (!responsaveis.containsKey(chave)) {
                responsaveis.put(chave, m.getNome());
            }
        }

        model.addAttribute("responsaveis", responsaveis);
        model.addAttribute("qtdMoradores", qtdMoradores);
        return "unidades";
    }
}
