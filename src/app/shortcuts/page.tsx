'use client';
import { motion } from 'framer-motion';
import { Terminal, Layout, Command, Settings, Folder, Github, Play, MousePointer2, ArrowRight } from 'lucide-react';
import { useTabs } from '@/components/providers/TabProvider';
import { useTerminal } from '@/components/providers/TerminalProvider';

export default function ShortcutsPage() {
    const { addTab } = useTabs();
    const { toggleTerminal } = useTerminal();

    // Helper to simulate actions
    const triggerAction = (action: string) => {
        switch (action) {
            case 'terminal':
                toggleTerminal();
                break;
            case 'settings':
                // Creating a custom event that MainLayout or SuggestionManager listens to would be ideal,
                // but for now let's just use the command palette trigger if available globally
                // Or simply open the settings file
                // Changing logic to dispatch a global event or valid tab
                // For settings, let's open a mock settings file or trigger the command palette
                window.dispatchEvent(new CustomEvent('vscode:open-command-palette', { detail: { mode: 'commands' } }));
                break;
            case 'explorer':
                window.dispatchEvent(new Event('vscode:expand-explorer'));
                break;
            case 'projects':
                addTab('/projects', 'projects.tsx');
                break;
            case 'source-control':
                // Dispatch event or just rely on manual nav?
                // Let's use custom event to ask MainLayout/SidebarManager to switch view?
                // Wait, MainLayout has setActiveSidebarView. Global event can handle this if we set it up.
                // For now, let's just trigger the sidebar toggle if closed, but we can't easily switch specific view remotely without context.
                // I'll stick to 'explorer' expansions for now or implement view switching event.
                // Let's rely on just opening the relevant thing.
                // Actually, I can just dispatch 'vscode:switch-view' if I implement listener in MainLayout.
                window.dispatchEvent(new CustomEvent('vscode:switch-view', { detail: { view: 'github' } }));
                break;

            default:
                break;
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 font-sans pb-20">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-4 text-[#4ec9b0]">Interactive Shortcuts</h1>
                <p className="text-xl text-gray-400">Click on any card to run the feature instantly.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <ShortcutCard
                    icon={<Terminal className="text-green-400" />}
                    title="Toggle Terminal"
                    command="Ctrl + `"
                    desc="Opens the integrated terminal to run system commands."
                    onClick={() => triggerAction('terminal')}
                />

                <ShortcutCard
                    icon={<Folder className="text-blue-400" />}
                    title="View Projects"
                    command="Explorer"
                    desc="Navigate to the projects directory to see my work."
                    onClick={() => triggerAction('projects')}
                />

                <ShortcutCard
                    icon={<Settings className="text-purple-400" />}
                    title="Open Command Palette"
                    command="Ctrl + Shift + P"
                    desc="Access all commands, settings, and themes."
                    onClick={() => triggerAction('settings')}
                />

                <ShortcutCard
                    icon={<Layout className="text-yellow-400" />}
                    title="Expand Explorer"
                    command="Ctrl + Shift + E"
                    desc="Focus on the file explorer sidebar."
                    onClick={() => triggerAction('explorer')}
                />

                <ShortcutCard
                    icon={<Github className="text-white" />}
                    title="Source Control"
                    command="Ctrl + Shift + G"
                    desc="View Git changes and commits."
                    onClick={() => triggerAction('source-control')}
                />


            </div>

            <div className="mt-12 bg-[#252526] p-6 rounded-lg border border-[#333] border-l-4 border-l-blue-500">
                <h3 className="text-lg font-bold mb-2 text-white">Need more help?</h3>
                <p className="text-gray-400 text-sm">
                    Most elements in this portfolio are interactive. Try right-clicking on files, dragging tabs, or exploring the status bar!
                </p>
            </div>
        </div>
    );
}

const ShortcutCard = ({ icon, title, command, desc, onClick }: { icon: React.ReactNode, title: string, command: string, desc: string, onClick?: () => void }) => (
    <motion.button
        whileHover={{ scale: 1.02, backgroundColor: '#2a2d2e' }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="text-left w-full p-6 bg-[#1e1e1e] border border-[#333] rounded-lg shadow-lg group transition-all relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 p-2 bg-[#333] text-[10px] font-mono text-gray-400 rounded-bl-lg opacity-50 group-hover:opacity-100 transition-opacity">
            {command}
        </div>
        <div className="flex items-start gap-4">
            <div className="p-3 bg-[#2d2d2d] rounded-md group-hover:bg-[#383838] transition-colors">
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-bold text-gray-100 flex items-center gap-2">
                    {title}
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-400" />
                </h3>
                <p className="text-sm text-gray-400 mt-1 leading-relaxed">{desc}</p>
            </div>
        </div>
    </motion.button>
);
