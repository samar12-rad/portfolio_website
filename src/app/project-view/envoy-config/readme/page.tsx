'use client';
import ProjectReadme from '@/components/vscode/ProjectReadme';

export default function Readme() {
    return (
        <ProjectReadme
            title="Envoy Config"
            description="Rust-based Feature Flag & Configuration Service."
            overview="Envoy Config is a small Rust backend service that models how feature flags and runtime configuration are managed across different environments (dev, staging, prod) in real-world systems. It focuses on backend design, clean domain logic, and correctness, with HTTP treated as a thin adapter layer."
            features={[
                "Environment-scoped Config Management",
                "Clean Architecture Separation",
                "Domain-Driven Design in Rust",
                "In-memory Repository (Extendable)"
            ]}
            techStack={['Rust', 'Axum', 'Domain Driven Design']}
            repoLink="https://github.com/samar12-rad"
        />
    );
}
