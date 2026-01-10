import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { Spaceship } from '@srn-spaceships/shared-types';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Load spaceship data from JSON file
const dataPath = path.join(__dirname, 'data.json');
const spaceships: Spaceship[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Routes
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Welcome to SRN Spaceships API',
    endpoints: {
      spaceships: '/spaceships'
    }
  });
});

app.get('/spaceships', (_req: Request, res: Response) => {
  res.json(spaceships);
});

app.listen(PORT, () => {
  console.log(`🚀 SRN Spaceships API running on http://localhost:${PORT}`);
});
