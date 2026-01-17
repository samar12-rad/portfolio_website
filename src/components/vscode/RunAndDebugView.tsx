'use client';
import { Play, Bug, Settings, ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useTabs } from '@/components/providers/TabProvider';
import { projects } from '@/data/projects';

const RunAndDebugView = () => {
    const { addTab } = useTabs();
    const [openSection, setOpenSection] = useState(true);

    return (
        <div className="h-full bg-[var(--vscode-sidebar-bg)] text-[var(--vscode-fg)] flex flex-col font-sans text-sm">
            <div className="h-9 px-4 flex items-center text-[11px] font-bold tracking-wider opacity-60">
                RUN AND DEBUG
            </div>

            <div className="p-4 bg-[var(--vscode-bg)] border-b border-[var(--vscode-border)]">
                <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 bg-[#3c3c3c] flex items-center px-2 py-1 rounded text-xs cursor-pointer border border-transparent hover:border-[#007acc]">
                        <span className="truncate">Production Build</span>
                    </div>
                    <div className="bg-[#107c10] p-1.5 rounded cursor-pointer hover:opacity-90 transition-opacity">
                        <Play size={14} className="text-white fill-white" />
                    </div>
                    <div className="p-1.5 cursor-pointer hover:bg-[var(--vscode-hover)] rounded">
                        <Settings size={14} />
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="mt-2">
                    <div
                        className="flex items-center px-1 py-1 cursor-pointer hover:bg-[var(--vscode-hover)] opacity-90 font-bold text-xs"
                        onClick={() => setOpenSection(!openSection)}
                    >
                        {openSection ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
                        <span>DEPLOYMENTS</span>
                    </div>

                    {openSection && (
                        <div className="mt-1">
                            {projects.map(project => (
                                <div
                                    key={project.slug}
                                    className="px-4 py-1 flex items-center group cursor-pointer hover:bg-[var(--vscode-hover)]"
                                    onClick={() => addTab(`/project-view/${project.slug}/readme`, `${project.title}.md`)}
                                >
                                    <div className="flex-1 truncate opacity-80 group-hover:opacity-100 flex items-center gap-2">
                                        <Bug size={12} className="text-orange-400" />
                                        <span>{project.title}</span>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 flex items-center gap-2">
                                        <Play size={12} className="text-green-400 hover:scale-110 transition-transform" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RunAndDebugView;
