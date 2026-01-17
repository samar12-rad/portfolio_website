export interface Suggestion {
    id: string;
    text: string;
    actionLabel?: string;
    action: {
        type: 'commandPalette' | 'toggleSidebar' | 'toggleTerminal' | 'switchView' | 'none';
        payload?: string;
    };
    elementId?: string;
}

export const suggestions: Suggestion[] = [
    {
        id: 'cmd-palette',
        text: 'Tip: Press Ctrl+Shift+P to open the Command Palette for quick access to all features.',
        action: { type: 'commandPalette', payload: 'commands' },
        // No element ID for command palette as requested
    },
    {
        id: 'theme-picker',
        text: 'Want a different look? Click the Palette icon in the sidebar to change themes.',
        action: { type: 'commandPalette', payload: 'themes' },
        elementId: 'activity-bar-theme',
    },
    {
        id: 'terminal',
        text: 'Did you know? You can toggle the integrated terminal with Ctrl+J.',
        action: { type: 'toggleTerminal' },
    },
    {
        id: 'explorer-nav',
        text: 'Navigate your project files using the Explorer view in the sidebar.',
        action: { type: 'switchView', payload: 'explorer' },
        elementId: 'activity-bar-explorer',
    },
    {
        id: 'settings',
        text: 'Check out the interactive settings.json to customize your experience.',
        action: { type: 'commandPalette', payload: 'commands' }, // Or specific settings action if available
        elementId: 'activity-bar-settings',
    },
    {
        id: 'source-control',
        text: 'Visit the Source Control view to see my latest specific GitHub activity.',
        action: { type: 'switchView', payload: 'source-control' },
        elementId: 'activity-bar-source-control',
    },
    {
        id: 'search',
        text: 'Looking for something? Press Ctrl+Shift+F or click the Search icon to find projects instantly.',
        action: { type: 'switchView', payload: 'search' }, // We'll need to ensure SuggestionManager handles this or 'search' view exists
        elementId: 'activity-bar-search',
    },
    {
        id: 'extensions',
        text: 'Browse the "Extensions" (Skills) I use to build projects like this one.',
        action: { type: 'switchView', payload: 'extensions' }, // We'll need to ensure 'extensions' view handles this
        elementId: 'activity-bar-extensions',
    }
];
