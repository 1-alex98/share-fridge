package com.sharefridge;

import org.springframework.core.io.FileSystemResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.ServletForwardingController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
public class AngularController {

    @GetMapping(value = "/app/**/{path:[^.]*}")
    public ModelAndView redirect() {
        return new ModelAndView("forward:/app/");
    }

    @GetMapping(value = "/")
    public RedirectView redirectToApp() {
        return new RedirectView("/app");
    }
    @GetMapping(value = "/app")
    public ModelAndView redirectToHtml() {
        return new ModelAndView("forward:/app/index.html");
    }

}
