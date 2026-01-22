'use client';

import { useEffect, useRef } from 'react';

export default function VisitorTracker() {
    const notified = useRef(false);

    useEffect(() => {
        // Prevent double firing in React StrictMode
        if (notified.current) return;

        // Check session storage to only notify once per session
        const hasVisited = sessionStorage.getItem('portfolio_visit_notified');
        if (hasVisited) return;

        const notify = async () => {
            try {
                // Mark as notified immediately to prevent race conditions
                notified.current = true;
                sessionStorage.setItem('portfolio_visit_notified', 'true');

                await fetch('/api/visit-notify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userAgent: navigator.userAgent,
                        language: navigator.language,
                        screenSize: `${window.screen.width}x${window.screen.height}`,
                        referrer: document.referrer
                    })
                });
            } catch (e) {
                // Silently fail
            }
        };

        notify();
    }, []);

    return null; // Render nothing
}
