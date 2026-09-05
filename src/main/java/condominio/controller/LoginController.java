package condominio.controller;

import condominio.model.Usuario;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;
import java.util.Arrays;
import java.util.List;

@Controller
public class LoginController {

    private List<Usuario> usuarios = Arrays.asList(
        new Usuario("sindico@condominio.com", "123456", "Vinicius", "jardim"),
        new Usuario("admin@condominio.com", "admin", "Carlos Lima", "parque")
    );

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @PostMapping("/login")
    public String login(@RequestParam String email, 
                        @RequestParam String password, 
                        Model model, 
                        HttpSession session) {
        
        Usuario usuario = usuarios.stream()
                .filter(u -> u.getEmail().equals(email) && u.getSenha().equals(password))
                .findFirst()
                .orElse(null);

        if (usuario != null) {
            session.setAttribute("usuarioLogado", usuario);
            return "redirect:/";
        }

        model.addAttribute("erro", "E-mail ou senha inválidos.");
        return "login";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }
}
