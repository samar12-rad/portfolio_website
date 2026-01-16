import { GitBranch, Wifi, Bell, Check } from 'lucide-react';

const StatusBar = () => {
    return (
        <div className="h-6 bg-[var(--vscode-status-bar)] text-white text-xs flex items-center px-2 justify-between select-none">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 hover:bg-white/20 px-1 rounded cursor-pointer">
                    <GitBranch size={12} />
                    <span>main</span>
                </div>
                <div className="flex items-center gap-1 hover:bg-white/20 px-1 rounded cursor-pointer">
                    <div className="w-3 h-3 rounded-full border border-white flex items-center justify-center text-[8px]">0</div>
                    <div className="w-3 h-3 rounded-full border border-white flex items-center justify-center text-[8px]">0</div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 hover:bg-white/20 px-1 rounded cursor-pointer">
                    <Wifi size={12} />
                    <span>Go Live</span>
                </div>
                <div className="flex items-center gap-2 hover:bg-white/20 px-1 rounded cursor-pointer">
                    <Check size={12} />
                    <span>Prettier</span>
                </div>
                <div className="flex items-center gap-2 hover:bg-white/20 px-1 rounded cursor-pointer">
                    <Bell size={12} />
                </div>
            </div>
        </div>
    );
};

export default StatusBar;
