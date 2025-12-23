export const schema = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT,
  profileImageUrl TEXT,
  profileImagePath TEXT
);

CREATE TABLE IF NOT EXISTS conversations (
  id TEXT PRIMARY KEY,
  otherUserId TEXT,
  otherUserName TEXT,
  otherUserImageUrl TEXT,
  otherUserImagePath TEXT,
  lastMessage TEXT,
  lastMessageAt TEXT
);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  conversationId TEXT,
  senderId TEXT,
  content TEXT,
  createdAt TEXT
);
`;
