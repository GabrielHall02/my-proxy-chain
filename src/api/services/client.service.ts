import { Client, Whitelist, IClient } from '../models/models';

class ClientService {
    async addClient(ipAddress: string, availableBandwidth: number): Promise<{ success: boolean, body?: IClient, error?: string }> {
        try {
            // Check if the client's IP address is in the whitelist
            const isInWhitelist = await Whitelist.findOne({ ip: ipAddress });
            if (!isInWhitelist) {
                return { success: false, error: 'IP address is not in the whitelist' };
            }

            const newClient = new Client({
                ip: ipAddress,
                availableBandwidth: availableBandwidth
            });

            const savedClient = await newClient.save(); // Save the new client document to the database
            return { success: true, body: savedClient };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    async subtractBandwidth(ipAddress: string, amountToSubtract: number) {
        try {
            const client = await Client.findOne({ ip: ipAddress }); // Find the client with the provided IP address
            if (!client) {
                return { success: false, error: `Client ${ipAddress} not found` };
            }

            const newBandwidth = client.availableBandwidth - amountToSubtract; // Subtract the amount to remove from the current available bandwidth
            let result;
            if (newBandwidth <= 0) {
                result = await Client.updateOne({ ip: ipAddress }, { availableBandwidth: 0 }); 
            } else {
                result = await Client.updateOne({ ip: ipAddress }, { availableBandwidth: newBandwidth });
            }

            return { success: true, body: result };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    async getClientByIp(ipAddress: string): Promise<{ success: boolean, body?: IClient, error?: string }> {
        try {
            if (!ipAddress) {
                return { success: false, error: 'IP address not provided' };
            }
            const client = await Client.findOne({ ip: ipAddress }); // Find the client with the provided IP address
            if (!client) {
                return { success: false, error: 'Client not found' };
            }

            return { success: true, body: client };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }
}

export default ClientService;
