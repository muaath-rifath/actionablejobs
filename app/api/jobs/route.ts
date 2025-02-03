import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

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

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '6', 10);

    try {
        const filePath = path.join(process.cwd(), 'public', 'output.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const data: Job[] = JSON.parse(fileContent);

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedJobs = data.slice(startIndex, endIndex);

        return NextResponse.json({ jobs: paginatedJobs });
    } catch (error) { // Corrected: Implicitly typed error
        console.error('Error fetching jobs:', error);
        return NextResponse.json(
            { 
                error: error instanceof Error ? error.message : 'Failed to fetch jobs' // Type-safe error message
            },
            { status: 500 }
        );
    }
}