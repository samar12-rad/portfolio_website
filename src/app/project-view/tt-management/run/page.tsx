'use client';
import ExeViewer from '@/components/vscode/ExeViewer';

export default function Run() {
    return <ExeViewer name="tt-utils.exe" command="go run main.go" description="Initialize the TimeTable Management Backend Service." />;
}
