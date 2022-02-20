import { MongoClient, ObjectId } from 'mongodb';
import { User } from './types';

const users: User[] = [];

export const updateUserNumber = async (roomId: string) => {
  const peopleIn = users.filter((user) => user.roomId === roomId).length;
  const client = await new MongoClient(process.env.MONGODB_URI as string).connect();
  await client
    .db()
    .collection('quizzes')
    .updateOne(
      { _id: new ObjectId(roomId) },
      {
        $set: {
          peopleIn,
        },
      },
    );
  client.close();
};

export const addUser = (
  userName: string,
  userId: string,
  socketId: string,
  roomId: string,
  master?: boolean,
) => {
  const user = {
    name: userName,
    id: userId,
    socketId,
    roomId,
    lives: 3,
    master,
  };
  users.push(user);
  if (!master) {
    updateUserNumber(user.roomId);
  }
};

export const removeUser = (id: string): User | null => {
  let toRemove: User | null = null;
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
  return userToUpdate;
};
