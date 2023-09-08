const express = require('express');
const sequelize = require('./database');
const User = require('./models/User');
const cors = require('cors'); 
const Message = require('./models/Message');
const jwt = require('jsonwebtoken');
const secretKey = "userauthenticated";
const seedDatabase = require('./seeders/seeder')
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 

//Calling resetDatabase method everytime we start the application and dropping existing tables and recreating and seeding data.
const resetDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    await seedDatabase(); 
  } catch (error) {
    console.error('Error resetting database:', error);
  }
};

//starting the server
const startServer = async () => {
  try {
    await resetDatabase();
    app.listen(port, () => {
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

//Getting Email and password while page loading in frontend and authenticating user with giving jwt token if email and password is true
//After user is authenticated, api returns total number of read & unread messages of the authenticated user.
app.post('/unreadmessages', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '365d' });
        const totalMessages = await Message.count({ where: { UserId: user.id } });
        const unreadMessages = await Message.count({ where: { UserId: user.id, isRead: false } });
        res.json({
          success: true,
          message: 'Authentication successful.',
          totalMessageCount: totalMessages,
          unreadMessageCount: unreadMessages,
          username: user.name,
          jwt: token
        });
      } else {
        res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Getting all messages of authenticated user with jwt token.
app.get('/messages', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decodedJwt = jwt.verify(token, secretKey);
    const userId = decodedJwt.userId;
    const messages = await Message.findAll({ where: { UserId: userId } });
    res.json({ success: true, messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(401).json({ success: false, message: 'Invalid token or expired.' });
  }
});

//Getting selected message by authenticated user and showing details.
app.get('/messages/:id', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const messageId = req.params.id;

  try {
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Token not provided' });
    }
    const decodedJwt = jwt.verify(token, secretKey);
    const userId = decodedJwt.userId;

    const message = await Message.findOne({ where: { id: messageId, UserId: userId } });

    if (message) {
      res.json({ success: true, message });
    } else {
      res.status(404).json({ success: false, message: 'Message not found' });
    }
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

//After user views the selected message, message IsRead state returns true
app.put('/messages/:id/changeIsRead', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const messageId = req.params.id;

  try {
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Token not provided' });
    }
    const decodedJwt = jwt.verify(token, secretKey);
    const userId = decodedJwt.userId;

    // Update the message's isRead status
    const updatedMessage = await Message.update({ isRead: true }, { where: { id: messageId, UserId: userId } });

    if (updatedMessage[0] > 0) {
      res.json({ success: true, message: 'Message marked as read' });
    } else {
      res.status(404).json({ success: false, message: 'Message not found or unauthorized' });
    }
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

startServer();