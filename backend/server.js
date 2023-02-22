import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import { Container } from './controllers/dbContainer.js';
import { mariadbConfig } from './config/config.js';
import router from './router/index.js';
import { saveMessage, getMessagesNormalized } from './controllers/messages.js';
import { connect } from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
	cors: {
		origin: 'http://localhost:3000'
	}
});
const PORT = process.env.PORT || 8080;

const controlProducts = new Container(mariadbConfig, 'products');

app.use(session({
	store: MongoStore.create({
		mongoUrl: process.env.MONGO,
		mongoOptions: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
		ttl: 100
	}),
	secret: 'elmundoqueconocidesaparecio',
	resave: false,
	saveUninitialized: false
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/api', router);

io.on('connection', async socket => {
	console.log('A client has connected');
	const dbProds = await controlProducts.getAll();
	io.sockets.emit('products', dbProds);
	const dbMess = await getMessagesNormalized();
	io.sockets.emit('messages', dbMess);

	socket.on('newProduct', newProduct => {
		controlProducts.save(newProduct);
		const dbProds = controlProducts.getAll();
		io.sockets.emit('products', dbProds);
	});

	socket.on('newMessage', async newMessage => {
		await saveMessage(newMessage);
		const dbMess = await getMessagesNormalized();
		io.sockets.emit('messages', dbMess);
	});

});

server.listen(PORT, async () => {
	await connect(process.env.MONGO);
    console.log(`Server listening on port ${PORT}`);
})

server.on('error', err => {
    console.log(err);
});