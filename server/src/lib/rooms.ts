import { MongoClient, ObjectId } from 'mongodb';
import { RoomState, Room } from './types';

const rooms: (Room | { id: string })[] = [];

export const getRoom = (id: string): Room => rooms.filter((room) => room.id === id)[0] as Room;

export const updateRoomState = async (id: string, newState: RoomState) => {
  const room = getRoom(id);
  room.state = newState;
  const client = await new MongoClient(process.env.MONGODB_URI as string).connect();
  await client
    .db()
    .collection('quizzes')
    .updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: newState,
        },
      },
    );
  client.close();
};

export const deleteRoom = (id: string) => {
  rooms.forEach((room, index) => {
    if (room.id === id) {
      rooms.splice(index, 1);
    }
  });
};

export const createRoom = async (id: string) => {
  rooms.push({ id });
  const client = await new MongoClient(process.env.MONGODB_URI as string).connect();
  const response = await client
    .db()
    .collection('quizzes')
    .findOne({ _id: new ObjectId(id) });
  if (response) {
    updateRoomState(id, 'waiting');
    const {
      title,
      description,
      theme,
      maxPlayers,
      startDate,
      questions,
    } = response;
    deleteRoom(id);
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
    return rooms[rooms.length - 1];
  }
  deleteRoom(id);
  updateRoomState(id, 'published');
  return null;
};
