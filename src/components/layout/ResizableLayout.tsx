'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

const ResizableLayout = ({ children }: { children: React.ReactNode }) => {
    const [sidebarWidth, setSidebarWidth] = useState(240); // Initial width
    const [isResizing, setIsResizing] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const startResizing = useCallback(() => {
        setIsResizing(true);
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = useCallback(
        (mouseMoveEvent: MouseEvent) => {
            if (isResizing) {
                setSidebarWidth(mouseMoveEvent.clientX - (sidebarRef.current?.getBoundingClientRect().left || 0));
            }
        },
        [isResizing]
    );

    useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [resize, stopResizing]);

    // Sidebar Component (Mock import or use children if we passed sidebar as prop, but here we hardcode Sidebar component inside)
    // Actually, MainLayout expects this wrapper to contain ONLY the editor area, 
    // and Sidebar is a sibling in the flex container in MainLayout.
    // Wait, my MainLayout Usage:
    // <ResizableLayout> {Editor} </ResizableLayout>
    // AND Sidebar was sitting OUTSIDE. 
    // The Previous MainLayout had:
    // <ActivityBar />
    // <ResizableLayout> ... </ResizableLayout>
    // And ResizableLayout contained BOTH Sidebar and Editor in the previous lib version.

    // So I need to import Sidebar here OR change MainLayout to pass Sidebar as a prop.
    // Let's import Sidebar here to match the previous structure I setup.

    // However, I need to make sure I import Sidebar correctly.

    return (
        <div className="flex flex-1 overflow-hidden">
            {/* Sidebar Wrapper */}
            <div
                ref={sidebarRef}
                style={{ width: Math.max(170, Math.min(sidebarWidth, 600)) }}
                className="flex-shrink-0 flex flex-col relative"
            >
                {/* I need to render Sidebar here. */}
                <SidebarWrapper />

                {/* Drag Handle */}
                <div
                    className="absolute right-0 top-0 bottom-0 w-[4px] cursor-col-resize hover:bg-[#007acc] active:bg-[#007acc] z-10 transition-colors opacity-0 hover:opacity-100 active:opacity-100"
                    onMouseDown={startResizing}
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                {children}
            </div>
        </div>
    );
};

// Start: Mock sidebar logic for now, or real sidebar
import Sidebar from '../vscode/Sidebar';

const SidebarWrapper = () => {
    return <Sidebar />;
}

export default ResizableLayout;
