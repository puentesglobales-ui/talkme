const axios = require('axios');
const fs = require('fs');
require('dotenv').config({ path: 'c:\\Users\\Gabriel\\.gemini\\antigravity\\scratch\\career-mastery-engine\\server\\.env' });

async function testElevenLabsTTS() {
    const API_KEY = process.env.ELEVENLABS_API_KEY;
    const VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Default Rachel
    const OUTPUT_FILE = 'test_output.mp3';

    if (!API_KEY) {
        console.error('❌ No API Key found in server/.env');
        return;
    }

    console.log(`🎙️  Testing TTS with Voice: ${VOICE_ID}...`);

    try {
        const response = await axios.post(
            `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
            {
                text: "Hello, this is a test of the Eleven Labs API integration.",
                model_id: "eleven_multilingual_v2",
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75
                }
            },
            {
                headers: {
                    'xi-api-key': API_KEY,
                    'Content-Type': 'application/json'
                },
                responseType: 'arraybuffer'
            }
        );

        fs.writeFileSync(OUTPUT_FILE, response.data);
        console.log(`✅ Success! Audio saved to ${OUTPUT_FILE}`);
        console.log(`   Size: ${response.data.length} bytes`);

    } catch (error) {
        console.error('❌ Failed to generate audio:');
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            try {
                // Try to parse arraybuffer to string for error message
                const errorBody = Buffer.from(error.response.data).toString('utf8');
                console.error('Data:', errorBody);
            } catch (e) {
                console.error('Data: (Binary data)');
            }
        } else {
            console.error(error.message);
        }
    }
}

testElevenLabsTTS();
