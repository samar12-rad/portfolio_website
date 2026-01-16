'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useTabs } from '../providers/TabProvider';

const InteractiveReadme = () => {
    return (
        <div className="max-w-4xl mx-auto p-8 prose prose-invert prose-headings:text-[var(--vscode-fg)] prose-p:text-[var(--vscode-fg)] prose-strong:text-[#569cd6] prose-a:text-[#3794ff] prose-ul:text-[var(--vscode-fg)]">

            {/* Header / Intro */}
            <div className="text-center border-b border-[var(--vscode-border)] pb-8 mb-8">
                <div className="relative w-full h-80 mb-6 rounded-lg overflow-hidden border border-[#333]">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-purple-900/40 flex items-center justify-center">
                        <div className="text-center flex flex-col items-center">
                            <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-[#007acc] shadow-2xl">
                                <Image
                                    src="/pfp.jpg"
                                    alt="Samarth Vaidya"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span className="text-4xl font-mono text-blue-300 font-bold">{'<Samarth />'}</span>
                            <span className="text-sm font-mono text-gray-400 mt-2">v.samarth1212@gmail.com • +91-7987832613 • Indore, MP</span>
                        </div>
                    </div>
                </div>

                <h1 className="text-4xl font-bold mb-4">Samarth Vaidya</h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-4">
                    Full stack engineer with experience building and shipping production systems. comfortable owning problems from idea to deployment.
                </p>

                <div className="flex justify-center gap-4 mt-6">
                    <a href="https://github.com/samar12-rad" target="_blank" className="px-4 py-2 bg-[#2d2d2d] hover:bg-[#3d3d3d] rounded flex items-center gap-2 transition-all no-underline">
                        <Image src="/vscode_icon_transparent.png" width={20} height={20} alt="GitHub" className="w-5 h-5" />
                        <span>GitHub</span>
                    </a>
                    <a href="https://linkedin.com/in/samarth-vaidya" target="_blank" className="px-4 py-2 bg-[#0077b5] hover:bg-[#006097] text-white rounded flex items-center gap-2 transition-all no-underline">
                        <span>LinkedIn</span>
                    </a>
                </div>
            </div>

            {/* About & Stats Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
                <div className="">
                    <h2 className="border-b border-[#333] pb-2 text-2xl font-semibold mt-0">🧠 About Me</h2>
                    <p className="mt-4 text-gray-300">
                        I work best close to real users, iterating based on feedback and production behavior rather than assumptions. Strong bias toward simple, understandable systems that scale through clarity, not complexity.
                    </p>
                    <ul className="space-y-1 mt-4 text-gray-300 list-disc pl-5">
                        <li><strong>Primary Languages:</strong> TypeScript, JavaScript, Go</li>
                        <li><strong>Frontend:</strong> React.js, Next.js</li>
                        <li><strong>Backend:</strong> Gin-Gonic (Go), Express.js, Node.js</li>
                        <li><strong>Database:</strong> PostgreSQL, MongoDB, Redis</li>
                        <li><strong>DevOps:</strong> Docker, Github Actions, CI/CD, Linux (Ubuntu)</li>
                    </ul>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-[#252526] rounded-lg border border-[var(--vscode-border)]">
                    <h3 className="text-sm font-mono text-gray-400 mb-4 self-start w-full border-b border-[#333] pb-2">GITHUB STATS</h3>
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
                <h2 className="border-b border-[#333] pb-2 text-2xl font-semibold">💼 Work Experience</h2>
                <div className="border-l-2 border-[#333] ml-4 mt-6 space-y-8">
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
                <h2 className="border-b border-[#333] pb-2 text-2xl font-semibold">🔬 Projects</h2>
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
                    <h2 className="border-b border-[#333] pb-2 text-2xl font-semibold">🏆 Achievements</h2>
                    <ul className="list-disc pl-5 mt-4 text-gray-300 space-y-2">
                        <li>Secured a <strong>Rank of 120</strong> in GSSOC 2024 ext. Open Source Competition (Oct - Nov 2024), with peak Rank 5.</li>
                    </ul>
                </div>
                <div>
                    <h2 className="border-b border-[#333] pb-2 text-2xl font-semibold">🚀 Leadership</h2>
                    <ul className="list-disc pl-5 mt-4 text-gray-300 space-y-2">
                        <li><strong>Mentored junior developers</strong> during IIPS Summer Internship, focusing on technical guidance and code reviews.</li>
                        <li>Served as <strong>Tech Lead for TEDx DAVV 2024</strong>, delivering the official website and overseeing project planning.</li>
                    </ul>
                </div>
            </div>

            {/* Education */}
            <div className="mb-12">
                <h2 className="border-b border-[#333] pb-2 text-2xl font-semibold">🎓 Education</h2>
                <div className="mt-4 space-y-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-200">Integrated Master of Technology in Information Technology</h3>
                        <p className="text-gray-400">International Institute of Professional Studies, DAVV</p>
                        <p className="text-sm text-gray-500">7.2 CGPA | Expected 2026</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-200">CBSE [12th Board]</h3>
                        <p className="text-gray-400">Alpine Academy, Indore</p>
                        <p className="text-sm text-gray-500">78% | 2019 - 2020</p>
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
        <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#007acc] border-4 border-[#1e1e1e] group-hover:scale-125 transition-transform"></div>
        <h4 className="text-xl font-bold text-gray-200">{role}</h4>
        <div className="text-[#007acc] font-semibold mb-1">@ {company}</div>
        <span className="text-xs font-mono text-gray-500 mb-3 block">{date}</span>
        <ul className="list-disc pl-4 space-y-1 text-gray-400 text-sm">
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
            className="p-6 bg-[#252526] hover:bg-[#2d2d2d] border border-[var(--vscode-border)] rounded-lg transition-all cursor-pointer hover:border-[#007acc] hover:-translate-y-1 block"
        >
            <h3 className="text-xl font-bold text-blue-400 mb-1">{title}</h3>
            <p className="text-xs font-mono text-yellow-500 mb-3">{tech}</p>
            <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
        </div>
    );
};

export default InteractiveReadme;
