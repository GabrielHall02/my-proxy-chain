const axios = require('axios');

/*
This function checks if the user with the given IP address has available bandwidth.
*/
async function userHasBandwidth(clientIp: string): Promise<boolean> {
    try {
        const clientResponse = await axios.get(`http://localhost:5005/api/v1/client?ipAddress=${clientIp}`);
        const client = clientResponse.data;
        if (client) {
            return client.availableBandwidth > 0;
        } else {
            return false;
        }
    } catch (error: any) {
        console.error('Error getting client:', error.response.data);
        return false;
    }
}

/*
This function checks if the user with the given IP address is whitelisted.
*/
async function isUserWhitelisted(clientIp: string): Promise<boolean> {
    try {
        const whitelistResponse = await axios.get(`http://localhost:5005/api/v1/whitelist`);
        return whitelistResponse.data.some((whitelistItem: { ip: string }) => whitelistItem.ip === clientIp);
    } catch (error: any) {
        console.error('Error getting whitelist:', error?.response?.data);
        return false;
    }

}

/*
This function checks if the user with the given IP is allowed to use the service.
It will check if the user is whitelisted and has available bandwidth
*/
export async function isUserAllowed(remoteAddress: string): Promise<boolean> {
    const clientIp: string | undefined = remoteAddress.split(":").pop();
    if (!clientIp) {
        return false;
    }

    if (await isUserWhitelisted(clientIp) && await userHasBandwidth(clientIp)) {
        return true;
    } else {
        return false;
    }
}


/*
This function subtracts the given amount of bandwidth from the user with the given IP address.
*/
export async function subtractBandwidth(clientIp: string, bandwidth: number) {
    try {
        if (typeof bandwidth === 'number') {
            let res = await axios.patch(`http://localhost:5005/api/v1/client/subtractBandwidth`, { ipAddress: clientIp, amountToSubtract: bandwidth / 1000 });
            if (res.status !== 200) {
                console.error('Error subtracting bandwidth:', res?.statusText);
            }
        }
    } catch (error: any) {
        console.error(`Error subtracting bandwidth ${bandwidth} from ${clientIp}:`, error?.response?.data);
    }
}
