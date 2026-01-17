'use client';
import { useState, useEffect } from 'react';
import { useSettings } from '../providers/SettingsProvider';
import { Save } from 'lucide-react';

const SettingsJson = () => {
    const { zoomLevel, animationsEnabled, showLineNumbers, updateSettingsFromJson } = useSettings();
    const [content, setContent] = useState('');
    const [isDirty, setIsDirty] = useState(false);

    // Initial load
    useEffect(() => {
        const settings = {
            "window.zoomLevel": zoomLevel,
            "editor.animations": animationsEnabled,
            "editor.lineNumbers": showLineNumbers,
            "workbench.colorTheme": "Default Dark Modern",
            "editor.fontFamily": "Consolas, 'Courier New', monospace"
        };
        setContent(JSON.stringify(settings, null, 4));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        setIsDirty(true);
    };

    const handleSave = () => {
        updateSettingsFromJson(content);
        setIsDirty(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            handleSave();
        }
    };

    return (
        <div className="h-full flex flex-col font-mono text-sm bg-[var(--vscode-bg)]">
            <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--vscode-border)] bg-[var(--vscode-sidebar-header-bg)]">
                <span className="text-xs opacity-70">settings.json {isDirty && '●'}</span>
                <button
                    onClick={handleSave}
                    className={`flex items-center gap-2 px-3 py-1 rounded text-xs transition-colors ${isDirty ? 'bg-[var(--vscode-status-bar)] text-white hover:opacity-90' : 'bg-transparent opacity-50 cursor-default'}`}
                >
                    <Save size={14} />
                    Save
                </button>
            </div>
            <div className="flex-1 relative">
                <textarea
                    value={content}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    spellCheck="false"
                    className="w-full h-full bg-[#1e1e1e] text-[#d4d4d4] p-4 outline-none resize-none font-mono leading-relaxed"
                />
            </div>
        </div>
    );
};

export default SettingsJson;
