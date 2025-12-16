import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json({ coins: [] });
    }

    try {
        const response = await fetch(
            `https://api.coingecko.com/api/v3/search?query=${query}`,
            {
                headers: {
                    'Accept': 'application/json',
                },
                next: { revalidate: 60 } // Cache results for 60 seconds
            }
        );

        if (!response.ok) {
            throw new Error(`CoinGecko API error: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error searching coins:', error);
        return NextResponse.json(
            { error: 'Failed to search coins' },
            { status: 500 }
        );
    }
}
