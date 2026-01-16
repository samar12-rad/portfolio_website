'use client';
import ExeViewer from '@/components/vscode/ExeViewer';

export default function Run() {
    return <ExeViewer name="peer-connect.exe" command="npm start --prefix peer-connect" description="Start the Peer Connect matchmaking platform server and client." />;
}
