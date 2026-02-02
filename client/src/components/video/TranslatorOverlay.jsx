import React from 'react';
import './TalkMeVideo.css';

/**
 * Overlay that displays real-time translated subtitles
 * "Netflix Style" - Clean, legible, and unobtrusive.
 */
export default function TranslatorOverlay({ subtitle, speakerName, isTranslating }) {
    if (!subtitle) return null;

    return (
        <div className="translator-overlay">
            <div className="subtitle-pill">
                {speakerName && <span className="speaker-name">{speakerName}:</span>}
                <span className="subtitle-text">{subtitle}</span>
            </div>
            {isTranslating && (
                <div style={{ fontSize: '0.75rem', marginTop: '8px', opacity: 0.6 }}>
                    Traducido en tiempo real por TalkMe AI
                </div>
            )}
        </div>
    );
}
