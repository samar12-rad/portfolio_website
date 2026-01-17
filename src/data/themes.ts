export type ThemeId =
    | 'vscode-dark'
    | 'vscode-light'
    | 'github-dark'
    | 'github-light'
    | 'dracula'
    | 'hacker'
    | 'monokai'
    | 'solarized-dark'
    | 'solarized-light'
    | 'nord'
    | 'onedark-pro'
    | 'night-owl'
    | 'shades-of-purple'
    | 'cobalt2'
    | 'synthwave-84'
    | 'tokyo-night'
    | 'ayu-dark'
    | 'ayu-light'
    | 'cyberpunk'
    | 'high-contrast';

export interface ThemeOption {
    id: ThemeId;
    label: string;
    type: 'dark' | 'light';
}

export const themes: ThemeOption[] = [
    { id: 'vscode-dark', label: 'Dark+ (Default Dark)', type: 'dark' },
    { id: 'vscode-light', label: 'Light+ (Default Light)', type: 'light' },
    { id: 'github-dark', label: 'GitHub Dark', type: 'dark' },
    { id: 'github-light', label: 'GitHub Light', type: 'light' },
    { id: 'dracula', label: 'Dracula', type: 'dark' },
    { id: 'hacker', label: 'Hacker Mode', type: 'dark' },
    { id: 'monokai', label: 'Monokai', type: 'dark' },
    { id: 'solarized-dark', label: 'Solarized Dark', type: 'dark' },
    { id: 'solarized-light', label: 'Solarized Light', type: 'light' },
    { id: 'nord', label: 'Nord', type: 'dark' },
    { id: 'onedark-pro', label: 'One Dark Pro', type: 'dark' },
    { id: 'night-owl', label: 'Night Owl', type: 'dark' },
    { id: 'shades-of-purple', label: 'Shades of Purple', type: 'dark' },
    { id: 'cobalt2', label: 'Cobalt2', type: 'dark' },
    { id: 'synthwave-84', label: 'SynthWave \'84', type: 'dark' },
    { id: 'tokyo-night', label: 'Tokyo Night', type: 'dark' },
    { id: 'ayu-dark', label: 'Ayu Dark', type: 'dark' },
    { id: 'ayu-light', label: 'Ayu Light', type: 'light' },
    { id: 'cyberpunk', label: 'Cyberpunk (2077)', type: 'dark' },
    { id: 'high-contrast', label: 'High Contrast', type: 'dark' },
];

export interface FontOption {
    id: string;
    label: string;
    variable: string;
}

export const fonts: FontOption[] = [
    { id: 'inter', label: 'Inter (UI Default)', variable: 'var(--font-geist-sans)' },
    { id: 'fira-code', label: 'Fira Code', variable: 'var(--font-fira-code)' },
    { id: 'jetbrains-mono', label: 'JetBrains Mono', variable: 'var(--font-jetbrains-mono)' },
    { id: 'roboto-mono', label: 'Roboto Mono', variable: 'var(--font-roboto-mono)' },
    { id: 'source-code-pro', label: 'Source Code Pro', variable: 'var(--font-source-code-pro)' },
];
