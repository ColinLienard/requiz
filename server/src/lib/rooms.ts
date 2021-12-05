import { MongoClient, ObjectId } from 'mongodb';
import { RoomState, Room } from './types';

const rooms: Room[] = [];

export const createRoom = async (id: string) => {
  const client = await new MongoClient(process.env.MONGODB_URI as string).connect();
  const response = await client.db().collection('quizzes').findOne({ _id: new ObjectId(id) });
  if (response) {
    const {
      title,
      description,
      theme,
      maxPlayers,
      startDate,
      questions,
    } = response;
    rooms.push({
      id,
      state: 'waiting',
      timer: null,
      title,
      description,
      theme,
      maxPlayers,
      startDate,
      questions,
    });
    return true;
  }
  return false;
};

export const getRoom = (id: string): Room => rooms.filter((room) => room.id === id)[0];

export const updateRoomState = (name: string, newState: RoomState) => {
  const room = getRoom(name);
  room.state = newState;
};

export const deleteRoom = (id: string) => {
  rooms.forEach((room, index) => {
    if (room.id === id) {
      rooms.splice(index, 1);
    }
  });
};
