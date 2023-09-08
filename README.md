# EmailInboxApp
This is a Mailbox Application which I developed using ReactJs in frontend, NodeJs with ExpressJs at backend ant SQLite for database. SQLite is used in this project as it is serverless and users don't have to create a database server to run the application. RESTAPIs are used in backend and axios is used in frontend to send api requests and to get responses. The application uses predefined user in the seeder and this user has 3 predefined messages in database. When the application is run everytime, the database tables are removed and recreated and seeder seeds to database automatically. When the application starts, user will be redirected to Home page and /unreadmessages api is posted which show greetings to user with username, and will be shown his total number of messages and how many of them is unread. Email and password is sent through api when the home page starts to authenticate user with jwt token, and this token is stored in localstorage to be used in other pages also. If user click view messages, user will be redirected to Inbox page which shows all messages of authenticated user and /messages api is requested while page is loading. Subject, Content of message is shown to user and if message isRead state is false, message's icon is closed envelope, if true, opened envelope. When user click view message button for any specific message, /messages/id api is requested and user will be redirected to Message page. Here, user views the details of selected message and /message/id/changeIsRead api is requested to change the isRead state of the message to true as user views the message. Users can go to inbox page from this page by clicking back arrow. 

What to do after cloning the project? 
In the root directory of the project, npm install should be run through terminal to install dependincies of project. After installation is completed, npm run start-dev command will start both backend server and frontend and also seed the data to database.
