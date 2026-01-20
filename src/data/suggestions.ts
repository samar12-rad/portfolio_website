export interface Suggestion {
    id: string;
    text: string;
    actionLabel?: string;
    action: {
        type: 'commandPalette' | 'toggleSidebar' | 'toggleTerminal' | 'switchView' | 'none';
        payload?: string;
    };
    elementId?: string;
    device?: 'mobile' | 'desktop' | 'all';
}

export const suggestions: Suggestion[] = [
    {
        id: 'cmd-palette',
        text: 'Tip: Press Ctrl+Shift+P to open the Command Palette for quick access to all features.',
        action: { type: 'commandPalette', payload: 'commands' },
        device: 'desktop',
    },
    {
        id: 'theme-picker',
        text: 'Want a different look? Click the Palette icon in the sidebar to change themes.',
        action: { type: 'commandPalette', payload: 'themes' },
        elementId: 'activity-bar-theme',
        device: 'all',
    },
    {
        id: 'terminal',
        text: 'Did you know? You can toggle the integrated terminal with Ctrl+J.',
        action: { type: 'toggleTerminal' },
        device: 'desktop',
    },
    {
        id: 'explorer-nav',
        text: 'Navigate your project files using the Explorer view in the sidebar.',
        action: { type: 'switchView', payload: 'explorer' },
        elementId: 'activity-bar-explorer',
        device: 'desktop', // "Sidebar" term
    },
    {
        id: 'explorer-nav-mobile',
        text: 'Open the menu to access your project files in the Explorer.',
        action: { type: 'switchView', payload: 'explorer' },
        device: 'mobile', // "Menu" term
    },
    {
        id: 'settings',
        text: 'Check out the interactive settings.json to customize your experience.',
        action: { type: 'commandPalette', payload: 'commands' },
        elementId: 'activity-bar-settings',
        device: 'all',
    },
    {
        id: 'source-control',
        text: 'Visit the Source Control view to see my latest specific GitHub activity.',
        action: { type: 'switchView', payload: 'source-control' },
        elementId: 'activity-bar-source-control',
        device: 'desktop',
    },
    {
        id: 'source-control-mobile',
        text: 'Tap the hamburger menu to find Search, Extensions, and Source Control.',
        action: { type: 'toggleSidebar' },
        device: 'mobile',
    },
    {
        id: 'search',
        text: 'Looking for something? Press Ctrl+Shift+F or click the Search icon to find projects instantly.',
        action: { type: 'switchView', payload: 'search' },
        elementId: 'activity-bar-search',
        device: 'desktop',
    },
    {
        id: 'extensions',
        text: 'Browse the "Extensions" (Skills) I use to build projects like this one.',
        action: { type: 'switchView', payload: 'extensions' },
        elementId: 'activity-bar-extensions',
        device: 'all',
    }
];
