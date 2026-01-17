'use client';
import ProjectReadme from '@/components/vscode/ProjectReadme';

export default function Readme() {
    return (
        <ProjectReadme
            title="TEDx DAVV Website"
            description="Official event website built for TEDx DAVV."
            overview="The TEDx DAVV website served as the primary digital touchpoint for the event, handling speaker showcases, event information, registrations, and ticketing workflows. The project focused on building a reliable and polished user experience under real world constraints such as high traffic spikes, strict deadlines, and non technical stakeholders. I owned the frontend architecture and worked closely with organizers to iterate quickly and ship a production ready platform."
            features={[
                "Speaker and agenda showcase",
                "Event registration and ticketing flow",
                "Responsive and accessible UI",
                "SEO friendly public pages",
                "Content managed structure for easy updates"
            ]}
            techStack={['React', 'Node.js', 'Tailwind CSS']}
            repoLink="https://github.com/samar12-rad/tedxdavv2"
            demoLink="https://tedxdavv2.vercel.app/"
            status="Completed"
        />
    );
}
