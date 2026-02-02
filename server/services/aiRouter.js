const { translateWithDeepSeek } = require('./adapters/deepseek');
// Lazy load these to avoid crashing if deps/keys are missing immediately
const getDeepgram = () => require('./adapters/deepgram');
const getGoogle = () => require('./adapters/google');

// --- PROVIDER CONFIGURATION ---
const PROVIDERS = {
    PREMIUM: {
        id: 'premium',
        stt: 'openai-whisper',
        llm: 'gpt-4o',
        tts: 'elevenlabs'
    },
    CHALLENGER: {
        id: 'challenger',
        stt: 'deepgram',
        llm: 'deepseek-chat',
        tts: 'google-neural'
    }
};

/**
 * AI ROUTER
 * Decides which provider stack to use based on user segment or A/B logic.
 */
class AIRouter {
    constructor() {
        this.abRatio = parseFloat(process.env.AB_TEST_RATIO || '0');
        this.override = null; // 'premium' | 'challenger' | null
    }

    setOverride(providerId) {
        console.log(`[AI-ROUTER] Override set to: ${providerId}`);
        this.override = providerId === 'null' ? null : providerId;
    }

    getRoute(userId) {
        // 1. Manual Override (Admin Force)
        if (this.override && PROVIDERS[this.override.toUpperCase()]) {
            return PROVIDERS[this.override.toUpperCase()];
        }

        if (!userId) return PROVIDERS.PREMIUM;

        // 2. A/B Logic
        const userHash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const normalizedHash = (userHash % 100) / 100;

        if (normalizedHash < this.abRatio) {
            console.log(`[AI-ROUTER] Routing ${userId} to CHALLENGER (DeepSeek/Deepgram/Google)`);
            return PROVIDERS.CHALLENGER;
        } else {
            console.log(`[AI-ROUTER] Routing ${userId} to PREMIUM (OpenAI/ElevenLabs)`);
            return PROVIDERS.PREMIUM;
        }
    }

    // --- METHODS ---

    async transcribe(audioPath, lang, providerConfig) {
        if (providerConfig.stt === 'deepgram') {
            try {
                const { transcribeWithDeepgram } = getDeepgram();
                return await transcribeWithDeepgram(audioPath, lang);
            } catch (e) {
                console.error("Deepgram Error (Falling back to default):", e.message);
                return null; // Return null to trigger fallback
            }
        }
        return null; // Default (Whisper)
    }

    async translate(text, fromLang, toLang, providerConfig) {
        // Strategy: Try Primary -> Catch Error -> Try Fallback (OpenAI)

        // 1. Primary Attempt (e.g. DeepSeek)
        if (providerConfig.llm === 'deepseek-chat') {
            try {
                console.log(`[AI-ROUTER] ⚡ Trying Primary LLM: DeepSeek...`);
                return await translateWithDeepSeek(text, fromLang, toLang);
            } catch (e) {
                console.warn(`[AI-ROUTER] ⚠️ Primary LLM Failed (${e.message}). Switching to Fallback...`);
                // Do NOT return null here. Fall through to OpenAI logic below.
            }
        }

        // 2. Fallback Attempt (OpenAI / Default)
        try {
            console.log(`[AI-ROUTER] 🛡️ Using Fallback LLM: OpenAI GPT-4o...`);
            // Assuming default OpenAI implementation exists or lives in the service calling this
            // null acts as a signal to the caller to "use default", but ideally we call it here.
            // For now, we return null to signal "use legacy/default path".
            return null;
        } catch (fallbackError) {
            console.error(`[AI-ROUTER] ❌ CRITICAL: All LLMs failed.`, fallbackError);
            throw fallbackError; // Nothing else to do
        }
    }

    async speak(text, lang, providerConfig) {
        if (providerConfig.tts === 'google-neural') {
            try {
                const { speakWithGoogle } = getGoogle();
                return await speakWithGoogle(text, lang);
            } catch (e) {
                console.error("Google TTS Error (Fallback):", e.message);
                return null;
            }
        }
        return null; // Default (ElevenLabs)
    }
}

module.exports = new AIRouter();
