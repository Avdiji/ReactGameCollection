package gameCollection;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;


@SpringBootApplication
@EnableAsync
public class Main {
    // TODO replace exceptions with ILLEGAL messages which can inform the client
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}