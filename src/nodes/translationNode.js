import React, { useState } from 'react';
import NodeWrapper from '../components/NodeWrapper';

export const LanguageTranslation = ({ id }) => {
    const [targetLanguage, setTargetLanguage] = useState('es');

    return (
        <NodeWrapper id={id} title="Language Translation" inputs={['text']} outputs={['translatedText']}>
            <div>
                <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="it">Italian</option>
                    <option value="ja">Japanese</option>
                </select>
            </div>
        </NodeWrapper>
    );
};