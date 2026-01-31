import {
  Briefcase,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles
} from 'lucide-react'
import { RESUME_DATA } from './data'

export function ResumePaper() {
  const {
    profile,
    summary,
    experience,
    education,
    internships,
    technicalSkills,
    recentProjects
  } = RESUME_DATA

  return (
    <>
      <style>{`
        @media print {
          @page {
            margin: 0;
            margin-top: 3rem;
          }
          .resume-container {
            padding-top: 0;
          }
        }
      `}</style>
      <div className='resume-container mx-auto my-6 min-h-[297mm] w-full max-w-[210mm] bg-white p-8 font-serif text-black text-sm leading-relaxed shadow-sm md:p-12 print:m-0 print:w-full print:max-w-none print:px-8 print:pt-0 print:pb-8 print:shadow-none md:print:px-12 md:print:pb-12'>
        {/* Header */}
        <header className='mb-6 text-center'>
          <h1 className='mb-2 font-bold text-4xl'>{profile.name}</h1>
          <div className='mb-1 flex flex-wrap items-center justify-center gap-3 text-sm'>
            <div className='flex items-center gap-1'>
              <Mail className='h-3 w-3 shrink-0' />
              <a className='hover:underline' href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </div>
            <div className='flex items-center gap-1'>
              <Phone className='h-3 w-3 shrink-0' />
              <span className='font-sans'>{profile.phone}</span>
            </div>
            <div className='flex items-center gap-1'>
              <Sparkles className='h-3 w-3 shrink-0' />
              <span className='font-bold'>{profile.role}</span>
            </div>
            <div className='flex items-center gap-1'>
              <Briefcase className='h-3 w-3 shrink-0' />
              <span className='inline-flex items-center gap-0.5'>
                <span className='font-sans'>{profile.yearsOfExperience}</span>
                <span>YOE</span>
              </span>
            </div>
            <div className='flex items-center gap-1'>
              <MapPin className='h-3 w-3 shrink-0' />
              <span>
                {profile.location.city}, {profile.location.state}
              </span>
            </div>
          </div>
          <div className='flex flex-wrap items-center justify-center gap-3 text-sm'>
            {profile.links.map((link) => (
              <div className='flex items-center gap-1' key={link.url}>
                {link.icon === 'github' && (
                  <Github className='h-3 w-3 shrink-0' />
                )}
                {link.icon === 'linkedin' && (
                  <Linkedin className='h-3 w-3 shrink-0' />
                )}
                {link.icon === 'website' && (
                  <Globe className='h-3 w-3 shrink-0' />
                )}
                <a
                  className='hover:underline'
                  href={link.url}
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  {link.label}
                </a>
              </div>
            ))}
          </div>
        </header>

        {/* Summary */}
        {summary && (
          <section className='mb-2'>
            <h2 className='mb-1 border-black border-b font-bold text-base uppercase print:break-after-avoid'>
              Summary
            </h2>
            <p className='text-sm'>{summary}</p>
          </section>
        )}

        {/* Work Experience */}
        <section className='mb-2'>
          <h2 className='mb-1 border-black border-b font-bold text-base uppercase print:break-after-avoid'>
            Experience
          </h2>
          <div className='space-y-1'>
            {experience.map((job) => (
              <div
                className='print:break-inside-avoid'
                key={job.company + job.startDate}
              >
                <div className='flex items-baseline justify-between'>
                  <h3 className='font-bold'>{job.company}</h3>
                  <span className='italic'>
                    {job.startDate} - {job.endDate}
                  </span>
                </div>
                <div className='flex items-baseline justify-between'>
                  <p className='font-bold'>{job.title}</p>
                  <span className='italic'>{job.location}</span>
                </div>
                <ul className='ml-4 list-outside list-disc space-y-0.5 text-sm print:break-inside-avoid'>
                  {job.description.map((desc) => (
                    <li
                      className='print:break-inside-avoid'
                      key={desc.slice(0, 50)}
                    >
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Projects */}
        <section className='mb-2 print:break-inside-avoid'>
          <h2 className='mb-2 border-black border-b font-bold text-base uppercase print:break-after-avoid'>
            Projects
          </h2>
          <div className='space-y-3'>
            {recentProjects.map((project) => (
              <div className='print:break-inside-avoid' key={project.title}>
                <div className='mb-0.5 flex items-baseline justify-between'>
                  <h3 className='font-bold'>
                    {project.title}
                    {project.subtitle && (
                      <span className='font-normal'>, {project.subtitle}</span>
                    )}
                  </h3>
                  <span className='text-sm italic'>
                    {project.startDate ? `${project.startDate} - ` : ''}
                    {project.endDate}
                  </span>
                </div>
                <ul className='ml-4 list-outside list-disc space-y-0.5 text-sm print:break-inside-avoid'>
                  {project.description.map((desc) => (
                    <li
                      className='print:break-inside-avoid'
                      key={desc.slice(0, 50)}
                    >
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className='mb-2 print:break-inside-avoid'>
          <h2 className='mb-2 border-black border-b font-bold text-base uppercase print:break-after-avoid'>
            Education
          </h2>
          <div>
            {education.map((edu) => (
              <div className='print:break-inside-avoid' key={edu.school}>
                <div className='flex items-baseline justify-between'>
                  <h3>
                    <span className='font-bold'>{edu.school}</span>
                  </h3>
                  <span className='italic'>
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <div className='mb-1 flex items-baseline justify-between'>
                  <p className='font-bold'>{edu.degree}</p>
                  <span className='italic'>{edu.location}</span>
                </div>
                {edu.details.length > 0 && (
                  <ul className='ml-4 list-outside list-disc space-y-0.5 text-sm print:break-inside-avoid'>
                    {edu.details.map((detail) => (
                      <li
                        className='print:break-inside-avoid'
                        key={detail.slice(0, 50)}
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Internships */}
        {internships && internships.length > 0 && (
          <section className='mb-2 print:break-inside-avoid'>
            <h2 className='mb-2 border-black border-b font-bold text-base uppercase print:break-after-avoid'>
              Internships
            </h2>
            <ul className='list-none space-y-0.5 text-sm'>
              {internships.map((internship) => (
                <li key={internship.company + internship.period}>
                  <div className='flex items-baseline justify-between'>
                    <span>
                      <span className='font-bold'>{internship.company}</span>,{' '}
                      {internship.team}
                    </span>
                    <span className='italic'>{internship.period}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Technical Skills */}
        <section className='mb-2 print:break-inside-avoid'>
          <h2 className='mb-2 border-black border-b font-bold text-base uppercase print:break-after-avoid'>
            Technical Skills
          </h2>
          <div className='text-sm'>
            {technicalSkills.map((line) => (
              <p key={line.slice(0, 50)}>{line}</p>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
