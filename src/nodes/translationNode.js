import React, { useEffect, useState } from 'react';
import NodeWrapper from '../components/NodeWrapper';
import { useStore } from '../store';

const languageLabels = {
    'es': 'Spanish translated text',
    'fr': 'French translated text',
    'de': 'German translated text',
    'it': 'Italian translated text',
    'ja': 'Japanese translated text'
};

export const LanguageTranslation = ({ id }) => {
    const [targetLanguage, setTargetLanguage] = useState('es');
    const updateNodeField = useStore(state => state.updateNodeField);

    useEffect(() => {
        updateNodeField(id, 'outputLabel', languageLabels[targetLanguage]);
    }, [targetLanguage, id, updateNodeField]);

    return (
        <NodeWrapper id={id} title="Language Translation" inputs={['text']} outputs={[languageLabels[targetLanguage]]}>
            <div>
                <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="it">Italian</option>
                    <option value="ja">Japanese</option>
                </select>
            </div>
        </NodeWrapper >
    );
};