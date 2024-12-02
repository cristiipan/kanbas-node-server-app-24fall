import db from "../Database/index.js";
let { users } = db;

// 创建用户
export const createUser = (user) => {
  const newUser = { ...user, _id: Date.now().toString() };
  users = [...users, newUser];
  return newUser;
};

// 查找所有用户
export const findAllUsers = () => users;

// 通过ID查找用户
export const findUserById = (userId) => users.find((user) => user._id === userId);

// 通过用户名查找用户
export const findUserByUsername = (username) => users.find((user) => user.username === username);

// 通过用户名和密码查找用户
export const findUserByCredentials = (username, password) =>
  users.find((user) => user.username === username && user.password === password);

// 更新用户信息
export const updateUser = (userId, user) => 
  (users = users.map((u) => (u._id === userId ? user : u)));

// 删除用户
export const deleteUser = (userId) => 
  (users = users.filter((u) => u._id !== userId));
