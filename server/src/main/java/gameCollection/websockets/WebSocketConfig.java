package gameCollection.websockets;

import gameCollection.games.Hangman;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import java.util.HashSet;
import java.util.Set;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(getHangmanHandler(), "/springGame/hangman").setAllowedOrigins("*");
    }

    @Bean
    public HangmanHandler getHangmanHandler() {
        return new HangmanHandler();
    }
}
