'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown, FileCode, Folder, FolderOpen } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    // Use string keys for project open state
    const [openProjects, setOpenProjects] = useState<Record<string, boolean>>({});
    const pathname = usePathname();

    const toggleProject = (name: string) => {
        setOpenProjects(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const files = [
        { name: 'README.md', path: '/', icon: <FileCode className="w-4 h-4 text-blue-400 mr-1" /> },
        { name: 'about.html', path: '/about', icon: <FileCode className="w-4 h-4 text-orange-500 mr-1" /> },
        { name: 'projects.tsx', path: '/projects', icon: <FileCode className="w-4 h-4 text-yellow-400 mr-1" /> },
        { name: 'contact.css', path: '/contact', icon: <FileCode className="w-4 h-4 text-blue-300 mr-1" /> },
    ];

    const projects = [
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
        }
    ];

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

                {isOpen && (
                    <div className="mt-0">
                        {/* Root Files */}
                        {files.map((file) => (
                            <Link
                                href={file.path}
                                key={file.path}
                                className={`flex items-center px-6 py-1 cursor-pointer hover:bg-[var(--vscode-hover)] ${pathname === file.path ? 'bg-[var(--vscode-selection)] text-white' : ''}`}
                            >
                                {file.icon}
                                <span>{file.name}</span>
                            </Link>
                        ))}

                        {/* Project Folders */}
                        {projects.map((project) => (
                            <div key={project.name}>
                                <div
                                    className="flex items-center px-6 py-1 cursor-pointer hover:bg-[var(--vscode-hover)] opacity-90"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleProject(project.name);
                                    }}
                                >
                                    {openProjects[project.name] ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
                                    <Folder className={`w-4 h-4 mr-1 ${openProjects[project.name] ? 'text-blue-400' : 'text-blue-300'}`} />
                                    <span>{project.name}</span>
                                </div>

                                {openProjects[project.name] && (
                                    <div className="ml-0">
                                        {project.files.map((file) => (
                                            <Link
                                                href={file.path}
                                                key={file.path}
                                                className={`flex items-center pl-12 pr-4 py-1 cursor-pointer hover:bg-[var(--vscode-hover)] ${pathname === file.path ? 'bg-[var(--vscode-selection)] text-white' : ''}`}
                                            >
                                                {file.icon}
                                                <span>{file.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
