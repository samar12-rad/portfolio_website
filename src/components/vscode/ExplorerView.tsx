'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown, FileCode, Folder, FolderOpen, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isTimelineOpen, setIsTimelineOpen] = useState(true);
    // Use string keys for project open state
    const [openProjects, setOpenProjects] = useState<Record<string, boolean>>({});
    const pathname = usePathname();

    const toggleProject = (name: string) => {
        setOpenProjects(prev => ({ ...prev, [name]: !prev[name] }));
    };

    // Listen for "Expand All" event from Suggestion Toast
    useEffect(() => {
        const handleExpandAll = () => {
            if (!isOpen) setIsOpen(true);
            setOpenProjects({
                '.vscode': true,
                'Recent Work': true,
                'perfolyze': true,
                'peer-connect': true,
                'tt-management': true,
                'envoy-config': true,
                'tedx-davv': true
            });
        };

        window.addEventListener('vscode:expand-explorer', handleExpandAll);
        return () => window.removeEventListener('vscode:expand-explorer', handleExpandAll);
    }, [isOpen]);

    const files = [
        { name: 'README.md', path: '/', icon: <FileCode className="w-4 h-4 text-blue-400 mr-1" /> },
        { name: 'handbook.md', path: '/guide', icon: <FileCode className="w-4 h-4 text-yellow-300 mr-1" /> },
        { name: 'about.html', path: '/about', icon: <FileCode className="w-4 h-4 text-orange-500 mr-1" /> },
        { name: 'projects.tsx', path: '/projects', icon: <FileCode className="w-4 h-4 text-yellow-400 mr-1" /> },
        { name: 'contact.css', path: '/contact', icon: <FileCode className="w-4 h-4 text-blue-300 mr-1" /> },
    ];

    const projectStructure = [
        {
            name: 'Recent Work',
            children: [
                {
                    name: 'perfolyze',
                    files: [
                        { name: 'README.md', path: '/project-view/perfolyze/readme', icon: <FileCode className="w-4 h-4 text-blue-300 mr-1" /> },
                        { name: 'perfolyze.exe', path: '/project-view/perfolyze/run', icon: <FileCode className="w-4 h-4 text-green-400 mr-1" /> }
                    ]
                },
                {
                    name: 'peer-connect',
                    files: [
                        { name: 'README.md', path: '/project-view/peer-connect/readme', icon: <FileCode className="w-4 h-4 text-blue-300 mr-1" /> },
                        { name: 'peer-connect.exe', path: '/project-view/peer-connect/run', icon: <FileCode className="w-4 h-4 text-green-400 mr-1" /> }
                    ]
                },
                {
                    name: 'tt-management',
                    files: [
                        { name: 'README.md', path: '/project-view/tt-management/readme', icon: <FileCode className="w-4 h-4 text-blue-300 mr-1" /> },
                        { name: 'tt-utils.exe', path: '/project-view/tt-management/run', icon: <FileCode className="w-4 h-4 text-green-400 mr-1" /> }
                    ]
                },
                {
                    name: 'envoy-config',
                    files: [
                        { name: 'README.md', path: '/project-view/envoy-config/readme', icon: <FileCode className="w-4 h-4 text-blue-300 mr-1" /> },
                        { name: 'envoy.exe', path: '/project-view/envoy-config/run', icon: <FileCode className="w-4 h-4 text-green-400 mr-1" /> }
                    ]
                },
                {
                    name: 'tedx-davv',
                    files: [
                        { name: 'README.md', path: '/project-view/tedx-davv/readme', icon: <FileCode className="w-4 h-4 text-blue-300 mr-1" /> },
                        { name: 'website.exe', path: '/project-view/tedx-davv/run', icon: <FileCode className="w-4 h-4 text-green-400 mr-1" /> }
                    ]
                }
            ]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        show: { opacity: 1, x: 0 }
    };

    return (
        <div className="h-full bg-[var(--vscode-sidebar-bg)] text-[var(--vscode-fg)] flex flex-col border-r border-[var(--vscode-border)] font-sans text-sm flex-shrink-0 select-none overflow-y-auto w-full transition-colors">
            <div className="h-9 px-4 flex items-center text-[11px] font-bold tracking-wider opacity-60">
                EXPLORER
            </div>

            <div className="">
                <div
                    className="flex items-center px-1 py-1 cursor-pointer hover:bg-[var(--vscode-hover)] transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
                    <span className="font-bold text-xs uppercase tracking-wide">PORTFOLIO</span>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="mt-0"
                        >
                            {/* Root Files */}
                            {files.map((file) => (
                                <Link
                                    href={file.path}
                                    key={file.path}
                                >
                                    <motion.div
                                        variants={itemVariants}
                                        className={`flex items-center px-6 py-1 cursor-pointer hover:bg-[var(--vscode-hover)] ${pathname === file.path ? 'bg-[var(--vscode-selection)] text-white' : ''}`}
                                    >
                                        {file.icon}
                                        <span>{file.name}</span>
                                    </motion.div>
                                </Link>
                            ))}

                            {/* .vscode configuration folder */}
                            <motion.div variants={itemVariants}>
                                <div
                                    className="flex items-center px-6 py-1 cursor-pointer hover:bg-[var(--vscode-hover)] opacity-90"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleProject('.vscode');
                                    }}
                                >
                                    {openProjects['.vscode'] ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
                                    <Folder className={`w-4 h-4 mr-1 ${openProjects['.vscode'] ? 'text-[#80cbc4]' : 'text-[#80cbc4]'}`} />
                                    <span>.vscode</span>
                                </div>
                            </motion.div>

                            {openProjects['.vscode'] && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="ml-4 border-l border-gray-700/50"
                                >
                                    <Link href="/settings.json">
                                        <motion.div
                                            variants={itemVariants}
                                            initial="hidden"
                                            animate="show"
                                            className={`flex items-center pl-12 pr-4 py-1 cursor-pointer hover:bg-[var(--vscode-hover)] ${pathname === '/settings.json' ? 'bg-[var(--vscode-selection)] text-white' : ''}`}
                                        >
                                            <Settings className="w-4 h-4 text-[#80cbc4] mr-1" />
                                            <span>settings.json</span>
                                        </motion.div>
                                    </Link>
                                </motion.div>
                            )}

                            {/* Recent Work Folder */}
                            <motion.div variants={itemVariants}>
                                <div
                                    className="flex items-center px-6 py-1 cursor-pointer hover:bg-[var(--vscode-hover)] opacity-90"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleProject('Recent Work');
                                    }}
                                >
                                    {openProjects['Recent Work'] ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
                                    <Folder className={`w-4 h-4 mr-1 ${openProjects['Recent Work'] ? 'text-blue-400' : 'text-blue-300'}`} />
                                    <span>Recent Work</span>
                                </div>
                            </motion.div>

                            {/* Nested Projects inside Recent Work */}
                            {openProjects['Recent Work'] && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="ml-4 border-l border-gray-700/50"
                                >
                                    {projectStructure[0].children.map((project) => (
                                        <div key={project.name}>
                                            <motion.div
                                                variants={itemVariants}
                                                initial="hidden"
                                                animate="show"
                                                className="flex items-center px-6 py-1 cursor-pointer hover:bg-[var(--vscode-hover)] opacity-90"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    toggleProject(project.name);
                                                }}
                                            >
                                                {openProjects[project.name] ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
                                                <Folder className={`w-4 h-4 mr-1 ${openProjects[project.name] ? 'text-blue-400' : 'text-blue-300'}`} />
                                                <span>{project.name}</span>
                                            </motion.div>

                                            {openProjects[project.name] && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    className="ml-0"
                                                >
                                                    {project.files.map((file) => (
                                                        <Link
                                                            href={file.path}
                                                            key={file.path}
                                                        >
                                                            <motion.div
                                                                variants={itemVariants}
                                                                initial="hidden"
                                                                animate="show"
                                                                className={`flex items-center pl-12 pr-4 py-1 cursor-pointer hover:bg-[var(--vscode-hover)] ${pathname === file.path ? 'bg-[var(--vscode-selection)] text-white' : ''}`}
                                                            >
                                                                {file.icon}
                                                                <span>{file.name}</span>
                                                            </motion.div>
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Timeline Section */}
            <div className="border-t border-[var(--vscode-border)] mt-auto">
                <div
                    className="flex items-center px-1 py-1 cursor-pointer hover:bg-[var(--vscode-hover)] transition-colors"
                    onClick={() => setIsTimelineOpen(!isTimelineOpen)}
                >
                    {isTimelineOpen ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
                    <span className="font-bold text-xs uppercase tracking-wide">TIMELINE</span>
                </div>
                {isTimelineOpen && (
                    <div className="px-4 py-2 text-xs opacity-70 pb-4">
                        <div className="relative pl-3 border-l-2 border-[var(--vscode-border)] space-y-4">
                            <div className="relative">
                                <div className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-blue-500 ring-4 ring-[var(--vscode-sidebar-bg)]"></div>
                                <div className="font-bold text-blue-400">2025 - 2026</div>
                                <div>M.Tech</div>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-green-500 ring-4 ring-[var(--vscode-sidebar-bg)]"></div>
                                <div className="font-bold text-green-400">2021 - 2025</div>
                                <div>B.Tech</div>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-orange-500 ring-4 ring-[var(--vscode-sidebar-bg)]"></div>
                                <div className="font-bold text-orange-400">2018 - 2020</div>
                                <div>High School</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
