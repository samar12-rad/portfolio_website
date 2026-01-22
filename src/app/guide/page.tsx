'use client';
import { motion } from 'framer-motion';
import { Terminal, Layout, Command, Settings, Folder, Github, Play, MousePointer2, ArrowRight, Files, Search, SquareDashedBottomCode, Palette, User } from 'lucide-react';
import { useTabs } from '@/components/providers/TabProvider';
import { useHighlight } from '@/components/providers/HighlightProvider';

export default function Guide() {
    const { addTab } = useTabs();
    const { highlight, clear } = useHighlight();

    return (
        <div className="max-w-4xl mx-auto p-8 font-sans">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-4 text-[#569cd6]">Portfolio Handbook</h1>
                <p className="text-xl text-gray-400 mb-6">Master the VS Code environment to explore my work effectively.</p>
                <button
                    onClick={() => addTab('/shortcuts', 'shortcuts.md')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#007acc] hover:bg-[#005a9e] text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-blue-500/20"
                >
                    View Interactive Shortcuts <ArrowRight size={18} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Core Interface */}
                <div className="col-span-full mb-4">
                    <h2 className="text-2xl font-semibold border-b border-[#333] pb-2 mb-6 flex items-center gap-2">
                        <Layout className="text-[#ce9178]" />
                        Core Interface
                    </h2>
                </div>

                <FeatureCard
                    icon={<Layout className="text-blue-400" />}
                    title="Authentic Layout"
                    desc="Fully functional Activity Bar, Sidebar, Editor Area, Panel, and Status Bar tailored to mimic VS Code."
                    onMouseEnter={() => highlight('activity-bar')} // Just highlighting activity bar as a representative
                    onMouseLeave={clear}
                />
                <FeatureCard
                    icon={<MousePointer2 className="text-yellow-400" />}
                    title="Interactive Tabs"
                    desc="Open multiple files, drag to reorder (simulated), and close tabs just like in a real IDE."
                    onMouseEnter={() => highlight('tabs-container')}
                    onMouseLeave={clear}
                />
                <FeatureCard
                    icon={<Settings className="text-purple-400" />}
                    title="Live Settings"
                    desc="Edit 'settings.json' to instantly change themes, animations, zoom levels, and more."
                    onMouseEnter={() => highlight('main-editor')}
                    onMouseLeave={clear}
                />

                {/* Power User Features */}
                <div className="col-span-full mt-8 mb-4">
                    <h2 className="text-2xl font-semibold border-b border-[#333] pb-2 mb-6 flex items-center gap-2">
                        <Terminal className="text-[#4ec9b0]" />
                        Power User Features
                    </h2>
                </div>

                <FeatureCard
                    icon={<Terminal className="text-green-400" />}
                    title="Integrated Terminal"
                    desc="A real working terminal. Try commands like 'ls', 'cd', 'cat', 'whoami' to navigate the file system."
                    onMouseEnter={() => highlight('bottom-panel')}
                    onMouseLeave={clear}
                />
                <FeatureCard
                    icon={<Command className="text-orange-400" />}
                    title="Command Palette"
                    desc="Press Ctrl+Shift+P to open the global command palette and jump to files or run actions."
                    onMouseEnter={() => highlight('activity-bar-settings')}
                    onMouseLeave={clear}
                />
                <FeatureCard
                    icon={<Folder className="text-blue-300" />}
                    title="Career Timeline"
                    desc="Check the expanded Explorer sidebar for a custom Timeline view of my education and career."
                    onMouseEnter={() => highlight('sidebar-panel')}
                    onMouseLeave={clear}
                />

                {/* Sidebar Views */}
                <div className="col-span-full mt-8 mb-4">
                    <h2 className="text-2xl font-semibold border-b border-[#333] pb-2 mb-6 flex items-center gap-2">
                        <Github className="text-[#dcdcaa]" />
                        Sidebar Tools
                    </h2>
                </div>

                <FeatureCard
                    icon={<Files className="text-[#dcdcaa]" />}
                    title="Explorer"
                    desc="Navigate the project file structure, view 'README.md', and discover my portfolio code."
                    onMouseEnter={() => highlight('activity-bar-explorer')}
                    onMouseLeave={clear}
                />
                <FeatureCard
                    icon={<Search className="text-[#dcdcaa]" />}
                    title="Search"
                    desc="Search through the entire codebase (simulated) to find specific functions or text."
                    onMouseEnter={() => highlight('activity-bar-search')}
                    onMouseLeave={clear}
                />
                <FeatureCard
                    icon={<Github className="text-white" />}
                    title="Source Control"
                    desc="View my recent real-time GitHub commits and activity directly in the sidebar."
                    onMouseEnter={() => highlight('activity-bar-source-control')}
                    onMouseLeave={clear}
                />
                <FeatureCard
                    icon={<SquareDashedBottomCode className="text-blue-400" />}
                    title="Extensions"
                    desc="Browse installed 'extensions' used to build this portfolio (Tech Stack Showcase)."
                    onMouseEnter={() => highlight('activity-bar-extensions')}
                    onMouseLeave={clear}
                />
                <div className="col-span-full mt-4 mb-2">
                    <h3 className="text-xl font-semibold border-b border-[#333] pb-2 text-gray-300">UTILITIES</h3>
                </div>
                <FeatureCard
                    icon={<Palette className="text-orange-400" />}
                    title="Themes"
                    desc="Instantly switch between VS Code Dark, Light, GitHub, and other popular color themes."
                    onMouseEnter={() => highlight('activity-bar-theme')}
                    onMouseLeave={clear}
                />
                <FeatureCard
                    icon={<User className="text-green-400" />}
                    title="Profile & Socials"
                    desc="Access my contact details, LinkedIn, and GitHub profile links."
                    onMouseEnter={() => highlight('activity-bar-profile')}
                    onMouseLeave={clear}
                />
                <FeatureCard
                    icon={<Settings className="text-gray-400" />}
                    title="Settings Menu"
                    desc="Adjust detailed configuration options for the environment."
                    onMouseEnter={() => highlight('activity-bar-settings')}
                    onMouseLeave={clear}
                />
            </div>

            <div className="mt-16 text-center p-8 bg-[#252526] rounded-xl border border-[#333]">
                <h3 className="text-xl font-bold mb-2">Ready to explore?</h3>
                <p className="text-gray-400 mb-6">Use the Activity Bar on the left to navigate between views.</p>
                <div className="inline-block px-4 py-2 bg-[#007acc] text-white rounded font-medium">
                    Happy Coding! 🚀
                </div>
            </div>
        </div>
    );
}

const FeatureCard = ({ icon, title, desc, onMouseEnter, onMouseLeave }: { icon: React.ReactNode, title: string, desc: string, onMouseEnter?: () => void, onMouseLeave?: () => void }) => (
    <motion.div
        whileHover={{ y: -5, borderColor: '#007acc' }}
        className="p-6 bg-[#1e1e1e] border border-[#333] rounded-lg shadow-lg cursor-default"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        <div className="mb-4 p-3 bg-[#2d2d2d] rounded-full w-fit">
            {icon}
        </div>
        <h3 className="text-lg font-bold mb-2 text-gray-100">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
);
