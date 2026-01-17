'use client';
import { useEffect, useState, useRef } from 'react';
import {
    Command,
    Copy,
    Scissors,
    ClipboardPaste,
    RefreshCw,
    AppWindow
} from 'lucide-react';

interface ContextMenuProps {
    onOpenCommandPalette: () => void;
}

const ContextMenu = ({ onOpenCommandPalette }: ContextMenuProps) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            setVisible(true);
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setVisible(false);
            }
        };

        // Attach to document to trap all right clicks
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('click', handleClick);
        };
    }, []);

    const handleAction = (action: string) => {
        setVisible(false);
        switch (action) {
            case 'command-palette':
                onOpenCommandPalette();
                break;
            case 'reload':
                window.location.reload();
                break;
            case 'copy':
                // Simulated copy (browser security often blocks programmatic copy from non-user-triggered events without clipboard API complication)
                navigator.clipboard.writeText(window.getSelection()?.toString() || '');
                break;
            case 'print':
                window.print();
                break;
        }
    };

    if (!visible) return null;

    return (
        <div
            ref={menuRef}
            className="fixed z-[9999] bg-[#252526] border border-[var(--vscode-border)] shadow-xl rounded-md py-1 min-w-[220px] text-[var(--vscode-fg)] text-xs font-sans animate-in fade-in duration-75"
            style={{ top: position.y, left: position.x }}
        >
            <MenuItem
                label="Command Palette..."
                shortcut="Ctrl+Shift+P"
                icon={<Command size={14} />}
                onClick={() => handleAction('command-palette')}
            />
            <div className="my-1 border-t border-[var(--vscode-border)] opacity-50"></div>

            <MenuItem
                label="Cut"
                shortcut="Ctrl+X"
                icon={<Scissors size={14} />}
                disabled
            />
            <MenuItem
                label="Copy"
                shortcut="Ctrl+C"
                icon={<Copy size={14} />}
                onClick={() => handleAction('copy')}
            />
            <MenuItem
                label="Paste"
                shortcut="Ctrl+V"
                icon={<ClipboardPaste size={14} />}
                disabled
            />

            <div className="my-1 border-t border-[var(--vscode-border)] opacity-50"></div>

            <MenuItem
                label="Reload Window"
                icon={<RefreshCw size={14} />}
                onClick={() => handleAction('reload')}
            />
            <MenuItem
                label="Print"
                icon={<AppWindow size={14} />}
                onClick={() => handleAction('print')}
            />
        </div>
    );
};

const MenuItem = ({ label, shortcut, icon, onClick, disabled }: { label: string, shortcut?: string, icon?: React.ReactNode, onClick?: () => void, disabled?: boolean }) => (
    <div
        onClick={!disabled ? onClick : undefined}
        className={`flex items-center px-4 py-1.5 gap-3 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-default' : 'hover:bg-[#094771] hover:text-white'}`}
    >
        <span className="opacity-70 w-4 flex justify-center">{icon}</span>
        <span className="flex-1">{label}</span>
        {shortcut && <span className="opacity-50 text-[10px] ml-4">{shortcut}</span>}
    </div>
);

export default ContextMenu;
