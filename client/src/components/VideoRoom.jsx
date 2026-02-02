import React, { useEffect, useState } from 'react';
import {
    LiveKitRoom,
    VideoConference,
} from '@livekit/components-react';
import '@livekit/components-styles';

// Import our custom Premium UI
import './video/TalkMeVideo.css';
import TranslatorOverlay from './video/TranslatorOverlay';
import InclusiveControls from './video/InclusiveControls';

export default function VideoRoom({ roomName = 'talkme-demo', userEmail, mode = 'inclusive' }) {
    const [token, setToken] = useState('');

    // Demo State for UI Showcase
    // In a real app, this comes from the subtitles backend
    const [demoSubtitle, setDemoSubtitle] = useState("Hello! I'm speaking in English but you see this.");

    useEffect(() => {
        // Simulate incoming subtitles for effect so the user sees something
        const timer = setInterval(() => {
            const texts = [
                "Welcome to TalkMe Voice.",
                "I can understand you perfectly.",
                "This is the Translator Mode in action.",
                "Typing...",
                "Breaking down barriers."
            ];
            setDemoSubtitle(texts[Math.floor(Math.random() * texts.length)]);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const handleSpeak = (text) => {
        console.log('Synthesizing speech:', text);
        // Here we would call the /api/speak endpoint in the future
        alert(`Sonando voz de IA: "${text}"`);
    };

    useEffect(() => {
        (async () => {
            try {
                const participantName = userEmail || 'Guest_' + Math.floor(Math.random() * 1000);
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

                const resp = await fetch(
                    `${API_URL}/api/livekit/token?room=${roomName}&participant=${participantName}`
                );
                const data = await resp.json();

                if (data.error) {
                    console.error('Token Error:', data.error);
                    // We don't alert here to not block the UI if backend is down during UI dev
                } else {
                    setToken(data.token);
                }
            } catch (e) {
                console.error(e);
            }
        })();
    }, [roomName, userEmail]);

    if (!token) {
        return (
            <div className="talkme-video-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '10px', color: 'white' }}>TalkMe Video</h2>
                    <div className="waveform-container">
                        <div className="wave-bar"></div>
                        <div className="wave-bar"></div>
                        <div className="wave-bar"></div>
                    </div>
                    <p style={{ marginTop: '20px', color: '#aaa' }}>Conectando al servidor seguro...</p>
                </div>
            </div>
        );
    }

    return (
        <LiveKitRoom
            video={true}
            audio={true}
            token={token}
            serverUrl={import.meta.env.VITE_LIVEKIT_URL}
            connect={true}
            data-lk-theme="default"
            style={{ height: '100vh' }}
        >
            <div className="talkme-video-container">

                {/* Top Status Bar */}
                <div className="glass-panel room-info-bar">
                    <div className="status-dot"></div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>TalkMe Voice: {mode === 'inclusive' ? 'ON' : 'OFF'}</span>
                </div>

                {/* Core Video Grid - We wrap it to customize z-index if needed */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                    <VideoConference />
                </div>

                {/* UI Layer */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none' }}>

                    {/* Translator Overlay */}
                    <div style={{ pointerEvents: 'auto' }}>
                        <TranslatorOverlay
                            subtitle={demoSubtitle}
                            speakerName="Alex (AI)"
                            isTranslating={true}
                        />
                    </div>

                    {/* Inclusive Controls (Bottom) */}
                    <div style={{ pointerEvents: 'auto' }}>
                        <InclusiveControls onSpeak={handleSpeak} />
                    </div>
                </div>
            </div>
        </LiveKitRoom>
    );
}
