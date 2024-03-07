import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { COLORS } from '../../helpers/colors';
import PrimaryText from '../PrimaryText';
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';

import sendIcon from '../../assets/images/send.png';

import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/authSlice/authSlice';

import useChat from './useChat';
import { useTranslation } from 'react-i18next';

const Chat = ({ route }) => {
  const { user } = useSelector(selectAuth);
  const {
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
  } = useChat(route.params);
  const { t } = useTranslation();

  const displayDate = (date) => {
    const dateArray = date.split(' ');

    return dateArray.length === 1
      ? t(`date.${date}`)
      : dateArray[0] + ' ' + t(`date.month.${dateArray[1]}`);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => openMenuMessageId && setOpenMenuMessageId(null)}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' && 'padding'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 0}
          style={styles.container}>
          {isLoading ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: 25,
              }}>
              <ActivityIndicator
                size={'large'}
                style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
                color={COLORS.yellow}
              />
            </View>
          ) : (
            <FlatList
              scrollEnabled={!openMenuMessageId}
              data={messages}
              inverted
              contentContainerStyle={{ paddingTop: 20, paddingBottom: 70 }}
              initialNumToRender={20}
              maxToRenderPerBatch={10}
              showsVerticalScrollIndicator={false}
              onEndReached={fetchData}
              keyExtractor={(item) => item.date}
              renderItem={({ item: { date, messages } }) => {
                return (
                  <View>
                    <PrimaryText weight={600} style={styles.date}>
                      {displayDate(date)}
                    </PrimaryText>
                    {messages.map((message, index) => {
                      if (message.userId === user?.id) {
                        return (
                          <SenderMessage
                            key={message.id.toString() + date}
                            setOpenMenuMessageId={setOpenMenuMessageId}
                            data={message}
                            isOpenMenu={message.id === openMenuMessageId}
                            isNextUserSame={messages[index - 1]?.userId === message.userId}
                            onReactToMessage={onReactToMessage}
                            onDeleteMessage={onDeleteMessage}
                          />
                        );
                      }
                      return (
                        <ReceiverMessage
                          key={message.id.toString() + date}
                          setOpenMenuMessageId={setOpenMenuMessageId}
                          data={message}
                          isOpenMenu={message.id === openMenuMessageId}
                          isNextUserSame={messages[index + 1]?.userId === message.userId}
                          onReactToMessage={onReactToMessage}
                        />
                      );
                    })}
                  </View>
                );
              }}
            />
          )}
          <View style={styles.inputView}>
            <TextInput
              value={text}
              onChangeText={setText}
              style={styles.input}
              placeholder={t('chat.write_your_message')}
              placeholderTextColor={COLORS.grey}
            />
            <TouchableOpacity
              style={styles.sendBtn}
              onPress={onSendMessage}
              disabled={!text.trim().length}>
              <Image source={sendIcon} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    paddingHorizontal: 16,
    flex: 1,
  },
  messagesHolder: {
    marginBottom: 30,
  },
  date: {
    color: COLORS.grey,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  inputView: {
    flexDirection: 'row',
    columnGap: 10,
    backgroundColor: 'transparent',
    marginBottom: 15,
    paddingTop: 3,
  },
  input: {
    backgroundColor: COLORS.darkBlue,
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 12,
    color: '#fff',
    flex: 1,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightblue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#111613E5',
    opacity: 0.9,
  },
});

export default Chat;
