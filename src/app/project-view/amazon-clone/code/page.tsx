
'use client';

export default function Code() {

    const runCode = () => {
        // Dispatch custom event for Terminal to pick up
        const event = new CustomEvent('terminal-run-command', { detail: { command: 'npm start' } });
        window.dispatchEvent(event);
    };

    return (
        <div className="font-mono text-sm relative group">
            {/* Run Button - Floats top right */}
            <div className="absolute top-0 right-4 z-10">
                <button
                    onClick={runCode}
                    className="flex items-center gap-2 bg-[#2d2d2d] hover:bg-[#0e639c] text-white px-3 py-1 rounded text-xs border border-[#444] transition-all shadow-lg"
                    title="Run Code (Start Server)"
                >
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M3 2l10 6-10 6z" />
                    </svg>
                    <span className="font-semibold">Run</span>
                </button>
            </div>

            <div className="text-gray-500">// main.tsx - Entry point for Amazon Clone</div>
            <br />
            <div>
                <span className="text-purple-400">import</span> React <span className="text-purple-400">from</span> <span className="text-orange-300">'react'</span>;
            </div>
            <div>
                <span className="text-purple-400">import</span> ReactDOM <span className="text-purple-400">from</span> <span className="text-orange-300">'react-dom/client'</span>;
            </div>
            <div>
                <span className="text-purple-400">import</span> App <span className="text-purple-400">from</span> <span className="text-orange-300">'./App'</span>;
            </div>
            <div>
                <span className="text-purple-400">import</span> <span className="text-orange-300">'./index.css'</span>;
            </div>
            <br />
            <div>
                <span className="text-purple-400">const</span> root = ReactDOM.<span className="text-blue-300">createRoot</span>(
            </div>
            <div className="pl-4">
                document.<span className="text-blue-300">getElementById</span>(<span className="text-orange-300">'root'</span>) <span className="text-purple-400">as</span> HTMLElement
            </div>
            <div>);</div>
            <br />
            <div>
                root.<span className="text-blue-300">render</span>(
            </div>
            <div className="pl-4">
                <span className="text-gray-400">&lt;</span><span className="text-green-400">React.StrictMode</span><span className="text-gray-400">&gt;</span>
            </div>
            <div className="pl-8">
                <span className="text-gray-400">&lt;</span><span className="text-green-400">App</span> <span className="text-gray-400">/&gt;</span>
            </div>
            <div className="pl-4">
                <span className="text-gray-400">&lt;/</span><span className="text-green-400">React.StrictMode</span><span className="text-gray-400">&gt;</span>
            </div>
            <div>);</div>
        </div>
    );
}
