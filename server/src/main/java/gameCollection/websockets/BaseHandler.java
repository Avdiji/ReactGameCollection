package gameCollection.websockets;

import org.jetbrains.annotations.NotNull;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public abstract class BaseHandler extends TextWebSocketHandler {

    public abstract void handleCreate(@NotNull WebSocketSession session, @NotNull final String[] splitMessage);
    public abstract void handleJoin(@NotNull WebSocketSession session, @NotNull final String[] splitMessage);


}
