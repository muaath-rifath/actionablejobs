// app/api/search/route.ts
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

// Create index once and reuse
const index = new FlexSearch.Document({
    document: {
        id: "id",
        index: ["title", "company", "location", "job_type"],
        store: true
    },
    tokenize: "forward",
    context: true,
    cache: true,
    worker: false // explicitly set worker: false for server-side compatibility
});

let isIndexInitialized = false;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '6', 10);

    console.log(`Search API called with query: "${query}", page: ${page}, pageSize: ${pageSize}`); // Log parameters

    try {
        if (!isIndexInitialized) {
            const filePath = path.join(process.cwd(), 'public', 'output.json');
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const data: Job[] = JSON.parse(fileContent);
            data.forEach(job => index.add(job));
            isIndexInitialized = true;
            console.log("Search index initialized."); // Log index initialization
        }

        let filteredJobs = [];

        if (query) {
            console.log(`Searching for query: "${query}"`); // Log before search
            const searchResults = await index.searchAsync(query, {
                limit: 1000,
                suggest: true
            });
            console.log("Search Results:", searchResults); // Log search results

            const jobIds = new Set();
            searchResults.forEach(result => {
                result.result.forEach(id => jobIds.add(id));
            });

            const filePath = path.join(process.cwd(), 'public', 'output.json');
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const data: Job[] = JSON.parse(fileContent);

            filteredJobs = Array.from(jobIds).map(id =>
                data.find(job => job.id === id)
            ).filter(Boolean) as Job[];

            console.log(`Filtered Jobs count after search: ${filteredJobs.length}`); // Log filtered jobs count
        } else {
            const filePath = path.join(process.cwd(), 'public', 'output.json');
            const fileContent = await fs.readFile(filePath, 'utf-8');
            filteredJobs = JSON.parse(fileContent);
            console.log(`No query, loading all jobs. Total jobs: ${filteredJobs.length}`); // Log all jobs count
        }

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedJobs = filteredJobs.slice(startIndex, endIndex);
        console.log(`Paginated Jobs (page ${page}, pageSize ${pageSize}): ${paginatedJobs.length} jobs`); // Log paginated jobs

        return NextResponse.json({
            jobs: paginatedJobs,
            total: filteredJobs.length, // Total count is here!
            timestamp: new Date().toISOString(),
            page,
            pageSize
        });
    } catch (error) {
        console.error("Error during job search:", error);
        return NextResponse.json(
            {
                message: 'Job search operation failed.',
                error: error instanceof Error ? error.message : 'Search failed' },
            { status: 500 }
        );
    }
}