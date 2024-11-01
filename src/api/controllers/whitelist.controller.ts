import { Request, Response } from 'express';
import WhitelistService from '../services/whitelist.service';

const whitelistService = new WhitelistService();

export const getWhitelist = async (_req: Request, res: Response) => {
    const result = await whitelistService.getWhitelist();
    if (result.success) {
        res.status(200).json(result.body); // Send the whitelist data as a JSON response
    } else {
        res.status(500).json({ message: result.error }); // Send an error response if something goes wrong
    }
}

export const addToWhitelist = async (req: Request, res: Response) => {
    const { ipAddress, startDate, endDate } = req.body;
    const result = await whitelistService.addToWhitelist(ipAddress, startDate, endDate);
    if (result.success) {
        res.status(201).json(result.body); // Send the saved whitelist document as a JSON response
    } else {
        res.status(500).json({ message: result.error }); // Send an error response if something goes wrong
    }
};

export const deleteFromWhitelist = async (req: Request, res: Response) => {
        const { ipAddress } = req.query;
        const result = await whitelistService.deleteFromWhitelist(ipAddress as string);
        if (result.success) {
            res.status(200).json(result.body); // Send the result of the operation as a JSON response
        } else {
            res.status(500).json({ message: result.error }); // Send an error response if something goes wrong
        }};

