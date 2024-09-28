package gameCollection.websockets;

import gameCollection.games.IBaseGame;
import gameCollection.utils.MessageUtils;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.lang.reflect.Constructor;

import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.lang.reflect.InvocationTargetException;
import java.util.*;

/**
 * The base Class of every WebsocketHandler
 */
public abstract class BaseHandler<T extends IBaseGame> extends TextWebSocketHandler implements IBaseHandler {

    /**
     * Set of game session of a specific game (e.g. only hangman,snake...)
     */
    private final Map<String, T> gameSessions;

    /**
     * Class type of T, needed to instantiated template type.
     */
    private final Class<T> clazz;

    /**
     * Constructor
     *
     * @param clazz {@link T} - class type, in order to instantiate the template type.
     */
    protected BaseHandler(@NotNull final Class<T> clazz) {
        gameSessions = new HashMap<>();
        this.clazz = clazz;
    }

    @Override
    public void sendMessage(@NotNull WebSocketSession session, @NotNull String message) {
        try {
            session.sendMessage(new TextMessage(message));
        } catch (IOException e) {
            throw new RuntimeException("Unable to send message.", e);
        }
    }

    @Override
    protected void handleTextMessage(@NotNull WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        IBaseHandler.ParsedIncomingMessage parsedIncomingMessage = new IBaseHandler.ParsedIncomingMessage(payload);

        String command = parsedIncomingMessage.getCommand();

        if (command.equals(MessageUtils.CREATE_SESSION)) {
            handleCreateSession(session, parsedIncomingMessage);
        } else if (command.equals(MessageUtils.JOIN_SESSION)) {
            handleJoinSession(session, parsedIncomingMessage);
        }
    }

    @Override
    public void handleCreateSession(@NotNull WebSocketSession session, @NotNull ParsedIncomingMessage parsedMessage) {

        String sessionName = parsedMessage.getSessionName();
        T foundGame = gameSessions.get(sessionName);

        if (foundGame == null) {
            T game = createInstance();
            game.addPlayer(new IBaseGame.Player(session, parsedMessage.getClientName()));
            gameSessions.put(parsedMessage.getSessionName(), game);
            sendMessage(session, MessageUtils.CREATED_SESSION);
        }
    }

    @Override
    public void handleJoinSession(@NotNull WebSocketSession session, @NotNull ParsedIncomingMessage parsedMessage) {
        String sessionName = parsedMessage.getSessionName();
        Optional<T> foundGame = Optional.ofNullable(gameSessions.get(sessionName));

        foundGame.ifPresent(game -> {
            IBaseGame.Player player = new IBaseGame.Player(session, parsedMessage.getClientName());
            game.addPlayer(player);
            sendMessage(session, MessageUtils.JOINED_SESSION);
        });
    }

    /**
     * Factory creates an instance of {@link T} from the given parameters.
     *
     * @return An instance of {@link T}.
     * @throws RuntimeException If the corresponding constructor could not be invoked.
     * @throws RuntimeException If the game could not be instantiated.
     * @throws RuntimeException If the constructor could not be accessed.
     * @throws RuntimeException If there is no fitting constructor for a game (that takes a string for a param).
     */
    @NotNull
    private T createInstance() {
        try {
            Constructor<T> constructor = clazz.getConstructor();
            return constructor.newInstance();
        } catch (InvocationTargetException e) {
            throw new RuntimeException("Constructor could not be invoked.", e);
        } catch (InstantiationException e) {
            throw new RuntimeException("Game could not be instantiated.", e);
        } catch (IllegalAccessException e) {
            throw new RuntimeException("Constructor could not be accessed.", e);
        } catch (NoSuchMethodException e) {
            throw new RuntimeException("There is no constructor, which takes a String for a parameter.", e);
        }
    }
}
