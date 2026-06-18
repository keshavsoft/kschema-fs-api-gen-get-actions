import express from 'express';

import funcFromshowAll from './showAll/controller.js';

const tableName = "StockItems";
const tablePath = "Data/StockItems.json";
const configPath = "Config/Schemas/StockItems.json";

const router = express.Router();

router.get('/showAll', (req, res) => funcFromshowAll({ req, res, inTablePath: tablePath }));

export { router };