import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { COLORS } from '../../helpers/colors';
import PrimaryText from '../PrimaryText';
import Message from './Message';

const messages = [
  {
    name: 'Daniel',
    text: 'Hello!',
  },
  {
    name: 'Daniel',
    text: 'Hello!',
  },
  {
    name: 'You',
    text: 'Hello!',
  },
  {
    name: 'Daniel',
    text: 'Hello!',
  },
  {
    name: 'You',
    text: 'Hello!',
  },
  {
    name: 'You',
    text: 'Hello!',
  },
  {
    name: 'You',
    text: 'Hello!',
  },
  {
    name: 'You',
    text: 'Hello!',
  },
  {
    name: 'You',
    text: 'Hello!',
  },
];

const Chat = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.messagesHolder}>
          <View style={styles.block}>
            <PrimaryText weight={600} style={styles.date}>
              Today
            </PrimaryText>
            {messages.map((message, index) => {
              return <Message key={index} user={message} me={message.name === 'You'} />;
            })}
          </View>
        </View>
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="Write your message"
        placeholderTextColor={COLORS.grey}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    paddingHorizontal: 16,
    paddingBottom: 15,
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
    position: 'absolute',
    bottom: 0,
  },
  input: {
    backgroundColor: COLORS.darkBlue,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    color: '#fff',
  },
});

export default Chat;
