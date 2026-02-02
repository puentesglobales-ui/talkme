import React, { useState } from 'react';
import './TalkMeVideo.css';

/**
 * The "Voice" of the mute user.
 * Types text -> Emits audio to the room.
 */
export default function InclusiveControls({ onSpeak }) {
    const [text, setText] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        setIsSpeaking(true);
        onSpeak(text);

        // Simulate speech duration for visual effect
        setTimeout(() => {
            setIsSpeaking(false);
            setText('');
        }, 2000);
    };

    return (
        <div className="inclusive-input-bar">
            {/* Waveform Visualization - Active when speaking */}
            {isSpeaking && (
                <div className="waveform-container" style={{ marginRight: '10px' }}>
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="wave-bar" style={{ animationDelay: `${i * 0.1}s` }}></div>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', width: '100%', gap: '10px' }}>
                <input
                    type="text"
                    className="voice-input-field"
                    placeholder="Escribe para hablar..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    autoFocus
                />

                <button type="submit" className="speak-button" disabled={isSpeaking}>
                    {isSpeaking ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                            <line x1="12" y1="19" x2="12" y2="23"></line>
                            <line x1="8" y1="23" x2="16" y2="23"></line>
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                    )}
                </button>
            </form>
        </div>
    );
}
