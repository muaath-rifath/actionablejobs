// app/api/jobs/route.ts
import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import Papa from 'papaparse';

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

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'jobs_preprocessed_improved.csv');
    
    // Verify file exists
    await fs.access(filePath);
    
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data } = Papa.parse<Job>(fileContent, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
    });

    return NextResponse.json({ 
      jobs: data,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error("Error loading jobs data:", err);
    return NextResponse.json(
      { error: 'Failed to load jobs data' },
      { status: 500 }
    );
  }
}