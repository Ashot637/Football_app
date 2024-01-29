import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/authSlice/authSlice';
import { useCallback, useEffect, useState } from 'react';
import { socket } from '../../hooks/useSocket';
import axios from '../../axios/axios';
import { format, isToday, isYesterday } from 'date-fns';

const PAGE = 2;

const useChat = (params) => {
  const { groupId, groupTitle } = params;
  const { user } = useSelector(selectAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [openMenuMessageId, setOpenMenuMessageId] = useState(null);
  const [page, setPage] = useState(PAGE);
  const [isFetchingMoreData, setIsFetchingMoreData] = useState(false);

  const fetchData = () => {
    if (!isFetchingMoreData) {
      setIsFetchingMoreData(true);
      axios
        .get('/message/getGroupMessages', { params: { groupId, limit: 20, page } })
        .then(({ data }) => {
          if (data.length) {
            const groupedMessages = data.reduce((acc, message) => {
              const messageDate = new Date(message.createdAt);
              let formattedDate;

              if (isToday(messageDate)) {
                formattedDate = 'Today';
              } else if (isYesterday(messageDate)) {
                formattedDate = 'Yesterday';
              } else {
                formattedDate = format(messageDate, 'dd MMM');
              }

              if (!acc[formattedDate]) {
                acc[formattedDate] = [];
              }

              acc[formattedDate].push(message);
              return acc;
            }, {});

            const groupedMessagesArray = Object.entries(groupedMessages).map(
              ([date, messages]) => ({
                date,
                messages,
              }),
            );

            const mergedMessagesArray = [...messages];
            const arr = [];

            groupedMessagesArray.forEach(({ date, messages }) => {
              const existingGroupIndex = mergedMessagesArray.findIndex(
                (group) => group.date === date,
              );

              if (existingGroupIndex !== -1) {
                mergedMessagesArray[existingGroupIndex].messages = [
                  ...messages,
                  ...(mergedMessagesArray[existingGroupIndex].messages || []),
                ];
              } else {
                arr.push({ date, messages });
              }
            });

            setMessages([...mergedMessagesArray, ...arr]);
            setIsFetchingMoreData(false);
          } else {
            setIsFetchingMoreData(true);
          }
        })
        .finally(() => {
          setPage((prev) => prev + 1);
        });
    }
  };

  useEffect(() => {
    setPage(PAGE);
    setIsLoading(true);
    onReadMessages();
    axios
      .get('/message/getGroupMessages', { params: { groupId, limit: 20 } })
      .then(({ data }) => {
        const groupedMessages = data.reduce((acc, message) => {
          const messageDate = new Date(message.createdAt);
          let formattedDate;

          if (isToday(messageDate)) {
            formattedDate = 'Today';
          } else if (isYesterday(messageDate)) {
            formattedDate = 'Yesterday';
          } else {
            formattedDate = format(messageDate, 'dd MMM');
          }

          if (!acc[formattedDate]) {
            acc[formattedDate] = [];
          }

          acc[formattedDate].push(message);
          return acc;
        }, {});
        const groupedMessagesArray = Object.entries(groupedMessages).map(([date, messages]) => ({
          date,
          messages: messages.reverse(),
        }));
        setMessages(groupedMessagesArray);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onReadMessages = () => {
    axios.post('/message/readGroupMessages', { groupId });
  };

  useEffect(() => {
    socket.emit('join-group', { groupId, userId: user.id });
    socket.on('new-message', (newMessage) => {
      setMessages((prev) => {
        const isThereToday = prev.find((group) => group['date'] === 'Today');
        const updatedMessages = prev.map((group) => {
          if (group['date'] === 'Today') {
            return {
              date: 'Today',
              messages: [...(group.messages || []), newMessage],
            };
          }

          return group;
        });

        return isThereToday
          ? updatedMessages
          : [
              {
                date: 'Today',
                messages: [newMessage],
              },
              ...updatedMessages,
            ];
      });
      onReadMessages();
    });
    socket.on('react-to-message', ({ messageId, user }) => {
      setMessages((prev) => {
        const updatedMessages = prev.map((group) => {
          if (group.messages.some((message) => +message.id === +messageId)) {
            const updatedGroupMessages = group.messages.map((message) => {
              if (+message.id === +messageId) {
                let alreadyLiked = message.likedUsers?.find((u) => u.id === user.id);
                return {
                  ...message,
                  likedUsers: alreadyLiked
                    ? message.likedUsers.filter((u) => u.id !== user.id)
                    : [user, ...(message.likedUsers || [])],
                };
              }
              return message;
            });

            return {
              ...group,
              messages: updatedGroupMessages,
            };
          }

          return group;
        });

        return updatedMessages;
      });
    });
    socket.on('delete-message', (messageId) =>
      setMessages((prev) => {
        const updatedMessages = prev.map((group) => {
          if (group.messages.some((message) => +message.id === +messageId)) {
            const updatedGroupMessages = group.messages.filter(
              (message) => +message.id !== +messageId,
            );

            return {
              ...group,
              messages: updatedGroupMessages,
            };
          }

          return group;
        });

        return updatedMessages;
      }),
    );
    return () => {
      socket.emit('leave-group', { groupId, userId: user.id });
    };
  }, []);

  const onSendMessage = () => {
    const id = Date.now();
    axios.post('/message/send', { text, groupId, id, groupTitle, userName: user.name });
    const newMessage = {
      id: +id,
      text,
      userId: user.id,
      createdAt: new Date(),
      likedUsers: [],
      user: { img: user.img },
    };

    setMessages((prev) => {
      const isThereToday = prev.find((group) => group['date'] === 'Today');
      const updatedMessages = prev.map((group) => {
        if (group['date'] === 'Today') {
          return {
            date: 'Today',
            messages: [...(group.messages || []), newMessage],
          };
        }

        return group;
      });

      return isThereToday
        ? updatedMessages
        : [
            {
              date: 'Today',
              messages: [newMessage],
            },
            ...updatedMessages,
          ];
    });

    setText('');
    setOpenMenuMessageId(null);
  };

  const onDeleteMessage = useCallback(
    (id) => {
      axios.post('/message/delete', { messageId: id, groupId });
      setMessages((prev) => {
        const updatedMessages = prev.map((group) => {
          if (group.messages.some((message) => +message.id === +id)) {
            const updatedGroupMessages = group.messages.filter((message) => message.id !== id);

            return {
              ...group,
              messages: updatedGroupMessages,
            };
          }

          return group;
        });

        return updatedMessages;
      });
      // setMessages((prev) => prev.filter((message) => message.id !== id));
      setOpenMenuMessageId(null);
    },
    [groupId],
  );

  const onReactToMessage = useCallback(
    (id) => {
      axios.post('/message/react', { messageId: id, groupId });
      setMessages((prev) => {
        const updatedMessages = prev.map((group) => {
          if (group.messages.some((message) => message.id === id)) {
            const updatedGroupMessages = group.messages.map((message) => {
              if (message.id === id) {
                let alreadyLiked = message.likedUsers?.find((u) => u.id === user.id);
                return {
                  ...message,
                  likedUsers: alreadyLiked
                    ? message.likedUsers.filter((u) => u.id !== user.id)
                    : [user, ...(message.likedUsers || [])],
                };
              }
              return message;
            });

            return {
              ...group,
              messages: updatedGroupMessages,
            };
          }

          return group;
        });

        return updatedMessages;
      });
      // prev.map((message) => {
      //   if (message.id === id) {
      //     let alreadyLiked = message.likedUsers?.find((u) => u.id === user.id);
      //     return {
      //       ...message,
      //       likedUsers: alreadyLiked
      //         ? message.likedUsers.filter((u) => u.id !== user.id)
      //         : [user, ...(message.likedUsers || [])],
      //     };
      //   }
      //   return message;
      // }),
      // );
      setOpenMenuMessageId(null);
    },
    [groupId],
  );

  return {
    openMenuMessageId,
    setOpenMenuMessageId,
    isLoading,
    messages,
    fetchData,
    onReactToMessage,
    onSendMessage,
    onDeleteMessage,
    text,
    setText,
  };
};

export default useChat;
