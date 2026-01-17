'use client';
import { useState } from 'react';
import { ChevronRight, ChevronDown, File } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTabs } from '../providers/TabProvider';
import { projects } from '@/data/projects';

const SearchView = () => {
    const [query, setQuery] = useState('');
    const [isExpanded, setIsExpanded] = useState(true);
    const { addTab } = useTabs();

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
    );

    const hasResults = query.length > 0 && filteredProjects.length > 0;

    return (
        <div className="flex flex-col h-full text-[var(--vscode-fg)] select-none">
            <div className="px-4 py-2 text-[11px] font-bold tracking-wider opacity-60 uppercase bg-[var(--vscode-sidebar-header-bg)] h-9 flex items-center">
                Search
            </div>

            <div className="p-4 space-y-3">
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search (Ctrl+Shift+F)"
                        className="w-full bg-[var(--vscode-input-bg)] border border-[var(--vscode-input-border)] text-[var(--vscode-fg)] text-xs p-1.5 focus:border-[var(--vscode-focusBorder)] outline-none placeholder:opacity-50"
                        autoFocus
                    />
                </div>
                {/* Simulated Replace Input (Visual only) */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Replace"
                        disabled
                        className="w-full bg-[var(--vscode-input-bg)] border border-[var(--vscode-input-border)] text-[var(--vscode-fg)] text-xs p-1.5 opacity-50 cursor-not-allowed"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {query.length === 0 ? (
                    <div className="px-4 text-xs opacity-50 text-center mt-4">
                        Search for projects, tags, or file content to see results.
                    </div>
                ) : (
                    <div className="flex flex-col">
                        {hasResults ? (
                            <div className="flex flex-col">
                                <div
                                    className="flex items-center gap-1 px-2 py-1 cursor-pointer hover:bg-[var(--vscode-hover)] text-xs font-bold text-[#3794ff]"
                                    onClick={() => setIsExpanded(!isExpanded)}
                                >
                                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                    <span>{filteredProjects.length} results in {filteredProjects.length} files</span>
                                </div>
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                        >
                                            {filteredProjects.map((project, i) => (
                                                <div key={i} className="flex flex-col">
                                                    <div className="flex items-center gap-2 px-6 py-1 hover:bg-[var(--vscode-hover)] cursor-pointer text-xs group"
                                                        onClick={() => addTab(`/project-view/${project.slug}/readme`, `${project.title}.md`)}
                                                    >
                                                        <File size={14} className="opacity-60" />
                                                        <span className="truncate">{project.title}.md</span>
                                                        <span className="ml-auto opacity-0 group-hover:opacity-100 text-[10px] text-gray-500">src/projects</span>
                                                    </div>
                                                    {/* Simulated 'match' line */}
                                                    <div className="px-10 py-0.5 hover:bg-[var(--vscode-hover)] cursor-pointer text-[11px] opacity-70 truncate font-mono">
                                                        <span className="opacity-50">...</span>
                                                        <span className="bg-[#ea5c0055] text-white">
                                                            {project.title.substring(0, Math.min(project.title.length, 10))}
                                                        </span>
                                                        <span className="opacity-50">...</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="px-4 text-xs opacity-50 text-center mt-4">
                                No results found.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchView;
