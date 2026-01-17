'use client';
import Link from 'next/link';
import Image from 'next/image';

import { useTabs } from '../providers/TabProvider';

const InteractiveReadme = () => {
    const { addTab } = useTabs();




    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 prose prose-invert prose-headings:text-[var(--vscode-fg)] prose-p:text-[var(--vscode-fg)] prose-strong:text-[#569cd6] prose-a:text-[#3794ff] prose-ul:text-[var(--vscode-fg)]">

            {/* Header / Intro */}
            <div className="text-center pb-2 mb-4 relative">
                {/* Desktop Button */}
                <Link href="/guide" onClick={() => addTab('/guide', 'handbook.md')}>
                    <div className="hidden md:inline-flex absolute top-[-50px] left-1/2 transform -translate-x-1/2 gap-2 px-4 py-2 bg-[#007acc]/10 border border-[#007acc] text-[#007acc] rounded-full text-sm font-bold cursor-pointer hover:bg-[#007acc]/20 transition-all">
                        <span>ℹ️ What is this website?</span>
                    </div>
                </Link>

                {/* Mobile Toast */}
                <Link href="/guide" onClick={() => addTab('/guide', 'handbook.md')}>
                    <div className="md:hidden fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#007acc] text-white rounded-full text-sm font-bold shadow-2xl cursor-pointer hover:bg-[#0063a5] transition-all animate-bounce">
                        <span>ℹ️ What is this?</span>
                    </div>
                </Link>

                <div className="relative w-full mb-4 md:mt-10 rounded-lg overflow-hidden border border-[var(--vscode-border)]">
                    <div className="w-full min-h-[400px] bg-gradient-to-r from-blue-900/40 to-purple-900/40 flex items-center justify-center p-8">
                        <div className="text-center flex flex-col items-center max-w-2xl">
                            <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-[#007acc] shadow-2xl">
                                <Image
                                    src="/new_pfp.jpeg"
                                    alt="Samarth Vaidya"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <h1 className="text-4xl font-bold text-[var(--vscode-fg)] mb-4">&lt;Samarth Vaidya /&gt;</h1>

                            <p className="text-lg text-[var(--vscode-fg)]/80 mb-6 leading-relaxed">
                                Full stack engineer with experience building and shipping production systems. Comfortable owning problems from idea to deployment.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <a href="https://github.com/samar12-rad" target="_blank" className="px-5 py-2 bg-[var(--vscode-sidebar-bg)] hover:bg-[var(--vscode-activity-bar-bg)] rounded flex items-center gap-2 transition-all no-underline border border-[var(--vscode-border)] text-[var(--vscode-fg)]">
                                    <Image src="/vscode_icon_transparent.png" width={20} height={20} alt="GitHub" className="w-5 h-5" />
                                    <span>GitHub</span>
                                </a>
                                <a href="https://linkedin.com/in/samarth-vaidya" target="_blank" className="px-5 py-2 bg-[#0077b5] hover:bg-[#006097] text-white rounded flex items-center gap-2 transition-all no-underline border border-transparent">
                                    <span>LinkedIn</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* About & Stats Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
                <div className="">
                    <h2 className="border-b border-[var(--vscode-border)] pb-2 text-2xl font-semibold mt-0">🧠 About Me</h2>
                    <p className="mt-4 text-[var(--vscode-fg)]/80">
                        I work best close to real users, iterating based on feedback and production behavior rather than assumptions. Strong bias toward simple, understandable systems that scale through clarity, not complexity.
                    </p>
                    <ul className="space-y-1 mt-4 text-[var(--vscode-fg)]/80 list-disc pl-5">
                        <li><strong>Primary Languages:</strong> TypeScript, JavaScript, Go</li>
                        <li><strong>Frontend:</strong> React.js, Next.js</li>
                        <li><strong>Backend:</strong> Gin-Gonic (Go), Express.js, Node.js</li>
                        <li><strong>Database:</strong> PostgreSQL, MongoDB, Redis</li>
                        <li><strong>DevOps:</strong> Docker, Github Actions, CI/CD, Linux (Ubuntu)</li>
                    </ul>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-[var(--vscode-sidebar-bg)] rounded-lg border border-[var(--vscode-border)]">
                    <h3 className="text-sm font-mono text-[var(--vscode-fg)]/60 mb-4 self-start w-full border-b border-[var(--vscode-border)] pb-2">GITHUB STATS</h3>
                    <div className="w-full relative aspect-[4/3] flex items-center justify-center">
                        <Image
                            src="https://awesome-github-stats.azurewebsites.net/user-stats/samar12-rad?cardType=level&preferLogin=false"
                            alt="Github Stats"
                            fill
                            className="object-contain"
                            unoptimized
                        />
                    </div>
                </div>
            </div>

            {/* Experience Timeline */}
            <div className="mb-12">
                <h2 className="border-b border-[var(--vscode-border)] pb-2 text-2xl font-semibold">💼 Work Experience</h2>
                <div className="border-l-2 border-[var(--vscode-border)] ml-4 mt-6 space-y-8">
                    <TimelineItem
                        role="SDE Intern"
                        company="Codenscious Technologies Ltd."
                        date="Jan 2025 - April 2025"
                        items={[
                            "Worked on production web modules handling large datasets, focusing on performance, correctness, and maintainability.",
                            "Improved load times by ~40% by optimizing data flow and rendering logic across key user-facing modules.",
                            "Integrated Docker-based workflows, automated testing, and CI pipelines to improve deployment reliability.",
                            "Learned firsthand how system design and data modeling decisions surface under real production load."
                        ]}
                    />
                    <TimelineItem
                        role="Web Developer Intern"
                        company="The Hustle House, Indore"
                        date="April 2024 - June 2024"
                        items={[
                            "Streamlined codebase by refactoring HTML, CSS, and JavaScript for improved performance and maintainability.",
                            "Collaborated with designers to ensure seamless implementation of UI/UX designs into functional web pages."
                        ]}
                    />
                    <TimelineItem
                        role="Full Stack Developer"
                        company="TEDxDAVV"
                        date="Jan 2024 - March 2024"
                        items={[
                            "Involved across the full lifecycle of projects, from early idea discussions and design iterations to final development.",
                            "Refactored frontend codebases for clarity, performance, and long-term maintainability."
                        ]}
                    />
                </div>
            </div>

            {/* Projects */}
            <div className="mb-12">
                <h2 className="border-b border-[var(--vscode-border)] pb-2 text-2xl font-semibold">🔬 Projects</h2>
                <div className="grid grid-cols-1 gap-6 mt-6">
                    <ProjectCard
                        title="Timetable & Attendance Management System"
                        tech="React, Go (Gin), PostgreSQL, MongoDB, Linux, Docker"
                        slug="tt-management"
                        desc="Built and deployed a production system used by faculty to manage schedules and attendance. Owned backend architecture, frontend workflows, and deployment from start to finish. Implemented role-based access for faculty and admins; student view added after launch demand. Split backend into microservices and led deployment using Linux servers, static IPs, and subdomains."
                    />
                    <ProjectCard
                        title="Peer Connect"
                        tech="MERN Stack, Web Sockets, JWT, MongoDB, Docker"
                        slug="peer-connect"
                        desc="A social platform for coders, enabling networking and collaboration. Built with the MERN stack, it features authentication, real-time messaging, and user profile management."
                    />
                    <ProjectCard
                        title="EduWiz"
                        tech="React, Express.JS, MongoDB"
                        slug="eduwiz"
                        desc="Developed the backend system for an educational platform using Node.js, implementing secure REST APIs and integration with MongoDB. Created an intuitive portal for educators to manage classes and students."
                    />
                </div>
            </div>

            {/* Achievements & Leadership */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                    <h2 className="border-b border-[var(--vscode-border)] pb-2 text-2xl font-semibold">🏆 Achievements</h2>
                    <ul className="list-disc pl-5 mt-4 text-[var(--vscode-fg)]/80 space-y-2">
                        <li>Secured a <strong>Rank of 120</strong> in GSSOC 2024 ext. Open Source Competition (Oct - Nov 2024), with peak Rank 5.</li>
                    </ul>
                </div>
                <div>
                    <h2 className="border-b border-[var(--vscode-border)] pb-2 text-2xl font-semibold">🚀 Leadership</h2>
                    <ul className="list-disc pl-5 mt-4 text-[var(--vscode-fg)]/80 space-y-2">
                        <li><strong>Mentored junior developers</strong> during IIPS Summer Internship, focusing on technical guidance and code reviews.</li>
                        <li>Served as <strong>Tech Lead for TEDx DAVV 2024</strong>, delivering the official website and overseeing project planning.</li>
                    </ul>
                </div>
            </div>

            {/* Education */}
            <div className="mb-12">
                <h2 className="border-b border-[var(--vscode-border)] pb-2 text-2xl font-semibold">🎓 Education</h2>
                <div className="mt-4 space-y-4">
                    <div>
                        <h3 className="text-lg font-bold text-[var(--vscode-fg)]">Integrated Master of Technology in Information Technology</h3>
                        <p className="text-[var(--vscode-fg)]/70">International Institute of Professional Studies, DAVV</p>
                        <p className="text-sm text-[var(--vscode-fg)]/50">7.2 CGPA | Expected 2026</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-[var(--vscode-fg)]">CBSE [12th Board]</h3>
                        <p className="text-[var(--vscode-fg)]/70">Alpine Academy, Indore</p>
                        <p className="text-sm text-[var(--vscode-fg)]/50">78% | 2019 - 2020</p>
                    </div>
                </div>
            </div>

            <div className="text-center text-sm text-gray-500 mt-16 border-t border-[var(--vscode-border)] pt-8">
                <p>Designed with ❤️ using Next.js & Tailwind CSS</p>
            </div>
        </div>
    );
};

const TimelineItem = ({ role, company, date, items }: { role: string, company: string, date: string, items: string[] }) => (
    <div className="relative pl-8 group">
        <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#007acc] border-4 border-[var(--vscode-bg)] group-hover:scale-125 transition-transform"></div>
        <h4 className="text-xl font-bold text-[var(--vscode-fg)]">{role}</h4>
        <div className="text-[#007acc] font-semibold mb-1">@ {company}</div>
        <span className="text-xs font-mono text-[var(--vscode-fg)]/60 mb-3 block">{date}</span>
        <ul className="list-disc pl-4 space-y-1 text-[var(--vscode-fg)]/70 text-sm">
            {items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
    </div>
);

const ProjectCard = ({ title, tech, desc, slug }: { title: string, tech: string, desc: string, slug?: string }) => {
    const { addTab } = useTabs();

    // Map titles to slugs if not provided (fallback)
    const getSlug = (title: string) => {
        if (title.includes('Timetable')) return 'tt-management';
        if (title.includes('Peer')) return 'peer-connect';
        if (title.includes('Edu')) return 'eduwiz';
        if (title.includes('Envoy')) return 'envoy-config'; // Assumption based on previous implementation
        return 'perfolyze'; // fallback
    };

    const targetSlug = slug || getSlug(title);

    return (
        <div
            onClick={() => addTab(`/project-view/${targetSlug}/readme`, `${title}.md`)}
            className="p-6 bg-[var(--vscode-sidebar-bg)] hover:bg-[var(--vscode-activity-bar-bg)] border border-[var(--vscode-border)] rounded-lg transition-all cursor-pointer hover:border-[#007acc] hover:-translate-y-1 block"
        >
            <h3 className="text-xl font-bold text-blue-400 mb-1">{title}</h3>
            <p className="text-xs font-mono text-yellow-500 mb-3">{tech}</p>
            <p className="text-[var(--vscode-fg)]/80 text-sm leading-relaxed">{desc}</p>
        </div>
    );
};

export default InteractiveReadme;
