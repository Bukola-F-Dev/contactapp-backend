const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');

dotenv.config();
connectDB();

const app = express();

const corsOptions = {
  origin: "https://contactapp-frontend-ck54nrzy8-florences-projects-0985f435.vercel.app/",
  methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
};
app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/contacts', contactRoutes);


const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
  res.send('Welcome to my backend API!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
