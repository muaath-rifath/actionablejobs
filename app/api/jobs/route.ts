// app/api/jobs/route.ts
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

        // Read and parse the JSON file
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const data: Job[] = JSON.parse(fileContent);

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedJobs = data.slice(startIndex, endIndex);

        return NextResponse.json({
            jobs: paginatedJobs,
            total: data.length,
            timestamp: new Date().toISOString(),
            page,
            pageSize
        });
    } catch (error) {
        console.error("Error loading jobs data:", error);
        return NextResponse.json(
            { error: 'Failed to load jobs data' },
            { status: 500 }
        );
    }
}