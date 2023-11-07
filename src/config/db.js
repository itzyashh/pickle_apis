import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/pickle_database')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));
