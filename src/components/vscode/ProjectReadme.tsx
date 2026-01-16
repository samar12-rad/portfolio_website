'use client';
import { motion } from 'framer-motion';

interface ProjectReadmeProps {
    title: string;
    description: string;
    overview: string;
    features: string[];
    techStack: string[];
    demoLink?: string;
    repoLink?: string;
    archDiagram?: string; // Markdown text or image url
}

const ProjectReadme = ({ title, description, overview, features, techStack, demoLink, repoLink }: ProjectReadmeProps) => {
    return (
        <div className="max-w-4xl mx-auto p-8 font-sans text-[var(--vscode-fg)]">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="border-b border-[var(--vscode-border)] pb-8 mb-8"
            >
                <div className="text-sm font-mono opacity-60 mb-2">README.md</div>
                <h1 className="text-4xl font-bold mb-4 tracking-tight">{title}</h1>
                <p className="text-xl opacity-80 max-w-2xl leading-relaxed">{description}</p>

                <div className="flex gap-4 mt-6">
                    {repoLink && (
                        <a href={repoLink} target="_blank" className="px-4 py-2 border border-[var(--vscode-fg)] rounded hover:bg-[var(--vscode-fg)] hover:text-[var(--vscode-bg)] transition-colors font-mono text-xs uppercase tracking-wide">
                            View Source
                        </a>
                    )}
                    {demoLink && (
                        <a href={demoLink} target="_blank" className="px-4 py-2 bg-[var(--vscode-status-bar)] text-white rounded hover:opacity-90 transition-opacity font-mono text-xs uppercase tracking-wide">
                            Live Demo
                        </a>
                    )}
                </div>
            </motion.div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="lg:col-span-2 space-y-8"
                >
                    <section>
                        <h2 className="text-2xl font-bold mb-4 border-b border-[var(--vscode-border)] pb-2">Overview</h2>
                        <div className="prose prose-invert max-w-none text-opacity-90 leading-7">
                            <p>{overview}</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 border-b border-[var(--vscode-border)] pb-2">Key Features</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3 p-3 bg-[var(--vscode-sidebar-bg)] border border-[var(--vscode-border)] rounded-lg hover:border-[var(--vscode-fg)] transition-colors">
                                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[var(--vscode-fg)] shrink-0"></span>
                                    <span className="text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="space-y-8"
                >
                    <section className="bg-[var(--vscode-sidebar-bg)] p-6 rounded-xl border border-[var(--vscode-border)]">
                        <h3 className="text-sm font-mono uppercase opacity-60 mb-4 tracking-wider">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {techStack.map(tech => (
                                <span key={tech} className="px-2 py-1 bg-[var(--vscode-bg)] border border-[var(--vscode-border)] rounded text-xs font-mono text-[var(--vscode-fg)]">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="bg-[var(--vscode-sidebar-bg)] p-6 rounded-xl border border-[var(--vscode-border)] opacity-80">
                        <h3 className="text-sm font-mono uppercase opacity-60 mb-4 tracking-wider">Status</h3>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="font-mono text-sm">Active Development</span>
                        </div>
                    </section>
                </motion.div>
            </div>
        </div>
    );
};

export default ProjectReadme;
