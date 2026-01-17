'use client';
import ProjectReadme from '@/components/vscode/ProjectReadme';

export default function Readme() {
    return (
        <ProjectReadme
            title="Perfolyze"
            description="Production-focused React Performance Observability platform."
            overview="Perfolyze is a runtime observability tool for React applications that helps teams identify which components cause real-user performance regressions in production, using actual runtime data, not static analysis or local profiling. It focuses on a simpler and more practical question: What actually got slower for real users after a deploy?"
            features={[
                "Runtime Observability based on real user sessions",
                "Insight-First dashboard surfacing actionable metrics",
                "Lightweight SDK with minimal overhead",
                "Privacy-focused: No PII or source code captured"
            ]}
            techStack={['React', 'TypeScript', 'Go', 'PostgreSQL', 'Next.js', 'Tailwind CSS']}
            demoLink="#"
            repoLink="https://github.com/samar12-rad"
            status="Active"
        />
    );
}
