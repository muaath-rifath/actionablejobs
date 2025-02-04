import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

interface Job {
    title: string;
    company: string;
    location: string;
    skills?: string;
}

const index = new Map<string, Set<string>>();
let isIndexInitialized = false;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query')?.toLowerCase() || '';

    if (!query || query.length < 2) {
        return NextResponse.json({ suggestions: [] });
    }

    try {
        if (!isIndexInitialized) {
            const filePath = path.join(process.cwd(), 'public', 'output.json');
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const data = JSON.parse(fileContent) as Job[];
            
            // Build suggestion index
            data.forEach((job: Job) => {
                const words = [
                    job.title,
                    job.company,
                    job.location,
                    ...(job.skills || '').split(',')
                ].filter(Boolean);

                words.forEach(word => {
                    const key = word.toLowerCase().trim();
                    if (!index.has(key)) {
                        index.set(key, new Set());
                    }
                    index.get(key)?.add(word.trim());
                });
            });
            isIndexInitialized = true;
        }

        const suggestions = Array.from(index.keys())
            .filter(key => key.includes(query))
            .flatMap(key => Array.from(index.get(key) || []))
            .slice(0, 5);

        return NextResponse.json({ suggestions });
    } catch (error) {
        console.error("Error fetching search suggestions:", error);
        return NextResponse.json({ suggestions: [] }, { status: 500 });
    }
}
