package gameCollection.websockets;

import gameCollection.games.BaseGame;
import gameCollection.games.Hangman;
import gameCollection.utils.GameUtils;
import gameCollection.utils.MessageUtils;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

public class HangmanHandler extends BaseHandler {

    private final Set<BaseGame> hangmanSessions = new HashSet<>();

    @Override
    protected void handleTextMessage(@NotNull WebSocketSession session, TextMessage message) throws Exception {
        String actualMessage = message.getPayload();
        String[] splitMessage = actualMessage.split(MessageUtils.DIVIDER);
        System.out.println(actualMessage);
        handleCreate(session, splitMessage);
        handleJoin(session, splitMessage);
    }

    @Override
    public void handleCreate(@NotNull WebSocketSession session, @NotNull final String[] splitMessage) {
        if (!splitMessage[0].equals(MessageUtils.CREATE)) {
            return;
        }

        final String sessionName = splitMessage[1];
        BaseGame game = GameUtils.getGame(hangmanSessions, sessionName);
        if(game == null) {
            Hangman hangmanSession = new Hangman(sessionName);
            BaseGame.Player player = new BaseGame.Player(session, splitMessage[2]);
            hangmanSession.addPlayer(player);
            hangmanSessions.add(hangmanSession);

            try {
                session.sendMessage(new TextMessage(MessageUtils.CREATED));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

    @Override
    public void handleJoin(@NotNull WebSocketSession session, @NotNull String[] splitMessage) {
        if (!splitMessage[0].equals(MessageUtils.JOIN)) {
            return;
        }

        final String sessionName = splitMessage[1];
        Optional<BaseGame> foundGame = Optional.ofNullable(GameUtils.getGame(hangmanSessions, sessionName));
        foundGame.ifPresent((game) -> {
            BaseGame.Player player = new BaseGame.Player(session, splitMessage[2]);
            game.addPlayer(player);
            try {
                session.sendMessage(new TextMessage(MessageUtils.JOINED));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }
}
