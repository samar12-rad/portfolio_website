import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
        if (!webhookUrl) return NextResponse.json({ message: 'No webhook configured' }, { status: 200 });

        const { userAgent, language, screenSize, referrer } = await req.json();

        // 1. Get Visitor IP (Handle Vercel headers or localhost)
        let ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'Unknown';

        // 2. Fetch Geo Data from ip-api.com (HTTP is fine for server-side requests)
        // If localhost (::1), query API without IP to get the server's public IP (useful for local testing)
        // If production, query with the visitor's IP
        const isLocal = ip === '::1' || ip === '127.0.0.1' || ip === 'Unknown';
        const geoApiUrl = isLocal
            ? 'http://ip-api.com/json/?fields=status,message,country,countryCode,regionName,city,zip,lat,lon,isp,org,as,query'
            : `http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,regionName,city,zip,lat,lon,isp,org,as,query`;

        const geoRes = await fetch(geoApiUrl);
        const geoData = await geoRes.json();

        // 3. Construct Maps Link
        const mapLink = geoData.lat && geoData.lon
            ? `[View on Map](https://www.google.com/maps?q=${geoData.lat},${geoData.lon})`
            : 'N/A';

        // 4. Build Discord Payload
        const payload = {
            username: "Portfolio Watchdog",
            avatar_url: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
            embeds: [
                {
                    title: "🚨 New Visitor Detected",
                    color: 5814783, // Bluish color
                    fields: [
                        { name: "📍 Location", value: `${geoData.city}, ${geoData.regionName}, ${geoData.country}`, inline: true },
                        { name: "🏢 ISP", value: geoData.isp || 'Unknown', inline: true },
                        { name: "🌐 IP Address", value: geoData.query || ip, inline: true },
                        { name: "🗺️ Map", value: mapLink, inline: true },
                        { name: "🖥️ Device", value: userAgent || 'Unknown', inline: false },
                        { name: "🔗 Referrer", value: referrer || 'Direct', inline: true },
                    ],
                    footer: { text: `Screen: ${screenSize} • Lang: ${language}` },
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
        return NextResponse.json({ success: true });
    }
}
