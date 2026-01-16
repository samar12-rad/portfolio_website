'use client';
import ExeViewer from '@/components/vscode/ExeViewer';

export default function Run() {
    return <ExeViewer name="envoy.exe" command="cargo run --release" description="Boot up the Envoy Configuration Rust Service." />;
}
