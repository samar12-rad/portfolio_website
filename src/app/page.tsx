import InteractiveReadme from '@/components/vscode/InteractiveReadme';

export default function Home() {
  return (
    <div className="h-full w-full overflow-y-auto bg-[var(--vscode-bg)]">
      <InteractiveReadme />
    </div>
  );
}
