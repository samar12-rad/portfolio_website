'use client';
import ExplorerView from './ExplorerView';
import SourceControlView from './SourceControlView';
import ExtensionsView from './ExtensionsView';
import RunAndDebugView from './RunAndDebugView';

import SearchView from './SearchView';

interface SidebarManagerProps {
    activeView: string;
}

const SidebarManager = ({ activeView }: SidebarManagerProps) => {
    switch (activeView) {
        case 'explorer':
            return <ExplorerView />;
        case 'search':
            return <SearchView />;
        case 'source-control':
            return <SourceControlView />;
        case 'extensions':
            return <ExtensionsView />;
        case 'run-debug':
            return <RunAndDebugView />;
        default:
            return <ExplorerView />;
    }
};

export default SidebarManager;
