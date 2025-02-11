// app/api/jobs/route.ts
import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { Job } from '@/types/job';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '6', 10);

    try {
        const filePath = path.join(process.cwd(), 'public', 'raw_jobs_20250209_230700.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const data: Job[] = JSON.parse(fileContent);

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedJobs = data.slice(startIndex, endIndex);

        return NextResponse.json({
            jobs: paginatedJobs,
            total: data.length
        });
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return NextResponse.json(
            {
                message: 'Failed to fetch job listings.',
                error: error instanceof Error ? error.message : 'Failed to fetch jobs'
            },
            { status: 500 }
        );
    }
}
