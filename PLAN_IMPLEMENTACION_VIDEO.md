# Plan de Implementación: TalkMe Suite & Inclusivo (Roadmap)

Este documento detalla los pasos para transformar TalkMe en una plataforma de comunicación universal usando **LiveKit + IA**.

## Estado Actual
- **Proyecto:** `mvp-idiomas-ai`
- **Infraestructura:** Node.js (Server) + React (Client)
- **Base de Datos:** Supabase (Actualmente en revisión por posible pausa).

## Fase 1: Infraestructura de Video (El "Motor") 🔴 EN PROGRESO
El objetivo es tener una sala de video funcional donde dos personas puedan verse y escucharse con latencia ultra-baja.

1.  [x] **Instalación de Dependencias:** `livekit-client`, `@livekit/components-react`, `livekit-server-sdk`.
2.  [ ] **Backend (Generador de Tokens):** Crear endpoint `/api/livekit/token` en el servidor. Este endpoint "invita" a los usuarios a la sala.
3.  [ ] **Frontend (Sala Básica):** Crear componente `<TalkMeVideoRoom />` usando el SDK de React.
4.  [ ] **Prueba de Conexión:** Verificar que dos pestañas del navegador pueden conectarse y verse.

## Fase 2: Modo Traductor (Los "Oídos") 🟡 PENDIENTE
Agregar subtítulos en tiempo real generados por IA.

1.  [ ] **Captura de Audio:** Usar el `AudioTrack` de LiveKit en el servidor o cliente.
2.  [ ] **Transcripción (STT):** Enviar audio a **Deepgram** (recomendado por velocidad) o Whisper API.
3.  [ ] **Overlay UI:** Crear el componente de subtítulos flotantes ("estilo Netflix") sobre el video.

## Fase 3: Modo Inclusivo (La "Voz") ⚪ PENDIENTE
Permitir que personas mudas "hablen" escribiendo.

1.  [ ] **UI de Entrada:** Panel inferior "Escribir para hablar" con onda de sonido visual.
2.  [ ] **Síntesis (TTS):** Conectar con **ElevenLabs Turbo** o **OpenAI Realtime**.
3.  [ ] **Inyección de Audio:** Publicar el audio sintetizado en el `Room` de LiveKit como si fuera un micrófono real.

---

## Notas Técnicas Importantes
- **Supabase:** Necesitamos que la base de datos esté activa para autenticar a los usuarios antes de que entren a la sala de video.
- **Costos:** LiveKit Cloud tiene un plan gratuito ("Hobby"). Deberemos configurar una cuenta allí para obtener las claves `LIVEKIT_API_KEY` y `LIVEKIT_API_SECRET`.
