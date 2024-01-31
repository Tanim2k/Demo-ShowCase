package com.task.project.exceptions;

public class InvalidUser extends RuntimeException{
    public InvalidUser(String message) {
        super(message);
    }
}
