const aiRouter = require('./aiRouter');

class CareerCoach {
    constructor() {
        this.router = aiRouter;
    }

    async analyzeCV(cvText, jobDescription, userTier = 'free') {
        if (!cvText || cvText.length < 50) throw new Error("CV text too short");

        const systemPrompt = `
        **IDENTITY:**
        You are an **Expert Career Coach & Europass Specialist**.
        Your goal is NOT just to filter, but to **AUDIT and IMPROVE** the candidate's CV to meet **International/Europass Standards**.

        **OBJECTIVES:**
        1. **Validate Quality:** Check if the CV is well-structured, clear, and professional.
        2. **Find Errors:** Detect spelling mistakes, vague descriptions, and formatting issues.
        3. **Europass Alignment:** Ensure it follows the standard logic (Clear dates, actionable verbs, standard sections).

        **SCORING MATRIX (Total: 100):**
        - **Structure & Formatting (30%):** Europass alignment, clean layout, correct contact info.
        - **Content Quality (30%):** Use of "Action Verbs", quantified results (STAR method), no headers/footers issues.
        - **Job Match (20%):** Does it actually fit the provided Job Description?
        - **Writing & Grammar (20%):** Zero typos, professional tone (no "I am a hard worker" clichés).

        **CRITICAL PENALTIES:**
        - "-10 points" for spelling errors.
        - "-10 points" for messy timeline or missing dates.
        - "-5 points" for missing contact information.

        **OUTPUT FORMAT (JSON ONLY):**
        {
            "score": Integer (0-100),
            "match_level": "Professional (80+)" | "Standard (50-79)" | "Needs Work (<50)",
            "summary": "Brutal but constructive summary of the CV's current state.",
            "hard_skills_analysis": {
                "score": Integer (0-40),
                "missing_keywords": ["Skill A", "Skill B"],
                "matched_keywords": ["Skill C"]
            },
            "experience_analysis": {
                "score": Integer (0-30),
                "feedback": "Specific feedback on how to rewrite bullet points using STAR method."
            },
            "soft_skills_analysis": {
                "score": Integer (0-20),
                "feedback": "Feedback on tone and personality presentation."
            },
            "formatting_analysis": {
                "score": Integer (0-10),
                "issues": ["Missing Header", "Dates are confusing", "Not Europass friendly"]
            },
            "red_flags": ["Typos found", "Employment Gap", "Vague descriptions"],
            "improvement_plan": ["Step 1: Fix typos", "Step 2: Rewrite summary", "Step 3: Align with Europass"]
        }
        `;

        const userPrompt = `
        **JOB DESCRIPTION:**
        ${jobDescription.slice(0, 4000)}

        **CANDIDATE CV:**
        ${cvText.slice(0, 4000)}
        `;

        try {
            // Using aiRouter with new options support
            const response = await this.router.routeRequest({
                prompt: userPrompt,
                complexity: 'hard', // Force High Logic
                providerOverride: 'auto',
                system_instruction: systemPrompt
            }, {
                response_format: { type: "json_object" },
                temperature: 0.2 // Low temp for factual analysis
            });

            const fullAnalysis = JSON.parse(response.text);

            // --- FREEMIUM LOGIC: CENSORSHIP ---
            if (userTier === 'free') {
                return {
                    score: fullAnalysis.score,
                    match_level: fullAnalysis.match_level,
                    summary: fullAnalysis.summary, // Hook: They see the summary

                    // PARTIAL FEEDBACK (Hook)
                    hard_skills_analysis: {
                        score: fullAnalysis.hard_skills_analysis?.score,
                        // Show only 2 missing keywords as teaser
                        missing_keywords: fullAnalysis.hard_skills_analysis?.missing_keywords?.slice(0, 2) || [],
                        total_missing: fullAnalysis.hard_skills_analysis?.missing_keywords?.length || 0,
                        is_locked: true
                    },

                    // LOCKED SECTIONS
                    experience_analysis: {
                        score: fullAnalysis.experience_analysis?.score,
                        feedback: "🔒 Upgrade to PRO to see detailed experience analysis.",
                        is_locked: true
                    },
                    soft_skills_analysis: {
                        score: fullAnalysis.soft_skills_analysis?.score,
                        feedback: "🔒 Upgrade to PRO to see soft skills feedback.",
                        is_locked: true
                    },
                    formatting_analysis: {
                        score: fullAnalysis.formatting_analysis?.score,
                        issues: ["🔒 Upgrade to unlock formatting audit."],
                        is_locked: true
                    },
                    red_flags: fullAnalysis.red_flags?.slice(0, 1) || [], // Show 1 red flag only
                    improvement_plan: ["🔒 Unlock the full Action Plan with PRO."]
                };
            }

            return fullAnalysis;

        } catch (error) {
            console.error("CareerCoach Analysis Error:", error);
            // Fallback for valid frontend structure if AI fails
            return {
                score: 0,
                match_level: "Error",
                summary: "Analysis failed due to technical issues.",
                hard_skills_analysis: { missing_keywords: [] },
                experience_analysis: {},
                soft_skills_analysis: {},
                formatting_analysis: {},
                red_flags: [],
                improvement_plan: ["Retry analysis"]
            };
        }
    }

    async rewriteCV(cvText) {
        if (!cvText) throw new Error("No CV Text to rewrite");

        const prompt = `
        Role: Expert CV Writer and Career Coach.
        Task: Rewrite weak bullet points in the provided CV using the STAR Method (Situation, Task, Action, Result).
        
        Input CV:
        "${cvText.slice(0, 4000)}"

        Instructions:
        1. Identify the 3-5 weakest or most vague experience bullet points.
        2. Rewrite them to be quantifiable and impact-driven.
        3. Keep the tone professional and executive.

        Output JSON only:
        {
            "improvements": [
                {
                    "original": "Responsible for sales in the region.",
                    "improved": "Spearheaded regional sales strategy, driving a 20% revenue increase YoY."
                },
                ...
            ],
            "general_advice": "Brief summary of changes made."
        }
        `;

        try {
            const response = await this.router.routeRequest({
                prompt: prompt,
                complexity: 'medium',
                system_instruction: "You are a STAR Method CVrewriter. Output JSON only."
            });

            const cleanJson = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanJson);
        } catch (error) {
            console.error("CareerCoach Rewrite Error:", error);
            throw new Error("Failed to rewrite CV");
        }
    }
}

module.exports = new CareerCoach();
