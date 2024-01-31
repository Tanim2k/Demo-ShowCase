package com.task.project.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.task.project.dto.UserLoginReqModel;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;


@RequiredArgsConstructor
@Slf4j
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;


    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        try {
            UserLoginReqModel creds = new ObjectMapper().readValue(request.getInputStream(), UserLoginReqModel.class);
            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(creds.getEmail(),creds.getPassword())
            );
        } catch (IOException e) {
            log.info("Exception occurred at attemptAuthentication method: {}",e.getLocalizedMessage());
            throw new RuntimeException(e);
        }
    }
}
