package gameCollection.websockets;

import gameCollection.utils.MessageUtils;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.util.Arrays;

/**
 * Interface declares, all methods for the BaseHandler of the websockets.
 */
public interface IBaseHandler {

    /**
     * @param session The corresponding websocket session.
     * @param message The message to be sent.
     * @throws RuntimeException If the message could not be sent.
     */
    void sendMessage(@NotNull final WebSocketSession session, @NotNull final String message);

    /**
     * Method handles the 'create_session' command.
     *
     * @param session       The corresponding websocket session.
     * @param parsedMessage The parsed incoming message.
     */
    void handleCreateSession(@NotNull final WebSocketSession session, @NotNull final ParsedIncomingMessage parsedMessage);

    /**
     * Method handles the 'join_session' command.
     *
     * @param session       The corresponding websocket session.
     * @param parsedMessage The parsed incoming message.
     */
    void handleJoinSession(@NotNull final WebSocketSession session, @NotNull final ParsedIncomingMessage parsedMessage);

    /**
     * Class parses incoming messages into 4 parts.
     * 1. The command
     * 2. The session name
     * 3. The client name
     * 4. additional configurations.
     * <p>
     * The parser trusts, that all incoming messages align with that specification.
     */
    class ParsedIncomingMessage {

        private final String command;
        private final String sessionName;
        private final String clientName;
        private final String[] additionalConfigurations;

        /**
         * Constructor
         *
         * @param actualPayload The actual incoming message.
         * @throws RuntimeException If the incoming message is not valid.
         */
        public ParsedIncomingMessage(@NotNull final String actualPayload) {
            String[] split = actualPayload.split(MessageUtils.DIVIDER);
            if (split.length < 3) {
                throw new RuntimeException("The incoming message is not valid.");
            }

            command = split[0];
            sessionName = split[1];
            clientName = split[2];
            additionalConfigurations = Arrays.copyOfRange(split, 3, split.length);
        }

        // Getter
        public String getCommand() {return command;}

        public String getSessionName() {return sessionName;}

        public String getClientName() {return clientName;}

        public String[] getAdditionalConfigurations() {return additionalConfigurations;}
    }

}
