export const PSYCHOMETRIC_QUESTIONS = {
    dass21: [
        { id: 1, text: "Me costó mucho calmarme.", scale: 3 },
        { id: 2, text: "Me di cuenta de que tenía la boca seca.", scale: 3 },
        { id: 3, text: "No podía sentir ningún sentimiento positivo.", scale: 3 },
        { id: 4, text: "Tuve dificultad para respirar.", scale: 3 },
        { id: 5, text: "Se me hizo difícil tomar la iniciativa para hacer cosas.", scale: 3 },
        { id: 6, text: "Reaccioné de forma exagerada a las situaciones.", scale: 3 },
        { id: 7, text: "Sentí temblores.", scale: 3 },
        { id: 8, text: "Sentí que estaba consumiendo mucha energía nerviosa.", scale: 3 },
        { id: 9, text: "Me preocupé por situaciones en las que podría entrar en pánico.", scale: 3 },
        { id: 10, text: "Sentí que no tenía nada por qué vivir.", scale: 3 },
        { id: 11, text: "Me encontré agitado.", scale: 3 },
        { id: 12, text: "Se me hizo difícil relajarme.", scale: 3 },
        { id: 13, text: "Me sentí triste y deprimido.", scale: 3 },
        { id: 14, text: "No toleré nada que me impidiera continuar con lo que estaba haciendo.", scale: 3 },
        { id: 15, text: "Sentí que estaba al punto de pánico.", scale: 3 },
        { id: 16, text: "No fui capaz de entusiasmarme con nada.", scale: 3 },
        { id: 17, text: "Sentí que valía muy poco como persona.", scale: 3 },
        { id: 18, text: "Sentí que estaba muy irritable.", scale: 3 },
        { id: 19, text: "Sentí los latidos de mi corazón sin esfuerzo físico.", scale: 3 },
        { id: 20, text: "Sentí miedo sin razón alguna.", scale: 3 },
        { id: 21, text: "Sentí que la vida no tenía sentido.", scale: 3 }
    ],
    flow: [
        // Simulated 36 Questions based on 9 Dimensions (4 each)
        // 1-4: Skill Balance
        { id: 1, text: "Mis habilidades eran adecuadas para la tarea.", scale: 5 },
        { id: 2, text: "Me sentí capaz de manejar las demandas de la situación.", scale: 5 },
        { id: 3, text: "El desafío estaba acorde a mi nivel de destreza.", scale: 5 },
        { id: 4, text: "No me sentí abrumado ni aburrido.", scale: 5 },
        // 5-8: Action-Awareness Merging
        { id: 5, text: "Hacía las cosas automáticamente, sin pensar.", scale: 5 },
        { id: 6, text: "Mis acciones y mi conciencia estaban fusionadas.", scale: 5 },
        { id: 7, text: "No tenía que esforzarme para mantenerme enfocado.", scale: 5 },
        { id: 8, text: "Todo fluía naturalmente.", scale: 5 },
        // ... (Simulating rest for MVP brevity, mapping logic handles 1-36 IDs)
        // Placeholder for the remaining 28 items to ensure logic works
        ...Array.from({ length: 28 }, (_, i) => ({
            id: i + 9,
            text: `Pregunta de Flujo #${i + 9} (Simulada para MVP)`,
            scale: 5
        }))
    ],
    big5: [
        // Simulated 50 Questions (OCEAN)
        // 1-10: Openness
        { id: 1, text: "Tengo una imaginación muy viva.", scale: 5 },
        { id: 2, text: "Me interesan las ideas abstractas.", scale: 5 },
        { id: 3, text: "Disfruto de la belleza artística.", scale: 5 },
        // ...
        ...Array.from({ length: 47 }, (_, i) => ({
            id: i + 4,
            text: `Pregunta de Personalidad #${i + 4} (Simulada para MVP)`,
            scale: 5
        }))
    ]
};
