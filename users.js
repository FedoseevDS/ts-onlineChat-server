const { trimStr } = require('./utils');

let users = [];

const addUser = ({name, id, room}) => {
  const username = trimStr(name);

  const isExist = users?.find((u) => trimStr(u.name) === username);

  !isExist && users.push({name, id, room});

  const currentUser = isExist || name;

  return { isExist: !!isExist, user: currentUser, id, room };
}

module.exports = { addUser, users }