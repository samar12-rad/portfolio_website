'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Code2, Cpu, Globe, Database, PenTool, Terminal, Coffee, Gamepad2, ArrowRight } from 'lucide-react';

export default function About() {
    return (
        <div className="max-w-5xl mx-auto p-8 font-sans pb-20">

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row items-center gap-12 mb-20"
            >
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-[#1e1e1e]">
                        <Image
                            src="/new_pfp.jpeg"
                            alt="Samarth Vaidya"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    {/* Status Badge */}
                    <div className="absolute -bottom-2 -right-4 bg-[#252526] border border-[#333] px-4 py-1.5 rounded-full flex items-center gap-2 shadow-xl z-10 hover:scale-105 transition-transform cursor-help" title="Let him cook">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-medium text-gray-200">Let him <span className='text-red-600'>cook</span></span>
                    </div>
                </div>

                <div className="text-center md:text-left flex-1">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                        Samarth Vaidya
                    </h1>
                    <h2 className="text-2xl text-gray-400 mb-6">
                        Full Stack Engineer
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                        I build software by thinking in systems, not screens.
                        I care about how data flows, how state evolves, and how small decisions compound over time.
                        I enjoy working on problems where requirements are unclear and constraints are real.
                        That is usually where the interesting work lives.
                    </p>
                </div>
            </motion.div>

            {/* How I Think */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8"
            >
                <div className="bg-[#252526] p-8 rounded-xl border border-[#333]">
                    <div className="flex items-center gap-3 mb-4">
                        <Cpu className="text-blue-400" size={24} />
                        <h3 className="text-xl font-bold text-white">Engineering Mindset</h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed">
                        I optimize for clarity and reliability.
                        I prefer simple abstractions that survive change over clever solutions that break under pressure.
                        I care about maintainability because most software lives longer than expected.
                    </p>
                </div>

                <div className="bg-[#252526] p-8 rounded-xl border border-[#333]">
                    <div className="flex items-center gap-3 mb-4">
                        <PenTool className="text-purple-400" size={24} />
                        <h3 className="text-xl font-bold text-white">Product Judgment</h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed">
                        I think about users even when writing backend code.
                        If something feels confusing, I fix the flow instead of adding more layers.
                        Good products feel obvious because hard decisions were made early.
                    </p>
                </div>
            </motion.section>

            {/* What Drives Me */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-20"
            >
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <ArrowRight className="text-blue-400" />
                    <span>What Drives Me</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-[#252526] p-8 rounded-xl border border-[#333]">
                        <h3 className="text-xl font-bold text-white mb-3">Building under uncertainty</h3>
                        <p className="text-gray-400 leading-relaxed">
                            I like early stage problems where answers are not obvious.
                            Tradeoffs between speed and correctness.
                            Decisions that cannot be reversed easily.
                            That tension is where I do my best work.
                        </p>
                    </div>

                    <div className="bg-[#252526] p-8 rounded-xl border border-[#333]">
                        <h3 className="text-xl font-bold text-white mb-3">Startups and systems</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Silicon Valley resonates with me because it captures reality.
                            Smart people making imperfect decisions with limited time.
                            Progress comes from iteration, not perfection.
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* Tech Stack */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-20"
            >
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <Terminal className="text-green-400" />
                    <span>Tools I Trust</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { name: "React / Next.js", icon: <Globe className="text-cyan-400" /> },
                        { name: "TypeScript", icon: <Code2 className="text-blue-500" /> },
                        { name: "Node.js", icon: <Database className="text-green-500" /> },
                        { name: "System Design", icon: <Cpu className="text-orange-400" /> },
                    ].map((skill, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5, backgroundColor: "#2a2d2e" }}
                            className="bg-[#1e1e1e] border border-[#333] p-4 rounded-lg flex items-center gap-3"
                        >
                            {skill.icon}
                            <span className="font-medium text-gray-200">{skill.name}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Outside Code */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <Coffee className="text-yellow-400" />
                    <span>Outside Code</span>
                </h2>
                <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                    <HobbyCard
                        title="FIFA"
                        desc="Competitive by instinct. Love when a great comeback happens. Fav player -> griezmann"
                        color="bg-blue-500"
                    />
                    <HobbyCard
                        title="Chess"
                        desc="Around 1000 ELO, but may win by letting you get overconfident"
                        color="bg-green-500"
                    />
                    <HobbyCard
                        title="Valorant"
                        desc="Will insta lock Reyna main, but may die as soon as entering site (still a noble death) "
                        color="bg-red-500"
                    />
                    <HobbyCard
                        title="Shows"
                        desc="The Office for comfort. Silicon Valley for realism."
                        color="bg-purple-500"
                    />
                    <HobbyCard
                        title="Badminton"
                        desc="Fast reflexes and clear mind. The sound of a perfect smash."
                        color="bg-pink-500"
                    />
                </div>
            </motion.section>

            <div className="mt-20 pt-10 border-t border-[#333] text-center text-gray-500 text-sm">
                <p>Built with intention. Shipped with care.</p>
            </div>
        </div>
    );
}

const HobbyCard = ({ title, desc, color }: { title: string; desc: string; color: string }) => (
    <motion.div
        whileHover={{ scale: 1.03 }}
        className="relative overflow-hidden bg-[#252526] p-6 rounded-xl border border-[#333] w-full md:w-64 flex-shrink-0"
    >
        <div className={`absolute top-0 left-0 w-full h-1 ${color}`} />
        <div className="flex items-center gap-2 mb-3">
            <Gamepad2 size={20} className="text-gray-300" />
            <h3 className="font-bold text-lg text-white">{title}</h3>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">
            {desc}
        </p>
    </motion.div>
);
