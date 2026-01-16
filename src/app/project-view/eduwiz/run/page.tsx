'use client';
import ExeViewer from '@/components/vscode/ExeViewer';

export default function Run() {
    return <ExeViewer name="eduwiz.exe" command="./eduwiz --start" description="Launch the EduWiz Platform Dashboard." />;
}
