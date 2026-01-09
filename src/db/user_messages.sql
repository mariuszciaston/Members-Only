CREATE TABLE IF NOT EXISTS user_messages (
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  message_id INTEGER REFERENCES messages(message_id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, message_id)
);