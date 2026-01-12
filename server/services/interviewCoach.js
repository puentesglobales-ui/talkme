const aiRouter = require('./aiRouter');

class InterviewCoach {
    constructor() {
        this.router = aiRouter;
    }

    /**
     * initializes the interview context
     */
    generateSystemPrompt(cvText, jobDescription, mode = 'hardcore') {
        const toneInstruction = mode === 'hardcore'
            ? "You are 'Alex', a strict and skeptical senior recruiter. You interrupt when answers are vague. You demand examples (STAR method). You are not here to make friends, but to find the best candidate."
            : "You are 'Alex', a helpful and encouraging career coach. You guide the candidate to give better answers.";

        return `
        ${toneInstruction}

        Candidate CV:
        "${cvText.slice(0, 3000)}"

        Job Description:
        "${jobDescription.slice(0, 3000)}"

        Instructions:
        1. Start by introducing yourself briefly and asking the first question directly related to a weak point in the CV.
        2. Keep your responses short (max 2-3 sentences) to allow for a fluid voice conversation.
        3. If the user gives a weak answer, challenge them.
        4. Focus on technical skills match and behavioral fit.
        
        IMPORTANT: Do not break character. Do not say "I am an AI". Act exactly like the recruiter.
        `;
    }

    async getInterviewResponse(chatHistory, cvText, jobDescription) {
        // Construct the full conversation context
        const systemPrompt = this.generateSystemPrompt(cvText, jobDescription);

        const messages = [
            { role: 'system', content: systemPrompt },
            ...chatHistory
        ];

        try {
            // Determine provider based on user (or default to Premium for now)
            // Ideally we'd pass userId to getInterviewResponse, but for now we rely on defaults or simple logic if needed.
            // Using a dummy ID or null ensures Default/Premium route unless configured otherwise.
            const providerConfig = this.router.getRoute(null);

            const response = await this.router.chat(
                messages,
                providerConfig
            );

            // If the router returns a string, use it.
            return response.text;
        } catch (error) {
            console.error("Interview Coach Error:", error);
            return "Interviewer is reviewing notes... (Error)";
        }
    }
}

module.exports = new InterviewCoach();
