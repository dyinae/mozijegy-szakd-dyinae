const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// .env fájl betöltése
dotenv.config();

const app = express();

// Middleware-ek
app.use(cors());
app.use(express.json());

// Swagger konfiguráció
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mozi Jegyfoglaló API',
      version: '1.0.0',
      description: 'Online mozi jegyfoglaló rendszer REST API',
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// MongoDB kapcsolat
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB kapcsolódva!'))
  .catch((err) => console.error('MongoDB hiba:', err));

// Routes
const authRoutes = require('./routes/auth');
const filmekRoutes = require('./routes/filmek');
const vetitesekRoutes = require('./routes/vetitesek');
const usersRoutes = require('./routes/users');
const foglalasokRoutes = require('./routes/foglalasok');

app.use('/api/auth', authRoutes);
app.use('/api/filmek', filmekRoutes);
app.use('/api/vetitesek', vetitesekRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/foglalasok', foglalasokRoutes);

// Alap teszt végpont
app.get('/', (req, res) => {
  res.json({ message: 'Mozi API működik!' });
});

// Szerver indítása
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Szerver fut: http://localhost:${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});