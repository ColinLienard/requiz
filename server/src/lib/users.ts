import { User } from './types';

const users: User[] = [];

export const addUser = (
  userName: string,
  userId: number,
  socketId: string,
  room: string,
) => {
  const user = {
    userName,
    userId,
    socketId,
    room,
  };
  users.push(user);
};

export const removeUser = (id: string): User | null => {
  let toRemove = null;
  users.forEach((user, index) => {
    if (id === user.socketId) {
      [toRemove] = users.splice(index, 1);
    }
  });
  return toRemove;
};

export const getUsers = (room: string) => users.filter((user) => user.room === room);

// export const findUser = (id) => users.filter((user) => user.id === id);
