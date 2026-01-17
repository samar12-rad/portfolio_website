'use client';
import ProjectReadme from '@/components/vscode/ProjectReadme';

export default function Readme() {
    return (
        <ProjectReadme
            title="Peer Connect"
            description="Networking & Team Formation Platform for Hackathons."
            overview="Peer Connect is a web application designed to help developers, students, and professionals connect and form teams for hackathons and networking events. The platform enables users to create profiles, showcase projects, and find collaborators based on location, experience level, and project interests using a swipe-based matching system."
            features={[
                "User Profiles with Project Showcase",
                "Swipe-based Matching System",
                "Real-Time Chat via WebSockets",
                "Location-based Discovery",
                "Hackathon Event Listings"
            ]}
            techStack={['MERN Stack', 'React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Docker']}
            repoLink="https://github.com/samar12-rad/peer-connect"
            demoLink="https://peer-connect-samar-projects.vercel.app/"
            status="Completed"
        />
    );
}
