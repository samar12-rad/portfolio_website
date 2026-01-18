import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
        if (!webhookUrl) {
            // Silently fail if no webhook is configured to avoid errors in logs/frontend
            return NextResponse.json({ message: 'No webhook configured' }, { status: 200 });
        }

        const { userAgent, language, screenSize, referrer } = await req.json();

        // Get cloud provider headers (Vercel)
        const ip = req.headers.get('x-forwarded-for') || 'Unknown IP';
        const city = req.headers.get('x-vercel-ip-city') || 'Unknown City';
        const country = req.headers.get('x-vercel-ip-country') || 'Unknown Country';
        const countryRegion = req.headers.get('x-vercel-ip-country-region');

        // Construct simplified location string
        const location = countryRegion
            ? `${city}, ${countryRegion}, ${country}`
            : `${city}, ${country}`;

        const payload = {
            username: "Portfolio Watchdog",
            avatar_url: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
            embeds: [
                {
                    title: "🚨 New Visitor Detected",
                    color: 5814783, // Bluish color
                    fields: [
                        { name: "📍 Location", value: location, inline: true },
                        { name: "🌐 IP Address", value: ip, inline: true },
                        { name: "🖥️ Device", value: userAgent || 'Unknown', inline: false },
                        { name: "📏 Screen", value: screenSize || 'Unknown', inline: true },
                        { name: "🗣️ Language", value: language || 'Unknown', inline: true },
                        { name: "🔗 Referrer", value: referrer || 'Direct', inline: true },
                    ],
                    timestamp: new Date().toISOString()
                }
            ]
        };

        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Notification error:', error);
        // Return success anyway to keep client ignorant of failure
        return NextResponse.json({ success: true });
    }
}
