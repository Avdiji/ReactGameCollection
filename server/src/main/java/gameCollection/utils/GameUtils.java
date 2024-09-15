package gameCollection.utils;

import gameCollection.games.BaseGame;
import org.jetbrains.annotations.Nullable;

import java.util.Set;

public class GameUtils {

    private GameUtils() {
    }

    @Nullable
    public static BaseGame getGame(final Set<BaseGame> games, final String sessionName) {
        return games.stream()
                .filter(session -> session.getRoomName().equals(sessionName))
                .findAny()
                .orElse(null);
    }
}
