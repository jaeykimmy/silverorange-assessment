import { Router, Request, Response } from 'express';
import data = require('../../data/repos.json');
import axios from 'axios';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!

  const combinedAPI = await axios
    .get('https://api.github.com/users/silverorange/repos')
    .then((response) => {
      return response.data
        .concat(data)
        .filter((element: any) => element.fork === false);
    })
    .catch((error) => {
      return error;
    });

  return res.json(combinedAPI);
});
