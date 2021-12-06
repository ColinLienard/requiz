import { User } from './types';

const users: User[] = [];

export const addUser = (
  userName: string,
  userId: string,
  socketId: string,
  roomId: string,
) => {
  const user = {
    name: userName,
    id: userId,
    socketId,
    roomId,
    lives: 3,
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

export const getUsers = (room: string): User[] => users.filter((user) => user.roomId === room);

export const findUser = (id: string): User => users.filter((user) => user.socketId === id)[0];

export const updateUser = (id: string, correctResponse: boolean): User => {
  const userToUpdate = findUser(id);
  if (!correctResponse) {
    userToUpdate.lives -= 1;
  }
  // users.forEach((user, index) => {
  //   if (id === user.socketId) {
  //     users.splice(index, 1, userToUpdate);
  //   }
  // });
  return userToUpdate;
};
