import { RoomState, Room } from './types';

const rooms: Room[] = [];

export const createRoom = (name: string) => {
  rooms.push({ name, state: 'waiting', timer: null });
};

export const getRoom = (name: string): Room => rooms.filter((room) => room.name === name)[0];

export const updateRoomState = (name: string, newState: RoomState) => {
  const room = getRoom(name);
  room.state = newState;
};

export const deleteRoom = (name: string) => {
  rooms.forEach((room, index) => {
    if (room.name === name) {
      rooms.splice(index, 1);
    }
  });
};
