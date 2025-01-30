// app/api/jobs/route.ts
import { NextResponse } from 'next/server';
import { parse } from 'node-html-parser';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const experienceLevel = searchParams.get('experienceLevel') || '';
  const workType = searchParams.get('workType') || '';
  const location = searchParams.get('location') || '';

  try {
      const url = `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${query}&location=${location}&f_TPR=r86400&f_E=2&f_WT=2&start=0`;
      const response = await fetch(
        url,
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


    const jobs = root.querySelectorAll('li').map(li => {
      try {
        const card = li.querySelector('.job-search-card')
          return card ? {
            id: card.getAttribute('data-entity-urn')?.split(':').pop() || '',
              title: card.querySelector('.base-search-card__title')?.text?.trim() || 'No Title',
              company: card.querySelector('.base-search-card__subtitle')?.text?.trim() || 'No Company',
              location: card.querySelector('.job-search-card__location')?.text?.trim() || 'No Location',
              experienceLevel: 'No Experience',
              workType: 'No Work Type'
          } : null;
        } catch (e) {
              console.error("Error parsing job card: ", li, e);
              return null;
        }
    }).filter(job => job !== null)
     
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