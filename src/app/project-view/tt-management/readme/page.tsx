'use client';
import ProjectReadme from '@/components/vscode/ProjectReadme';

export default function Readme() {
    return (
        <ProjectReadme
            title="Timetable & Attendance System"
            description="Production-grade management system for educational institutions."
            overview="A comprehensive solution for educational institutions to manage and optimize their course timetables. This system provides an intuitive interface for administrators to create, view, and manage timetables for different courses, batches, and faculty members, featuring conflict detection and resource management."
            features={[
                "Role-based Authentication (Admin/Faculty)",
                "Interactive Timetable Grid",
                "Conflict Detection & Resolution",
                "Resource Management (Rooms, Faculty)",
                "Microservices Architecture"
            ]}
            techStack={['Go (Gin)', 'React 19', 'PostgreSQL', 'Docker', 'Linux', 'Vite', 'Tailwind CSS']}
            repoLink="https://github.com/samar12-rad"
            demoLink="https://tt-ms.vercel.app/"
            status="Completed"
        />
    );
}
