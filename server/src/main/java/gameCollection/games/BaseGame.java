package gameCollection.games;

import org.jetbrains.annotations.NotNull;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

/**
 * Base class, represents all games of the gameCollection.
 */
public abstract class BaseGame {

    /**
     * Set of Players in the current game
     **/
    private Set<Player> players;

    /**
     * Name of this game session (must be unique).
     */
    private final String roomName;

    /**
     * @param roomName Name of the game session.
     */
    public BaseGame(@NotNull final String roomName) {
        this.roomName = roomName;
        players = new HashSet<>();
    }

    /**
     * @return The name of this game session.
     */
    public String getRoomName() {
        return roomName;
    }

    /**
     * @return Set of all connected players.
     */
    public Set<Player> getPlayers() {
        return players;
    }

    /**
     * @param player Player to be added to the game.
     * @throws IllegalArgumentException If the player already joined the game.
     */
    public void addPlayer(@NotNull final Player player) {
        boolean playerIsNew = players.add(player);

        if (!playerIsNew) {
            throw new IllegalArgumentException("The player already joined the game session");
        }
    }

    /**
     * @param player Player to be removed from the game.
     */
    public void removePlayer(@NotNull final Player player) {
        players.remove(player);
    }

    /**
     * Method broadcasts a message to all players.
     *
     * @param message The message to broadcast.
     * @throws RuntimeException If the message could not be broadcast.
     */
    public void broadcastMessage(@NotNull final String message) {
        players.forEach(player -> {
            try {
                player.wsSession.sendMessage(new TextMessage(message));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }

    /**
     * Player object.
     *
     * @param wsSession  The player session.
     * @param clientName The player's name.
     */
    public record Player(WebSocketSession wsSession, String clientName) {
        public Player(@NotNull final WebSocketSession wsSession, @NotNull final String clientName) {
            this.wsSession = wsSession;
            this.clientName = clientName;
        }
    }
}
