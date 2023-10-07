import express from 'express';
import bodyParser from 'body-parser';
import { bookRoom, createRoom, customerBookingHistory, listCustomers, listRooms } from './routes/routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/create_room', createRoom);
app.post('/api/book_room', bookRoom);
app.get('/api/list_rooms', listRooms);
app.get('/api/list_customers', listCustomers);
app.get('/api/customer_history/:customer_name', customerBookingHistory)

app.listen(PORT, () => { console.log(`Server is running on port ${PORT} Active`) });