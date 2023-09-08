const User = require('../models/User');
const Message = require('../models/Message');
const bcrypt = require('bcrypt');

//Creating Seeder for both Users and Messages as we use predefined users.
const seedDatabase = async () => {
    try {
      const hashedPassword = await bcrypt.hash('salahiexample1234', 10);
      await User.bulkCreate([
        {
          name: 'Salahi',
          email: 'salahiexample@hotmail.com',
          password: hashedPassword,
        },
      ]);

      await Message.bulkCreate([
        {
          subject: 'Hi Salahi',
          content: 'How are you Salahi?',
          isRead: false,
          UserId: 1,
        },
        {
            subject: 'Hi Salahi',
            content: 'I wanted to say that I am very good and happy.',
            isRead: false,
            UserId: 1,
          },
          {
            subject: 'Hi Salahi',
            content: 'I wanted to say goodbye.',
            isRead: false,
            UserId: 1,
          },
      ]);
      console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = seedDatabase