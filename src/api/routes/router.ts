import express from 'express';
import { getWhitelist, addToWhitelist, deleteFromWhitelist } from '../controllers/whitelist.controller';
import { addClient, subtractBandwidth, getClientByIp } from '../controllers/client.controller';

const router = express.Router();


// GET /api/v1/whitelist
router.get('/api/v1/whitelist', getWhitelist);

// POST /api/v1/whitelist
router.post('/api/v1/whitelist', addToWhitelist);

// DELETE /api/v1/whitelist
router.delete('/api/v1/whitelist', deleteFromWhitelist);

// POST /api/v1/client
router.post('/api/v1/client', addClient);

// PATCH /api/v1/client/subtractBandwidth
router.patch('/api/v1/client/subtractBandwidth', subtractBandwidth);

// GET /api/v1/client
router.get('/api/v1/client', getClientByIp);

export default router;
