import { useEffect } from 'react';
import io from 'socket.io-client';
import { BASE_URL } from '../axios/axios';
import { useSelector } from 'react-redux';
import { selectAuth } from '../redux/authSlice/authSlice';

export let socket = io(BASE_URL);

const useSocket = () => {
  const { user } = useSelector(selectAuth);
  useEffect(() => {
    if (user) {
      // socket = io('http://146.190.127.106/service');
      socket.on('connect', () => {});

      socket.emit('user-connected', user.id);

      socket.on('disconnect', () => {});
    }

    return () => {
      if (user) {
        socket.emit('user-disconnected', user.id);
        socket.disconnect();
      }
    };
  }, [user?.id]);

  return null;
};

export default useSocket;
