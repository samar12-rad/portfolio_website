'use client';
import ExeViewer from '@/components/vscode/ExeViewer';

export default function Run() {
    return <ExeViewer name="perfolyze.exe" command="./perfolyze --start" description="Launch the Perfolyze Performance Monitoring Dashboard." />;
}
