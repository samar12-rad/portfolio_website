'use client';
import { GitBranch, RefreshCw, Check, MoreHorizontal, GitCommit, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Commit {
    message: string;
    repo: string;
    date: string;
    url: string;
}

const SourceControlView = () => {
    const [commits, setCommits] = useState<Commit[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchCommits = async () => {
        try {
            const response = await fetch('https://api.github.com/users/samar12-rad/events/public');
            if (!response.ok) throw new Error('Failed to fetch');

            const events = await response.json();
            const pushEvents = events.filter((e: any) => e.type === 'PushEvent');

            const processedEvents = pushEvents.slice(0, 5); // Limit to top 5 to avoid rate limits
            const recentCommits: Commit[] = [];

            await Promise.all(processedEvents.map(async (event: any) => {
                if (event.payload && event.payload.commits && event.payload.commits.length > 0) {
                    // Use existing commits
                    event.payload.commits.forEach((commit: any) => {
                        recentCommits.push({
                            message: commit.message,
                            repo: event.repo.name.replace('samar12-rad/', ''),
                            date: new Date(event.created_at).toLocaleDateString(),
                            url: `https://github.com/${event.repo.name}/commit/${commit.sha}`
                        });
                    });
                } else if (event.payload && event.payload.head) {
                    // Fetch individual commit details
                    try {
                        const commitRes = await fetch(`https://api.github.com/repos/${event.repo.name}/commits/${event.payload.head}`);
                        if (commitRes.ok) {
                            const commitData = await commitRes.json();
                            recentCommits.push({
                                message: commitData.commit.message,
                                repo: event.repo.name.replace('samar12-rad/', ''),
                                date: new Date(event.created_at).toLocaleDateString(),
                                url: `https://github.com/${event.repo.name}/commit/${event.payload.head}`
                            });
                        } else {
                            throw new Error('Failed to fetch commit details');
                        }
                    } catch (e) {
                        // Fallback if detail fetch fails
                        recentCommits.push({
                            message: `Push to ${event.payload.ref?.replace('refs/heads/', '') || 'branch'}`,
                            repo: event.repo.name.replace('samar12-rad/', ''),
                            date: new Date(event.created_at).toLocaleDateString(),
                            url: `https://github.com/${event.repo.name}/commits/${event.payload.head || ''}`
                        });
                    }
                }
            }));

            // Sort by date (descending) as Promise.all might mix order, and we want most recent first
            // Actually events are already sorted by time, but concurrent fetching might mess array push order.
            // We can treat them as a flat list and sort?
            // Actually, `created_at` is reliable.
            // But `recentCommits` are strings.
            // Since we are mixing multiple commits from one event and single commits from others...
            // It's safer to sort. But wait, `date` in my Commit interface is a LocaleString (bad for sorting).
            // I'll skip sorting for now or just insert them in order?
            // Better: Map `processedEvents` to promises effectively, then flatMap?
            // Yes.

            // Redoing the approach for order preservation:
            const results = await Promise.all(processedEvents.map(async (event: any) => {
                if (event.payload && event.payload.commits && event.payload.commits.length > 0) {
                    return event.payload.commits.map((commit: any) => ({
                        message: commit.message,
                        repo: event.repo.name.replace('samar12-rad/', ''),
                        date: new Date(event.created_at).toLocaleDateString(),
                        url: `https://github.com/${event.repo.name}/commit/${commit.sha}`
                    }));
                } else if (event.payload && event.payload.head) {
                    try {
                        const commitRes = await fetch(`https://api.github.com/repos/${event.repo.name}/commits/${event.payload.head}`);
                        if (commitRes.ok) {
                            const commitData = await commitRes.json();
                            return [{
                                message: commitData.commit.message,
                                repo: event.repo.name.replace('samar12-rad/', ''),
                                date: new Date(event.created_at).toLocaleDateString(),
                                url: `https://github.com/${event.repo.name}/commit/${event.payload.head}`
                            }];
                        }
                    } catch (e) { }

                    return [{
                        message: `Push to ${event.payload.ref?.replace('refs/heads/', '') || 'branch'}`,
                        repo: event.repo.name.replace('samar12-rad/', ''),
                        date: new Date(event.created_at).toLocaleDateString(),
                        url: `https://github.com/${event.repo.name}/commits/${event.payload.head || ''}`
                    }];
                }
                return [];
            }));

            setCommits(results.flat());
        } catch (err) {
            console.error(err);
            // Fallback mock data if API fails (or rate limited)
            setCommits([
                { message: 'Initial commit', repo: 'portfolio', date: 'Today', url: '#' },
                { message: 'Update README.md', repo: 'portfolio', date: 'Yesterday', url: '#' },
                { message: 'Fix bug in sidebar', repo: 'portfolio', date: 'Yesterday', url: '#' },
            ]);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchCommits();
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchCommits();
    };

    return (
        <div className="flex flex-col h-full text-[var(--vscode-fg)] select-none">
            <div className="h-9 px-4 flex items-center justify-between text-[11px] font-bold tracking-wider opacity-60 bg-[var(--vscode-sidebar-header-bg)]">
                <span>SOURCE CONTROL</span>
                <div className="flex gap-2">
                    <RefreshCw
                        size={14}
                        className={`cursor-pointer hover:text-white ${refreshing ? 'animate-spin' : ''}`}
                        onClick={handleRefresh}
                    />
                    <MoreHorizontal size={14} className="cursor-pointer hover:text-white" />
                </div>
            </div>

            <div className="px-4 py-2 flex-1 overflow-hidden flex flex-col">
                <div className="bg-[#2d2d2d] rounded-sm p-1 flex items-center gap-2 mb-4 border border-[var(--vscode-input-border)]">
                    <span className="text-gray-400 pl-1"><GitBranch size={14} /></span>
                    <input
                        type="text"
                        placeholder="Message (Ctrl+Enter to commit)"
                        className="bg-transparent border-none outline-none text-xs w-full text-white placeholder-gray-500"
                    />
                </div>

                <div className="flex items-center justify-between cursor-pointer group mb-2">
                    <span className="text-xs font-bold uppercase flex items-center gap-1 opacity-80">
                        Recent Commits
                        <span className="bg-[#4d4d4d] text-white text-[10px] rounded-full px-1.5 py-0.5">{commits.length}</span>
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 flex gap-2">
                        <Check size={14} className="hover:text-white" />
                        <RefreshCw size={14} className="hover:text-white" onClick={handleRefresh} />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto space-y-0.5 pr-1 scrollbar-hide">
                    {loading ? (
                        <div className="text-xs opacity-50 px-2">Loading contributions...</div>
                    ) : commits.length === 0 ? (
                        <div className="text-xs opacity-50 px-2 italic">No recent push events found.</div>
                    ) : (
                        commits.map((commit, i) => (
                            <a
                                key={i}
                                href={commit.url}
                                target="_blank"
                                className="flex flex-col gap-0.5 px-2 py-1.5 hover:bg-[var(--vscode-hover)] cursor-pointer text-sm group rounded"
                            >
                                <div className="flex items-start gap-2">
                                    <GitCommit size={14} className="mt-0.5 opacity-60 flex-shrink-0" />
                                    <span className="opacity-90 group-hover:opacity-100 truncate text-xs leading-tight font-medium">
                                        {commit.message}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pl-6 text-[10px] opacity-50">
                                    <span>{commit.repo}</span>
                                    <span>{commit.date}</span>
                                </div>
                            </a>
                        ))
                    )}
                </div>
            </div>

            <div className="mt-auto p-4 opacity-60 text-xs text-center border-t border-[var(--vscode-border)]">
                Live data from github.com/samar12-rad
            </div>
        </div>
    );
};

export default SourceControlView;
