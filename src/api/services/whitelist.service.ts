import { Whitelist, Client } from '../models/models'; // Import the Whitelist model

class WhitelistService {
  async getWhitelist() {
    try {
      const whitelist = await Whitelist.find(); // Get all whitelist documents from the database
      return { success: true, body: whitelist };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async addToWhitelist(ipAddress: string, startDate: Date, endDate: Date) {
    try {
      const newWhitelist = new Whitelist({
        ip: ipAddress,
        startDate: startDate,
        endDate: endDate
      });

      const savedWhitelist = await newWhitelist.save(); // Save the new whitelist document to the database
      return { success: true, body: savedWhitelist };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async deleteFromWhitelist(ipAddress: string) {
    try {
      const resultWhitelist = await Whitelist.deleteOne({ ip: ipAddress }); // Delete the document from the Whitelist collection
      const resultClient = await Client.deleteOne({ ip: ipAddress }); // Delete the document from the Client collection

      const result = {
        whitelist: resultWhitelist,
        client: resultClient
      };

      return { success: true, body: result };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}

export default WhitelistService;