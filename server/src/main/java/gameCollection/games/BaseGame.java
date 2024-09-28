package gameCollection.games;

import org.jetbrains.annotations.NotNull;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

/**
 * Base class, for all games in the collection.
 */
public abstract class BaseGame implements IBaseGame {

    /**
     * Set of players in this game session.
     */
    private final Set<Player> players;

    /**
     * Constructor
     */
    public BaseGame() {
        players = new HashSet<>();
    }

    @Override
    public void addPlayer(@NotNull Player player) {
        players.add(player);
    }

    @Override
    public void broadCast(@NotNull String message) {
        players.forEach((player) -> {
            try (WebSocketSession session = player.wsSession()) {
                session.sendMessage(new TextMessage(message));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }
}
