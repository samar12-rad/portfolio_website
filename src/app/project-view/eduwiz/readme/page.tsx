'use client';
import ProjectReadme from '@/components/vscode/ProjectReadme';

export default function Readme() {
    return (
        <ProjectReadme
            title="EduWiz"
            description="Education Platform for Students in Rural Areas."
            overview="EduWiz is an educational platform designed to bridge the gap for students in rural areas. Access quality education, manage classes, and track student progress with an intuitive portal. The system uses secure REST APIs and a robust MongoDB backend to ensure reliability and scalability."
            features={[
                "Secure REST APIs",
                "Educator Portal for Class Management",
                "Student Progress Tracking",
                "Intuitive React Interface",
                "Scalable MongoDB Database"
            ]}
            techStack={['Node.js', 'Express.js', 'MongoDB', 'React.js', 'REST API']}
            repoLink="https://github.com/samar12-rad"
            status="Completed"
        />
    );
}
