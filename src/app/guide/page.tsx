'use client';
import { motion } from 'framer-motion';
import { Terminal, Layout, Command, Settings, Folder, Github, Play, MousePointer2 } from 'lucide-react';

export default function Guide() {
    return (
        <div className="max-w-4xl mx-auto p-8 font-sans">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-4 text-[#569cd6]">Portfolio Handbook</h1>
                <p className="text-xl text-gray-400">Master the VS Code environment to explore my work effectively.</p>
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
                />
                <FeatureCard
                    icon={<MousePointer2 className="text-yellow-400" />}
                    title="Interactive Tabs"
                    desc="Open multiple files, drag to reorder (simulated), and close tabs just like in a real IDE."
                />
                <FeatureCard
                    icon={<Settings className="text-purple-400" />}
                    title="Live Settings"
                    desc="Edit 'settings.json' to instantly change themes, animations, zoom levels, and more."
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
                />
                <FeatureCard
                    icon={<Command className="text-orange-400" />}
                    title="Command Palette"
                    desc="Press Ctrl+Shift+P to open the global command palette and jump to files or run actions."
                />
                <FeatureCard
                    icon={<Folder className="text-blue-300" />}
                    title="Career Timeline"
                    desc="Check the expanded Explorer sidebar for a custom Timeline view of my education and career."
                />

                {/* Sidebar Views */}
                <div className="col-span-full mt-8 mb-4">
                    <h2 className="text-2xl font-semibold border-b border-[#333] pb-2 mb-6 flex items-center gap-2">
                        <Github className="text-[#dcdcaa]" />
                        Sidebar Tools
                    </h2>
                </div>

                <FeatureCard
                    icon={<Github className="text-white" />}
                    title="Source Control"
                    desc="View my recent real-time GitHub commits and activity directly in the sidebar."
                />
                <FeatureCard
                    icon={<Play className="text-green-500" />}
                    title="Run & Debug"
                    desc="Launch my projects directly from the 'Run & Debug' view to see live deployments."
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

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <motion.div
        whileHover={{ y: -5, borderColor: '#007acc' }}
        className="p-6 bg-[#1e1e1e] border border-[#333] rounded-lg shadow-lg"
    >
        <div className="mb-4 p-3 bg-[#2d2d2d] rounded-full w-fit">
            {icon}
        </div>
        <h3 className="text-lg font-bold mb-2 text-gray-100">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
);
