import { Request, Response } from 'express';
import ClientService from '../services/client.service';

const clientService = new ClientService();

export const addClient = async (req: Request, res: Response): Promise<void> => {
    const { ipAddress, availableBandwidth } = req.body;
    const result = await clientService.addClient(ipAddress, availableBandwidth);
    if (result.success) {
        res.status(201).json(result.body);
    } else {
        res.status(500).json({ message: result.error });
    }
};

export const subtractBandwidth = async (req: Request, res: Response): Promise<void> => {
    const { ipAddress, amountToSubtract } = req.body;
    const result = await clientService.subtractBandwidth(ipAddress, amountToSubtract);
    if (result.success) {
        res.status(200).json(result.body);
    } else {
        res.status(500).json({ message: result.error });
    }
};

export const getClientByIp = async (req: Request, res: Response): Promise<void> => {
    const ipAddress: string  = req.query.ipAddress as string;
    const result = await clientService.getClientByIp(ipAddress);
    if (result.success) {
        res.status(200).json(result.body);
    } else {
        res.status(500).json({ message: result.error });
    }
};
