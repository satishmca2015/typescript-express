import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import reportRoutes from './routes/reports';
import sequelize from './config/sequelize';
import { paginate } from './middleware/paginationMiddleware';

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(paginate);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/report', reportRoutes);

// Sync database models with the database
/* sequelize.sync({ force: true }).then(() => {
  console.log('Database synced');
}).catch((err) => {
  console.error('Error syncing database:', err);
}); */

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
