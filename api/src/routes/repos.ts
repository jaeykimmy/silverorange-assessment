import { Router, Request, Response } from 'express';
import data = require('../../data/repos.json');

export const repos = Router();
console.log(data);
repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  res.json([]);
});
