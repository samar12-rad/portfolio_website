'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export interface Tab {
    path: string;
    name: string;
    icon?: React.ReactNode;
}

interface TabContextType {
    tabs: Tab[];
    activeTab: string;
    addTab: (path: string, name: string) => void;
    closeTab: (path: string) => void;
    setActiveTab: (path: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children }: { children: React.ReactNode }) {
    const [tabs, setTabs] = useState<Tab[]>([]);
    const [activeTab, setActiveTab] = useState<string>('');
    const pathname = usePathname();
    const router = useRouter();

    const getFileName = (path: string) => {
        if (path.includes('/readme')) return 'README.md';
        if (path.includes('/run')) return 'EXE';
        if (path.includes('/code')) return 'main.tsx';
        switch (path) {
            case '/': return 'README.md';
            case '/about': return 'about.html';
            case '/projects': return 'projects.tsx';
            case '/contact': return 'contact.css';
            default: return path.split('/').pop() || 'unknown';
        }
    };

    // Sync pathname with tabs
    useEffect(() => {
        const name = getFileName(pathname);

        // Add tab if it doesn't exist
        setTabs(prev => {
            if (prev.some(t => t.path === pathname)) return prev;
            return [...prev, { path: pathname, name }];
        });

        setActiveTab(pathname);
    }, [pathname]);

    const addTab = (path: string, name: string) => {
        if (!tabs.find(t => t.path === path)) {
            setTabs([...tabs, { path, name }]);
        }
        setActiveTab(path);
        router.push(path);
    };

    const closeTab = (path: string) => {
        const newTabs = tabs.filter(t => t.path !== path);
        setTabs(newTabs);

        if (activeTab === path) {
            // If we closed the active tab, navigate to the last one, or home if empty
            if (newTabs.length > 0) {
                const lastTab = newTabs[newTabs.length - 1];
                setActiveTab(lastTab.path);
                router.push(lastTab.path);
            } else {
                router.push('/');
            }
        }
    };

    return (
        <TabContext.Provider value={{ tabs, activeTab, addTab, closeTab, setActiveTab }}>
            {children}
        </TabContext.Provider>
    );
}

export function useTabs() {
    const context = useContext(TabContext);
    if (context === undefined) {
        throw new Error('useTabs must be used within a TabProvider');
    }
    return context;
}
