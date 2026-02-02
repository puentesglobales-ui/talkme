const { AccessToken } = require('livekit-server-sdk');

const createToken = async (roomName, participantName) => {
    // If keys are not set, we can't generate a token. 
    // Ideally, these should be in your .env file
    const apiKey = process.env.LIVEKIT_API_KEY;
    constapiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
        throw new Error('LIVEKIT_API_KEY and LIVEKIT_API_SECRET are not set in the server environment.');
    }

    const at = new AccessToken(apiKey, apiSecret, {
        identity: participantName,
    });

    at.addGrant({ roomJoin: true, room: roomName });

    return await at.toJwt();
};

module.exports = { createToken };
