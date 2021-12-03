import * as dotenv from 'dotenv';
import { app } from "./server";
dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});