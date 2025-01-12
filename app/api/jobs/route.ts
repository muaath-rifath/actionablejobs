import { NextResponse } from 'next/server';
import { parse } from 'node-html-parser';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const experienceLevel = searchParams.get('experienceLevel') || '';
  const workType = searchParams.get('workType') || '';

  try {
    const response = await fetch(
      `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${query}&location=bangalore&f_TPR=r86400&f_E=2&f_WT=2&start=0`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9',
        },
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const root = parse(html);
    
    // Parse the HTML to extract job data
    const jobs = root.querySelectorAll('.job-card-container').map(card => ({
      id: card.getAttribute('data-job-id'),
      title: card.querySelector('.job-title')?.text?.trim(),
      company: card.querySelector('.company-name')?.text?.trim(),
      location: card.querySelector('.job-location')?.text?.trim(),
      experienceLevel: card.querySelector('.experience-level')?.text?.trim(),
      workType: card.querySelector('.work-type')?.text?.trim(),
    }));

    // Apply filters
    const filteredJobs = jobs.filter(job => {
      const matchesExperience = !experienceLevel || job.experienceLevel === experienceLevel;
      const matchesWorkType = !workType || job.workType === workType;
      return matchesExperience && matchesWorkType;
    });

    return NextResponse.json(filteredJobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}
