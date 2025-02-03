// app/api/suggestions/route.ts
import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import FlexSearch from 'flexsearch';

interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    description: string;
    job_url: string;
    source: string;
    date_posted: string;
    date_scraped: string;
    external_id: string;
    extracted_salary: string;
    skills: string;
    job_type: string;
}

const index = new FlexSearch.Document({
    document: {
        id: "id",
        index: ["title", "company", "location", "description", "skills", "job_type"],
        store: ["title"] // Store specific fields instead of boolean
    },
    tokenize: "forward",
    cache: true
});

let isIndexInitialized = false;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';

    try {
        if (!isIndexInitialized) {
            const filePath = path.join(process.cwd(), 'public', 'output.json');
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const data: Job[] = JSON.parse(fileContent);
            data.forEach(job => index.add(job));
            isIndexInitialized = true;
        }

        const results = await index.searchAsync(query, {
            limit: 5,
            enrich: true
        });

        const suggestions = results
            .flatMap(result => 
                (result as unknown as FlexSearch.EnrichedDocumentSearchResultSetUnit<Job>).result
                    .flatMap(item => item.doc?.title || [])
            )
            .filter((title, index, self) => 
                title && self.indexOf(title) === index
            )
            .slice(0, 5);

        return NextResponse.json({ suggestions });
    } catch (error) {
        console.error("Error loading suggestions data:", error);
        return NextResponse.json(
            { error: 'Failed to get suggestions' },
            { status: 500 }
        );
    }
}
