package com.task.project.service.impl;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
public class UsernameGenaratorService {

    private static final String[] WORDS = {"spring", "java", "boot", "random", "username", "example", "code", "developer"};
    private static final SecureRandom random = new SecureRandom();

    public String generateRandomUsername() {
        StringBuilder username = new StringBuilder();

        // Randomly select words from the WORDS array
        for (int i = 0; i < 2; i++) {
            int randomIndex = random.nextInt(WORDS.length);
            username.append(WORDS[randomIndex]);
        }

        // Add a random number to make it unique
        username.append(random.nextInt(1000));

        return username.toString();
    }
}
