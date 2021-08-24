const SocketUser = require("../../db/models/SocketUser");
const Logger = require("../../utils/logger");
const joinUser = async (socket_id, session_id, table_id, rest_id) => {
  const payload = {
    socket_id,
    session_id,
    table_id,
    rest_room: rest_id,
  };

  try {
    const user = await getUserBySessionId(session_id);

    if (Boolean(user)) {
      if (isSameUser(user, payload)) {
        return user;
      }

      let result = await SocketUser.findOneAndUpdate(
        { session_id: user.session_id },
        { $set: payload },
        { new: true, upsert: false }
      );
      return result;
    }

    await new SocketUser(payload).save();

    return payload.toObject();
  } catch (err) {
    Logger.error(
      `[SKT] Error on joining a user into the room: ${rest_id}, ERR: ${err}`
    );

    throw err;
  }
};

const joinRestaurant = async (socket_id, rest_id) => {
  const payload = {
    socket_id,
    table_id: "",
    session_id: rest_id,
    rest_room: rest_id,
  };

  try {
    const user = await getUserBySessionId(payload.session_id);

    if (Boolean(user)) {
      if (isSameUser(user, payload)) {
        return user;
      }

      let result = await SocketUser.findOneAndUpdate(
        { session_id: user.session_id },
        { $set: payload },
        { new: true, upsert: false }
      );
      return result;
    }

    await new SocketUser(payload).save();

    return payload;
  } catch (err) {
    Logger.error(
      `[SKT] Error on joining a restaurant into the room: ${rest_id}, ERR: ${err}`
    );

    throw err;
  }
};

const getUserBySocketId = async (id) => {
  try {
    const user = await SocketUser.findOne({ socket_id: id });

    if (Boolean(user)) {
      return user;
    }

    return null;
  } catch (err) {
    Logger.error(
      `[SKT] Error on fetching a user, socket_id: ${id}, ERR: ${err}`
    );

    throw err;
  }
};

const getUserBySessionId = async (id) => {
  try {
    const user = await SocketUser.findOne({ session_id: id });

    if (Boolean(user)) {
      return user;
    }

    return null;
  } catch (err) {
    Logger.error(
      `[SKT] Error on fetching a user, ssssion_id: ${id}, ERR: ${err}`
    );

    throw err;
  }
};

const disconnectUser = async (id) => {
  try {
    const user = await getUserBySocketId(id);

    if (!Boolean(user)) {
      return null;
    }

    const result = await SocketUser.findOneAndDelete({ socket_id: id });

    return result;
  } catch (err) {
    Logger.error(
      `[SKT] Error on disconnecting a user, ssssion_id: ${id}, ERR: ${err}`
    );

    throw err;
  }
};

const isSameUser = (user1, user2) => {
  const keyArr = ["socket_id", "session_id", "table_id", "rest_room"];

  if (Object.keys(user1).length !== Object.keys(user2).length) {
    return false;
  }

  for (let i = 0; i < keyArr.length; i++) {
    if (!user1.hasOwnProperty(keyArr[i]) || !user2.hasOwnProperty(keyArr[i])) {
      return false;
    }
    if (user1[keyArr[i]] !== user2[keyArr[i]]) {
      return false;
    }
  }

  return true;
};

module.exports = {
  joinUser,
  joinRestaurant,
  disconnectUser,
  getUserBySessionId,
  getUserBySocketId,
  isSameUser,
};
