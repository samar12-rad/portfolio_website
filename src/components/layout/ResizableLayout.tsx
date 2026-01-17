'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';



interface ResizableLayoutProps {
    children: React.ReactNode;
    isMobile?: boolean;
    sidebarOpen?: boolean;
    onSidebarClose?: () => void;
    sidebarContent?: React.ReactNode;
}

const ResizableLayout = ({ children, isMobile = false, sidebarOpen = true, onSidebarClose, sidebarContent }: ResizableLayoutProps) => {
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
        if (!isMobile) {
            window.addEventListener("mousemove", resize);
            window.addEventListener("mouseup", stopResizing);
            return () => {
                window.removeEventListener("mousemove", resize);
                window.removeEventListener("mouseup", stopResizing);
            };
        }
    }, [resize, stopResizing, isMobile]);

    return (
        <div className="flex flex-1 overflow-hidden relative">
            <AnimatePresence>
                {(sidebarOpen || !isMobile) && (
                    <motion.div
                        ref={sidebarRef}
                        initial={isMobile ? { x: -300 } : undefined}
                        animate={isMobile ? { x: 0 } : undefined}
                        exit={isMobile ? { x: -300 } : undefined}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{
                            width: isMobile ? '80%' : Math.max(170, Math.min(sidebarWidth, 600)),
                            position: isMobile ? 'absolute' : 'relative',
                            zIndex: isMobile ? 50 : 'auto',
                            height: '100%',
                            boxShadow: isMobile ? '2px 0 10px rgba(0,0,0,0.5)' : 'none'
                        }}
                        className="flex-shrink-0 flex flex-col bg-[var(--vscode-sidebar-bg)]"
                    >
                        {sidebarContent}

                        {/* Drag Handle - Only on Desktop */}
                        {
                            !isMobile && (
                                <div
                                    className="absolute right-0 top-0 bottom-0 w-[4px] cursor-col-resize hover:bg-[#007acc] active:bg-[#007acc] z-10 transition-colors opacity-0 hover:opacity-100 active:opacity-100"
                                    onMouseDown={startResizing}
                                />
                            )
                        }
                    </motion.div >
                )}
            </AnimatePresence >

            {/* Backdrop for Mobile */}
            {
                isMobile && sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black z-40"
                        onClick={onSidebarClose}
                    />
                )
            }

            {/* Content */}
            <div className="flex-1 min-w-0 h-full">
                {children}
            </div>
        </div >
    );
};

export default ResizableLayout;
