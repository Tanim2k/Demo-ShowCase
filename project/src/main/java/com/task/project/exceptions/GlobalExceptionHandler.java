package com.task.project.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailAlreadyExist.class) //It used in specific Exception
    public ResponseEntity<ExceptionDetails> handleEmailAlreadyExists(EmailAlreadyExist emailAlreadyExists,
                                                                     WebRequest webRequest)
    {
        ExceptionDetails exceptionDetails=new ExceptionDetails(
                LocalDateTime.now(),
                emailAlreadyExists.getMessage(),
                webRequest.getDescription(false),
                "Email is already Taken"
        );
        return new ResponseEntity<>(exceptionDetails, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(ResourceNotFoundException.class) //It used in specific Exception
    public ResponseEntity<ExceptionDetails> handleResourceNotFoundException(ResourceNotFoundException resourceNotFoundException,
                                                                            WebRequest webRequest)
    {
        ExceptionDetails exceptionDetails=new ExceptionDetails(
                LocalDateTime.now(),
                resourceNotFoundException.getMessage(),
                webRequest.getDescription(false),
                "Please Provide Valid Resources"
        );
        return new ResponseEntity<>(exceptionDetails, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InvalidUser.class) //It used in specific Exception
    public ResponseEntity<ExceptionDetails> handleInvalidUsers(InvalidUser invalidUser,
                                                                            WebRequest webRequest)
    {
        ExceptionDetails exceptionDetails=new ExceptionDetails(
                LocalDateTime.now(),
                invalidUser.getMessage(),
                webRequest.getDescription(false),
                "Please Provide Valid email and Password"
        );
        return new ResponseEntity<>(exceptionDetails, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UnAuthorizedException.class) //It used in specific Exception
    public ResponseEntity<ExceptionDetails> handleUnAuthorizedException(UnAuthorizedException invalidUser,
                                                               WebRequest webRequest)
    {
        ExceptionDetails exceptionDetails=new ExceptionDetails(
                LocalDateTime.now(),
                invalidUser.getMessage(),
                webRequest.getDescription(false),
                "You are not Authorized to do that"
        );
        return new ResponseEntity<>(exceptionDetails, HttpStatus.NOT_FOUND);
    }
}
