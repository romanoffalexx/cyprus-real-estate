import type { ReactNode } from 'react';
import type { LegalDocument } from '../../lib/legal';

interface LegalPageProps {
  document: LegalDocument;
  children?: ReactNode;
}

export default function LegalPage({ document, children }: LegalPageProps) {
  return (
    <div className="py-12 bg-cyprus-sand min-h-screen">
      <div className="container mx-auto px-4">
        <article className="bg-white rounded-xl p-6 sm:p-8 shadow-card max-w-4xl">
          <header className="mb-8 pb-6 border-b border-gray-100">
            <h1 className="text-3xl sm:text-4xl font-bold text-cyprus-navy text-balance">
              {document.title}
            </h1>
            <p className="mt-3 text-sm text-gray-500">
              {document.updated}
            </p>
          </header>
          <p className="text-gray-700 mb-8">{document.intro}</p>
          <div className="space-y-8">
            {document.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl sm:text-2xl font-bold text-cyprus-navy mb-3">
                  {section.title}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="text-gray-700 mb-3 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 leading-relaxed">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
          {children}
        </article>
      </div>
    </div>
  );
}
