import { Router, Request, Response } from 'express';
import data = require('../../data/repos.json');
import axios from 'axios';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!

  const apiTwo = axios
    .get('https://api.github.com/users/silverorange/repos')
    .then((response) => {
      console.log(response.data);
      return response.data;
    });

  const apiOne = res.json(data.filter((element) => element.fork === false));
  return apiTwo.concat(apiOne);
});
