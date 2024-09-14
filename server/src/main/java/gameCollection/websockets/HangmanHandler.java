package gameCollection.websockets;

import gameCollection.games.Hangman;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashSet;
import java.util.Set;

public class HangmanHandler extends TextWebSocketHandler {

    private Set<Hangman> hangmanSessions = new HashSet<>();

    @Override
    protected void handleTextMessage(@NotNull WebSocketSession session, TextMessage message) throws Exception {
        String actualMessage = message.getPayload();
        System.out.println(actualMessage);
        session.sendMessage(new TextMessage("gamesize: " + actualMessage));
    }
}
