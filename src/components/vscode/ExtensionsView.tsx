'use client';
import { Settings, Search, Filter, Monitor, Code2, Database, Layout, Server, Globe, Terminal } from 'lucide-react';

const ExtensionsView = () => {
    const extensions = [
        // Languages
        { name: 'Python', description: 'Data Science & AI support', version: '3.12.1', author: 'Python Software Foundation', icon: <Code2 className="text-[#3776ab]" />, installed: true },
        { name: 'C++', description: 'High-performance applications', version: '20', author: 'ISO', icon: <Code2 className="text-[#00599C]" />, installed: true },
        { name: 'Java', description: 'Enterprise grade development', version: '21', author: 'Oracle', icon: <Code2 className="text-[#f89820]" />, installed: true },
        { name: 'JavaScript', description: 'ES6+ IntelliSense', version: 'ES2024', author: 'OpenJS', icon: <Code2 className="text-[#f7df1e]" />, installed: true },
        { name: 'TypeScript', description: 'Type-safe development', version: '5.3.3', author: 'Microsoft', icon: <Monitor className="text-[#3178c6]" />, installed: true },
        { name: 'Go', description: 'Systems programming', version: '1.21', author: 'Google', icon: <Globe className="text-[#00add8]" />, installed: true },
        { name: 'C', description: 'System resources access', version: '17', author: 'ISO', icon: <Code2 className="text-[#A8B9CC]" />, installed: true },
        { name: 'HTML & CSS', description: 'Web standards support', version: '5.0', author: 'W3C', icon: <Layout className="text-[#e34c26]" />, installed: true },

        // Frameworks & Libraries
        { name: 'React.js', description: 'UI Component library', version: '18.2.0', author: 'Meta', icon: <Code2 className="text-[#61dafb]" />, installed: true },
        { name: 'Next.js', description: 'The React Framework', version: '14.1.0', author: 'Vercel', icon: <Server className="text-white" />, installed: true },
        { name: 'Node.js', description: 'JavaScript runtime', version: '20.10.0', author: 'OpenJS', icon: <Server className="text-[#339933]" />, installed: true },
        { name: 'Express.js', description: 'Web framework for Node.js', version: '4.18.2', author: 'OpenJS', icon: <Server className="text-white" />, installed: true },
        { name: 'Tailwind CSS', description: 'Utility-first styling', version: '3.4.1', author: 'Tailwind Labs', icon: <Layout className="text-[#38bdf8]" />, installed: true },
        { name: 'Framer Motion', description: 'Animation library', version: '10.18.0', author: 'Framer', icon: <Monitor className="text-[#ff0055]" />, installed: true },
        { name: 'GSAP', description: 'GreenSock Animation Platform', version: '3.12.5', author: 'GreenSock', icon: <Monitor className="text-[#88ce02]" />, installed: true },
        { name: 'Mantine UI', description: 'React components library', version: '7.5.0', author: 'Mantine', icon: <Layout className="text-[#339af0]" />, installed: true },

        // Databases & Backend
        { name: 'PostgreSQL', description: 'Relational database', version: '16.1', author: 'PostgreSQL', icon: <Database className="text-[#336791]" />, installed: true },
        { name: 'MongoDB', description: 'NoSQL database', version: '7.0', author: 'MongoDB Inc', icon: <Database className="text-[#47A248]" />, installed: true },
        { name: 'Redis', description: 'In-memory data structure store', version: '7.2', author: 'Redis', icon: <Database className="text-[#DC382D]" />, installed: true },
        { name: 'ElasticSearch', description: 'Search & Analytics engine', version: '8.12', author: 'Elastic', icon: <Search className="text-[#005571]" />, installed: true },
        { name: 'Prisma', description: 'Next-generation ORM', version: '5.9.0', author: 'Prisma', icon: <Database className="text-white" />, installed: true },
        { name: 'Trpc API', description: 'End-to-end typesafe APIs', version: '11.0', author: 'TRPC', icon: <Server className="text-[#398ccb]" />, installed: true },

        // DevOps & Tools
        { name: 'Docker', description: 'Containerization platform', version: '25.0', author: 'Docker Inc', icon: <Server className="text-[#2496ed]" />, installed: true },
        { name: 'Kubernetes', description: 'Container orchestration', version: '1.29', author: 'CNCF', icon: <Server className="text-[#326ce5]" />, installed: true },
        { name: 'Git', description: 'Version control system', version: '2.43', author: 'Git', icon: <Code2 className="text-[#f05032]" />, installed: true },
        { name: 'Linux / Ubuntu', description: 'Operating System support', version: '22.04', author: 'Canonical', icon: <Terminal className="text-[#E95420]" />, installed: true },

        // Stacks & Concepts
        { name: 'MERN Stack', description: 'Mongo, Express, React, Node', version: '1.0.0', author: 'FullStack', icon: <Layout className="text-[#00ed64]" />, installed: true },
        { name: 'REST API', description: 'Restful web services', version: 'Standard', author: 'Fielding', icon: <Globe className="text-[#FF6C37]" />, installed: true },
        { name: 'JSON/XML', description: 'Data interchange formats', version: '1.0', author: 'ECMA', icon: <Code2 className="text-gray-400" />, installed: true },
    ];

    return (
        <div className="flex flex-col h-full text-[var(--vscode-fg)] select-none">
            <div className="h-9 px-4 flex items-center justify-between text-[11px] font-bold tracking-wider opacity-60 bg-[var(--vscode-sidebar-header-bg)]">
                <span>EXTENSIONS</span>
                <div className="flex gap-2">
                    <Filter size={14} className="cursor-pointer hover:text-white" />
                    <MoreHorizontal size={14} className="cursor-pointer hover:text-white" />
                </div>
            </div>

            <div className="px-4 py-2 border-b border-[var(--vscode-border)]">
                <div className="bg-[#2d2d2d] rounded-sm p-1 flex items-center gap-2 border border-[var(--vscode-input-border)]">
                    <input
                        type="text"
                        placeholder="Search Extensions in Marketplace"
                        className="bg-transparent border-none outline-none text-xs w-full text-white placeholder-gray-500"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="px-4 py-2 text-xs font-bold opacity-60 uppercase">Enabled</div>

                {extensions.map((ext, i) => (
                    <div key={i} className="flex gap-3 px-4 py-3 hover:bg-[var(--vscode-hover)] cursor-pointer border-l-2 border-transparent hover:border-[var(--vscode-focusBorder)]">
                        <div className="w-8 h-8 flex items-center justify-center bg-[#252526] rounded">
                            {ext.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-sm truncate">{ext.name}</span>
                                {ext.installed && <span className="text-[10px] opacity-60 bg-blue-900/50 px-1 rounded">Installed</span>}
                            </div>
                            <div className="text-xs opacity-70 truncate">{ext.description}</div>
                            <div className="text-[10px] opacity-50 mt-1 flex gap-2">
                                <span>{ext.author}</span>
                                <span>v{ext.version}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Start: Add import for MoreHorizontal which was missing in the header
import { MoreHorizontal } from 'lucide-react';

export default ExtensionsView;
