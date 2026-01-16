'use client';
import { useState, useEffect, useRef } from 'react';
import { Search, FileCode, ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { useTabs } from '../providers/TabProvider';

interface SearchPaletteProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchPalette = ({ isOpen, onClose }: SearchPaletteProps) => {
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const { addTab } = useTabs();

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Handle Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!isOpen) return null;

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );

    const handleSelect = (slug: string, title: string) => {
        addTab(`/project-view/${slug}/readme`, `${title}.md`);
        onClose();
        setQuery('');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={onClose}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

            {/* Modal */}
            <div
                className="w-full max-w-2xl bg-[#252526] border border-[var(--vscode-border)] shadow-2xl rounded-lg overflow-hidden flex flex-col relative z-60"
                onClick={e => e.stopPropagation()}
                style={{ maxHeight: '60vh' }}
            >
                <div className="flex items-center p-3 border-b border-[var(--vscode-border)] bg-[#3c3c3c]">
                    <Search className="w-5 h-5 text-gray-400 mr-3" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search projects by name, description, or tags..."
                        className="flex-1 bg-transparent border-none outline-none text-[var(--vscode-fg)] placeholder-gray-500 font-sans"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <div className="text-xs text-gray-400 border border-gray-600 px-2 py-0.5 rounded">ESC to close</div>
                </div>

                <div className="overflow-y-auto flex-1 p-2">
                    {filteredProjects.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">No matching projects found.</div>
                    ) : (
                        <div className="space-y-1">
                            {filteredProjects.map((project, index) => (
                                <div
                                    key={project.slug}
                                    className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-[var(--vscode-hover)] group"
                                    onClick={() => handleSelect(project.slug, project.title)}
                                >
                                    <div className="flex items-center overflow-hidden">
                                        <FileCode className="w-4 h-4 text-blue-400 mr-3 flex-shrink-0" />
                                        <div className="flex flex-col min-w-0">
                                            <span className="font-semibold text-sm truncate text-[var(--vscode-fg)]">
                                                {project.title}
                                                <span className="text-xs font-normal text-gray-500 ml-2">.md</span>
                                            </span>
                                            <span className="text-xs text-gray-500 truncate mt-0.5">{project.description}</span>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {query.length === 0 && (
                    <div className="px-4 py-2 bg-[var(--vscode-sidebar-bg)] border-t border-[var(--vscode-border)] text-xs text-gray-500">
                        Type to search across all projects...
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPalette;
