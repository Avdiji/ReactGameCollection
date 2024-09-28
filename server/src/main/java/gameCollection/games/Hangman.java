package gameCollection.games;

import org.jetbrains.annotations.NotNull;

/**
 * Hangman game.
 */
public class Hangman extends BaseGame {
    public Hangman() {
        super();
    }

    @Override
    public int getMinPlayerCount() {
        return 1;
    }

    @Override
    public int getMaxPlayerCount() {
        return 99;
    }
}
