package condominio.controller;

import condominio.model.Usuario;
import condominio.model.Morador;
import condominio.service.MoradorService;
import condominio.service.UnidadeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Arrays;

@Controller
public class MoradorController {

    @Autowired
    private MoradorService moradorService;

    @Autowired
    private UnidadeService unidadeService;

    @GetMapping("/moradores")
    public String listarMoradores(Model model, HttpSession session, HttpServletResponse response) {
        Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        if (usuario == null) return "redirect:/login";
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        response.setHeader("Pragma", "no-cache");
        response.setDateHeader("Expires", 0);
        String condominio = usuario.getCondominio();
        model.addAttribute("usuario", usuario);
        model.addAttribute("moradores", moradorService.listarTodos(condominio));
        return "moradores";
    }

    @GetMapping("/moradores/novo")
    public String cadastroMorador(Model model, HttpSession session) {
        Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        if (usuario == null) return "redirect:/login";
        String condominio = usuario.getCondominio();
        model.addAttribute("usuario", usuario);
        model.addAttribute("blocos", unidadeService.listarBlocos(condominio));
        model.addAttribute("numeros", Arrays.asList("101", "102", "201", "202", "301", "302", "401", "402"));
        Morador morador = new Morador();
        morador.setCondominio(condominio);
        model.addAttribute("morador", morador);
        return "cadastro-morador";
    }

    @PostMapping("/moradores")
    public String salvarMorador(@ModelAttribute Morador morador, HttpSession session) {
        Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        if (usuario == null) return "redirect:/login";
        String condominio = usuario.getCondominio();
        morador.setCondominio(condominio);
        morador.setSituacao("Ativo");
        morador.setUnidade(morador.getBloco() + ", " + morador.getNumero());
        morador.setVagasGaragem("01 vaga");
        morador.setMoradoresUnidade(1);
        if (morador.getTipo() == null || morador.getTipo().isEmpty()) {
            morador.setTipo("Proprietario");
        }
        java.time.LocalDate hoje = java.time.LocalDate.now();
        String[] meses = {"janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"};
        morador.setDataCadastro(hoje.getDayOfMonth() + " de " + meses[hoje.getMonthValue() - 1] + " de " + hoje.getYear());
        moradorService.salvar(morador);
        unidadeService.atualizarSituacao(morador.getBloco(), morador.getNumero(), condominio, "Ocupada");
        return "redirect:/moradores";
    }

    @GetMapping("/moradores/{id}")
    public String detalhesMorador(@PathVariable int id, Model model, HttpSession session) {
        Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        if (usuario == null) return "redirect:/login";
        String condominio = usuario.getCondominio();
        Morador morador = moradorService.buscarPorId(id, condominio);
        if (morador != null) {
            model.addAttribute("usuario", usuario);
            model.addAttribute("morador", morador);
            return "morador";
        }
        return "redirect:/moradores";
    }

    @GetMapping("/moradores/{id}/editar")
    public String editarMorador(@PathVariable int id, Model model, HttpSession session) {
        Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        if (usuario == null) return "redirect:/login";
        String condominio = usuario.getCondominio();
        Morador morador = moradorService.buscarPorId(id, condominio);
        if (morador != null) {
            model.addAttribute("usuario", usuario);
            model.addAttribute("morador", morador);
            model.addAttribute("blocos", unidadeService.listarBlocos(condominio));
            model.addAttribute("numeros", Arrays.asList("101", "102", "201", "202", "301", "302", "401", "402"));
            return "editar-morador";
        }
        return "redirect:/moradores";
    }

    @PostMapping("/moradores/{id}/editar")
    public String atualizarMorador(@PathVariable int id, @ModelAttribute Morador dadosForm, HttpSession session) {
        Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        if (usuario == null) return "redirect:/login";
        String condominio = usuario.getCondominio();
        Morador existente = moradorService.buscarPorId(id, condominio);
        if (existente == null) return "redirect:/moradores";
        
        String blocoAnterior = existente.getBloco();
        String numeroAnterior = existente.getNumero();
        
        existente.setNome(dadosForm.getNome());
        existente.setEmail(dadosForm.getEmail());
        existente.setCpf(dadosForm.getCpf());
        existente.setTelefone(dadosForm.getTelefone());
        existente.setBloco(dadosForm.getBloco());
        existente.setNumero(dadosForm.getNumero());
        existente.setUnidade(dadosForm.getBloco() + ", " + dadosForm.getNumero());
        moradorService.atualizar(existente);
        
        if (!blocoAnterior.equals(dadosForm.getBloco()) || !numeroAnterior.equals(dadosForm.getNumero())) {
            long moradoresAtivosNaUnidadeAnterior = moradorService.listarAtivos(condominio).stream()
                    .filter(m -> m.getBloco().equals(blocoAnterior) && m.getNumero().equals(numeroAnterior))
                    .count();
            if (moradoresAtivosNaUnidadeAnterior == 0) {
                unidadeService.atualizarSituacao(blocoAnterior, numeroAnterior, condominio, "Disponivel");
            }
            unidadeService.atualizarSituacao(dadosForm.getBloco(), dadosForm.getNumero(), condominio, "Ocupada");
        }
        
        return "redirect:/moradores";
    }

    @PostMapping("/moradores/{id}/situacao")
    @ResponseBody
    public String toggleSituacao(@PathVariable int id, @RequestParam String situacao, HttpSession session) {
        Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        if (usuario == null) return "error";
        String condominio = usuario.getCondominio();
        Morador morador = moradorService.buscarPorId(id, condominio);
        if (morador != null) {
            String situacaoAnterior = morador.getSituacao();
            morador.setSituacao(situacao);
            moradorService.atualizar(morador);

            if (!situacaoAnterior.equals(situacao)) {
                String bloco = morador.getBloco();
                String numero = morador.getNumero();
                long moradoresAtivosNaUnidade = moradorService.listarAtivos(condominio).stream()
                        .filter(m -> m.getBloco().equals(bloco) && m.getNumero().equals(numero))
                        .count();

                if (moradoresAtivosNaUnidade > 0) {
                    unidadeService.atualizarSituacao(bloco, numero, condominio, "Ocupada");
                } else {
                    unidadeService.atualizarSituacao(bloco, numero, condominio, "Disponivel");
                }
            }
            return "ok";
        }
        return "error";
    }

    @PostMapping("/moradores/{id}/excluir")
    public String excluirMorador(@PathVariable int id, HttpSession session) {
        Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        if (usuario == null) return "redirect:/login";
        String condominio = usuario.getCondominio();
        Morador morador = moradorService.buscarPorId(id, condominio);
        if (morador != null) {
            String bloco = morador.getBloco();
            String numero = morador.getNumero();
            moradorService.excluir(id, condominio);
            
            long moradoresAtivosNaUnidade = moradorService.listarAtivos(condominio).stream()
                    .filter(m -> m.getBloco().equals(bloco) && m.getNumero().equals(numero))
                    .count();
            if (moradoresAtivosNaUnidade == 0) {
                unidadeService.atualizarSituacao(bloco, numero, condominio, "Disponivel");
            }
        }
        return "redirect:/moradores";
    }
}
