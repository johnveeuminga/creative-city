import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export type SendMessage = (message: string) => void;

const useAppSync = ({
  channelName
}: {
  channelName: string
}) => {
  const [lastMessage, setLastMessage] = useState<WebSocketEventMap['message'] | null>(null);
  const [readyState, setReadyState] = useState<boolean>(false);

  const sendMessage: SendMessage = useCallback((message) => {
    if(!webSocket.current)
      throw new Error('Websocket was not initialized')

    webSocket.current.send(message);
    }, [])


  const webSocket = useRef<WebSocket | null>();
  const connectionId = useRef<string | null>()

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("idToken="))
      ?.split("=")[1];

    const header = {
      "Authorization": token,
      "host": process.env.NEXT_PUBLIC_APPSYNC_HOST
    }

    const payload = {}

    const headerEncoded = btoa(JSON.stringify(header))
    const payloadEncoded = btoa(JSON.stringify(payload))

    const url = `${process.env.NEXT_PUBLIC_WSS_URL}?header=${headerEncoded}&payload=${payloadEncoded}`
    webSocket.current = new WebSocket(url, ['graphql-ws'])

    webSocket.current.onopen = () => {
      if(!webSocket.current)
        throw new Error('Websocket not ready') 

      webSocket.current.send(JSON.stringify({
        type: "connection_init"
      }))
    }

    webSocket.current.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if(!webSocket.current) 
        throw new Error("Websocket not ready");

      if(data.type === 'connection_ack') {
        connectionId.current = uuidv4();

        // Attempt to subscribe
        const query = {
          "query": `subscription SubscribeToData($channel: String!) {
            subscribe(name: $channel) {
              name
              data
            }
          }`,
          variables: {
            channel: channelName,
          }
        }

        const connection = {
          id: connectionId.current,
          payload: {
            data: JSON.stringify(query),
            extensions: {
              authorization: header,
            },

          },
          type: "start"
        }

        const connectionString = JSON.stringify(connection);
        webSocket.current.send(connectionString);
      } else if (data.type === "data"){
        setLastMessage(event);
      } else if (data.type === "start_ack") {
        setReadyState(true);
      }
    }

    return () => {
      if(webSocket.current) {
        webSocket.current.close();
        setReadyState(false);
        webSocket.current = null;
      }
    }
  }, [sendMessage, channelName])

  return {
    sendMessage,
    lastMessage,
    webSocket,
  }
}

export {
  useAppSync,
};