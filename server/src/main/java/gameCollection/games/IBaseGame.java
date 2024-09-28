package gameCollection.games;

import org.jetbrains.annotations.NotNull;
import org.springframework.web.socket.WebSocketSession;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

/**
 * Interface, represents a Game of the Game-Collection.
 */
public interface IBaseGame {

    /**
     * @return The minimum amount of players required for this game.
     */
    int getMinPlayerCount();

    /**
     * @return The maximum amount of players allowed for this game.
     */
    int getMaxPlayerCount();

    /**
     * Method adds a player to the session. If the player has already joined the session nothing happens.
     *
     * @param player Player to be added to the session.
     * @return True if the player was added, else false.
     */
    boolean addPlayer(@NotNull final Player player);

    /**
     * Method broadcasts a message to all players in the session.
     *
     * @param message Message to be broadcast.
     * @throws RuntimeException If message could not be broadcast.
     */
    void broadCast(@NotNull final String message);

    /**
     * Factory creates an instance of {@link IBaseGame} from the given parameters.
     *
     * @param clazz Class type of the game to be created.
     * @return An instance of {@link T}.
     * @throws RuntimeException If the corresponding constructor could not be invoked.
     * @throws RuntimeException If the game could not be instantiated.
     * @throws RuntimeException If the constructor could not be accessed.
     * @throws RuntimeException If there is no fitting constructor for a game (that takes a string for a param).
     */
    @NotNull
    static <T extends IBaseGame> T createGame(@NotNull final Class<T> clazz) {
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

    /**
     * Player object.
     *
     * @param wsSession  The player session.
     * @param clientName The player's name.
     */
    record Player(WebSocketSession wsSession, String clientName) {
        public Player(@NotNull final WebSocketSession wsSession, @NotNull final String clientName) {
            this.wsSession = wsSession;
            this.clientName = clientName;
        }
    }
}

