package com.task.project.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class EmailAlreadyExist  extends RuntimeException{

    public EmailAlreadyExist(String message) {
        super(message);
    }
}
