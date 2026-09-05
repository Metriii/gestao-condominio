package condominio.controller;

import condominio.model.Usuario;
import condominio.model.Ocorrencia;
import condominio.service.OcorrenciaService;
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
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Controller
public class OcorrenciaController {

    @Autowired
    private OcorrenciaService ocorrenciaService;

    @GetMapping("/ocorrencias")
    public String listarOcorrencias(Model model, HttpSession session) {
        Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        if (usuario == null) return "redirect:/login";
        String condominio = usuario.getCondominio();
        model.addAttribute("usuario", usuario);
        model.addAttribute("ocorrencias", ocorrenciaService.listarTodas(condominio));
        model.addAttribute("totalOcorrencias", ocorrenciaService.listarTodas(condominio).size());
        model.addAttribute("ocorrenciasEmAnalise", ocorrenciaService.contarPorStatus(condominio, "Em analise"));
        model.addAttribute("ocorrenciasEmAndamento", ocorrenciaService.contarPorStatus(condominio, "Em andamento"));
        model.addAttribute("ocorrenciasAbertas", ocorrenciaService.contarAbertas(condominio));
        return "ocorrencias";
    }

    @GetMapping("/ocorrencias/nova")
    public String registrarOcorrencia(Model model, HttpSession session) {
        Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        if (usuario == null) return "redirect:/login";
        model.addAttribute("usuario", usuario);
        Ocorrencia ocorrencia = new Ocorrencia();
        ocorrencia.setCondominio(usuario.getCondominio());
        model.addAttribute("ocorrencia", ocorrencia);
        return "registrar-ocorrencia";
    }

    @PostMapping("/ocorrencias")
    public String salvarOcorrencia(@ModelAttribute Ocorrencia ocorrencia, HttpSession session) {
        Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        if (usuario == null) return "redirect:/login";
        ocorrencia.setCondominio(usuario.getCondominio());
        ocorrencia.setStatus("Em analise");
        if (ocorrencia.getData() == null || ocorrencia.getData().isEmpty()) {
            ocorrencia.setData(LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        }
        ocorrenciaService.salvar(ocorrencia);
        return "redirect:/ocorrencias";
    }

    @PostMapping("/ocorrencias/{id}/status")
    @ResponseBody
    public String toggleStatus(@PathVariable int id, @RequestParam String status, HttpSession session) {
        Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        if (usuario == null) return "error";
        String condominio = usuario.getCondominio();
        Ocorrencia ocorrencia = ocorrenciaService.buscarPorId(id, condominio);
        if (ocorrencia != null) {
            ocorrencia.setStatus(status);
            ocorrenciaService.atualizar(ocorrencia);
            return "ok";
        }
        return "error";
    }
}
