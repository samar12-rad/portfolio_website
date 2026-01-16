'use client';
import Link from 'next/link';
import { useTabs } from '@/components/providers/TabProvider';
import { projects } from '@/data/projects';

export default function Projects() {
    const { addTab } = useTabs();
    return (
        <div className="p-8 max-w-6xl mx-auto font-sans text-[var(--vscode-fg)]">
            <h1 className="text-3xl font-bold mb-8 pb-4 border-b border-[var(--vscode-border)]">
                Projects
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div
                        key={project.slug}
                        className="group block cursor-pointer"
                        onClick={() => addTab(`/project-view/${project.slug}/readme`, `${project.title}.md`)}
                    >
                        <div className="h-full bg-[#252526] border border-[var(--vscode-border)] hover:border-[#007acc] rounded-lg p-6 transition-all hover:-translate-y-1 shadow-sm hover:shadow-xl">
                            <h2 className="text-xl font-bold text-blue-400 mb-2 group-hover:underline">
                                {project.title}
                            </h2>
                            <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 text-xs bg-[#2d2d2d] text-gray-300 rounded border border-[#3e3e3e]"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
