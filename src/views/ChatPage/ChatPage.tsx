import Chat, { Bubble, MessageProps, useMessages } from "@chatui/core";
import "@chatui/core/dist/index.css";
import {
  addDoc,
  collection,
  Timestamp,
  query,
  orderBy,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "src/store/accountReducer";
import { db, hashCode, intToRGB, emailToUsername } from "src/utils";
import { Text } from "@mantine/core";
import { useSnackbar } from "notistack";

interface DataType {
  _id?: string;
  content?: { text: string };
  createdAt?: any;
  type?: string;
  position?: "left" | "right";
  hasDate?: boolean;
  user?: {
    username?: string;
    id?: string;
    name?: string;
  };
}

export const ChatPage = () => {
  const user = useSelector((state: State) => state.account).user;
  const { enqueueSnackbar } = useSnackbar();
  const { messages, prependMsgs, appendMsg } = useMessages([]);

  useEffect(() => {
    const getData = async () => {
      const messagesRef = collection(db, "messages");
      const q = query(messagesRef, orderBy("createdAt"));

      const querySnapshot = await getDocs(q);

      let tempData: DataType[] = [];

      querySnapshot.forEach((messageItem) => {
        if (messageItem.exists()) {
          const data = messageItem.data();

          tempData.push({
            _id: messageItem.id,
            position: data.user.id === user.id ? "right" : "left",
            hasDate: true,
            content: { text: data.content.text },
            type: data.type,
            createdAt: new Timestamp(
              data.createdAt.seconds,
              data.createdAt.nanoseconds
            ).toDate(),
            user: data.user,
          });
        }
      });

      prependMsgs(tempData as unknown as any);
      window.scrollTo(0, document.body.scrollHeight);
    };

    getData();
  }, [prependMsgs, user.id]);

  const handleSend = async (type: string, val: string) => {
    if (type === "text" && val.trim()) {
      try {
        const response = await addDoc(collection(db, "messages"), {
          type: "text",
          content: { text: val },
          createdAt: Timestamp.now(),
          user: {
            id: user.id,
            name: user.name,
            username: emailToUsername(user.email),
          },
        });

        if (response.id) {
          const docSnap = await getDoc(doc(db, "messages", response.id));

          if (docSnap.exists()) {
            const data = docSnap.data();

            appendMsg({
              type: data.type,
              content: data.content,
              position: "right",
              createdAt: new Timestamp(
                data.createdAt.seconds,
                data.createdAt.nanoseconds
              ).toMillis(),
              user: data.user,
            });

            window.scrollTo(0, document.body.scrollHeight);
          }
        }
      } catch (error: any) {
        enqueueSnackbar(error.message, {
          variant: "error",
        });
      }
    }
  };

  const renderMessageContent = (msg: MessageProps) => {
    const { content } = msg;

    if (msg.position === "right") {
      return <Bubble content={content.text} />;
    }

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Text
          size="sm"
          weight={500}
          color={`#${intToRGB(hashCode(msg.user?.name as string))}`}
        >
          {msg.user?.name}
        </Text>
        <Bubble content={content.text} />
      </div>
    );
  };

  return (
    <Chat
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
      placeholder="Type a message"
      locale="en"
    />
  );
};
