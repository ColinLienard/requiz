let users = [];

export const addUser = (
  userName,
  userId,
  socketId,
  room,
) => {
  const user = {
    userName,
    userId,
    socketId,
    room,
  };
  users = [...users, user];
};

export const removeUser = (id) => {
  let toRemove = null;
  users = users.filter((user) => {
    if (user.socketId === id) {
      toRemove = user;
      return false;
    }
    return true;
  });
  return toRemove;
};

export const getUsers = (room) => users.filter((user) => user.room === room);

// export const findUser = (id) => users.filter((user) => user.id === id);
