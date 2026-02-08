const aiRouter = require('./aiRouter');

class PsychometricService {
    constructor() {
        this.router = aiRouter;
    }

    /**
     * Calculate DASS-21 Scores
     * @param {Object} answers - Map of Q.ID -> Answer(0-3)
     * @returns {Object} { stress, anxiety, depression }
     */
    calculateDASS21(answers) {
        // DASS Dimensions
        const dimensions = {
            stress: [1, 6, 8, 11, 12, 14, 18],
            anxiety: [2, 4, 7, 9, 15, 19, 20],
            depression: [3, 5, 10, 13, 16, 17, 21]
        };

        const scores = {};
        for (const [dim, qIds] of Object.entries(dimensions)) {
            let sum = 0;
            qIds.forEach(id => {
                // Assuming answers keyed by question ID string "dass_1", "dass_2", etc.
                const val = answers[`dass_${id}`] || 0;
                sum += val;
            });
            scores[dim] = sum * 2; // Multiply by 2 as per spec
        }
        return scores;
    }

    /**
     * Calculate Flow State Scores
     * @param {Object} answers - Map of Q.ID -> Answer(1-5)
     * @returns {Object} { average, dimensions: { dim1: avg, ... } }
     */
    calculateFlow(answers) {
        // 9 Dimensions of Flow (4 items each, sequential 1-36)
        // Dim 1: 1-4, Dim 2: 5-8, ...
        const dimAvgs = {};
        let totalSum = 0;
        let totalCount = 0;

        for (let dim = 1; dim <= 9; dim++) {
            let dimSum = 0;
            const start = (dim - 1) * 4 + 1;
            const end = dim * 4;

            for (let q = start; q <= end; q++) {
                const val = answers[`flow_${q}`] || 3; // Default 3 (Neutral)
                dimSum += val;
                totalSum += val;
                totalCount++;
            }
            dimAvgs[`dim_${dim}`] = parseFloat((dimSum / 4).toFixed(2));
        }

        return {
            average: parseFloat((totalSum / totalCount).toFixed(2)),
            dimensions: dimAvgs
        };
    }

    /**
     * Calculate Big 5 Scores (OCEAN)
     * @param {Object} answers - Map of Q.ID -> Answer(1-5)
     * @returns {Object} { O, C, E, A, N } (Averages 1-5)
     */
    calculateBig5(answers) {
        // Mock Mapping for 50 Questions (10 per trait)
        // Assumes standard simple alternating distribution or sequential blocks for demo.
        // For production, exact IPIP mapping is required. Using simple blocks 1-10=O, 11-20=C etc for prototype.
        const traits = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism']; // OCEAN ordered differently here but labels matter
        const scores = {};

        let qIndex = 1;
        traits.forEach(trait => {
            let sum = 0;
            for (let i = 0; i < 10; i++) {
                // Handle reverse scoring logic if needed (e.g. even numbers reversed)
                // answers[`big5_${qIndex}`]
                let val = answers[`big5_${qIndex}`] || 3;

                // MOCK REVERSE LOGIC: Assume odd questions positive, even negative for variance
                if (qIndex % 2 === 0) {
                    val = 6 - val;
                }

                sum += val;
                qIndex++;
            }
            scores[trait] = parseFloat((sum / 10).toFixed(2));
        });

        return scores;
    }

    /**
     * Generate comprehensive report using AI
     */
    async generateReport(cvText, jobDescription, scores) {
        if (!cvText || !jobDescription) throw new Error("Missing CV or Job Description");

        // Format scores for prompt
        const dassStr = `Stress:${scores.dass.stress}, Anxiety:${scores.dass.anxiety}, Depression:${scores.dass.depression}`;
        const flowStr = `Avg:${scores.flow.average}`;
        const big5Str = `O:${scores.big5.openness}, C:${scores.big5.conscientiousness}, E:${scores.big5.extraversion}, A:${scores.big5.agreeableness}, N:${scores.big5.neuroticism}`;

        const prompt = `
        Actúa como Headhunter Senior. Analiza:
        1. Contexto del Candidato (CV Resumido): ${cvText.substring(0, 1500)}...
        2. Puesto Objetivo: ${jobDescription.substring(0, 1000)}...
        3. Psicometría Realizada:
           - DASS-21 (Salud Mental 0-42): [${dassStr}] (Normal: <10, Severo: >20)
           - Flow State (Rendimiento 1-5): [${flowStr}] (Alto: >4.0)
           - Big 5 (Personalidad 1-5): [${big5Str}]

        Genera un JSON con:
        {
          "porcentaje_match": (Integer 0-100),
          "analisis_brechas": ["List of 3 distinct missing skills or traits"],
          "ajuste_cultural": "Analysis based on Big 5 vs typical culture for this role",
          "prediccion_performance": "Analysis based on Flow State score",
          "guia_entrevista": ["Question 1 (Probe Weakness)", "Question 2 (Verify Strength)", "Question 3 (Cultural Fit)"]
        }
        `;

        try {
            const response = await this.router.routeRequest({
                prompt: prompt,
                complexity: 'hard',
                system_instruction: "You are a Psychometric API. Return JSON only."
            }, {
                response_format: { type: "json_object" }
            });

            const cleanJson = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanJson);
        } catch (error) {
            console.error("Psychometric AI Report Error:", error);
            // Fallback
            return {
                porcentaje_match: 50,
                analisis_brechas: ["Error generating AI analysis"],
                ajuste_cultural: "N/A",
                prediccion_performance: "N/A",
                guia_entrevista: []
            };
        }
    }
}

module.exports = new PsychometricService();
