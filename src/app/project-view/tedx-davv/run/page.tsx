'use client';
import ProjectRunner from '@/components/vscode/ProjectRunner';

export default function Run() {
    return (
        <ProjectRunner
            title="TEDx DAVV Website"
            startCommand="npm run dev"
            successMessage="Ready on http://localhost:3000"
            previewUrl="https://github.com/samar12-rad/tedxdavv2"
        />
    );
}
