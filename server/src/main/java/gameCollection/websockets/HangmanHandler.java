package gameCollection.websockets;

import gameCollection.games.Hangman;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

public class HangmanHandler extends BaseHandler<Hangman> {

    /**
     * Constructor
     */
    public HangmanHandler() {
        super(Hangman.class);
    }

    @Override
    protected void handleTextMessage(@NotNull final WebSocketSession session, @NotNull final TextMessage message) throws Exception {
        super.handleTextMessage(session, message);
    }

}
