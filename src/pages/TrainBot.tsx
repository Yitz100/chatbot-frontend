import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Card, SectionTitle, Input, Select, Textarea, Button, KnowledgeItem } from '../components/UI';

interface Source {
  icon: string;
  label: string;
  sub: string;
}

interface KnowledgeEntry {
  icon: string;
  name: string;
  meta: string;
  status: 'trained' | 'pending' | 'error';
}

const SOURCES: Source[] = [
  { icon: '🌐', label: 'Website URL',  sub: 'Crawl your site' },
  { icon: '📄', label: 'Upload Files', sub: 'PDF, DOCX, TXT' },
  { icon: '✏️', label: 'Write Text',   sub: 'Paste content directly' },
  { icon: '🔗', label: 'Connect API',  sub: 'Notion, Confluence...' },
];

const KNOWLEDGE: KnowledgeEntry[] = [
  { icon: '🌐', name: 'Homepage crawl',       meta: 'acmecorp.com — 24 pages',  status: 'trained' },
  { icon: '📄', name: 'Product Handbook.pdf', meta: '2.3 MB — uploaded 3d ago', status: 'trained' },
  { icon: '📄', name: 'Pricing Guide Q1.pdf', meta: '840 KB — uploaded 5d ago', status: 'trained' },
  { icon: '✏️', name: 'Custom FAQ',           meta: '142 manual entries',        status: 'trained' },
  { icon: '📋', name: 'Support Logs Export',  meta: '500 ticket examples',       status: 'pending' },
  { icon: '🔗', name: 'Notion Workspace',     meta: 'Syncing...',                status: 'pending' },
];

export default function TrainBot() {
  const [activeSource, setActiveSource] = useState(0);
  const [url, setUrl] = useState('https://acmecorp.com');
  const [instructions, setInstructions] = useState(
    'Always be helpful and professional. Focus on our product features and pricing. For refund requests, collect the order number first.'
  );
  const [trained, setTrained] = useState(false);
  const [orgData, setOrgData] = useState<Record<string, unknown> | null>(null);
  const [orgDataLoading, setOrgDataLoading] = useState(true);
  const [orgDataError, setOrgDataError] = useState<string | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    async function fetchOrgData() {
      try {
        const token = await getToken();
        const res = await fetch('https://chatbot-gen-server-fe894938f490.herokuapp.com/api/org-data', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(await res.text());
        const json = await res.json();
        setOrgData(json.data ?? json);
      } catch (err: unknown) {
        setOrgDataError(err instanceof Error ? err.message : 'Failed to load');
      } finally {
        setOrgDataLoading(false);
      }
    }
    fetchOrgData();
  }, [getToken]);

  const handleTrain = () => {
    setTrained(true);
    setTimeout(() => setTrained(false), 3000);
  };

  return (
    <div className="grid grid-cols-2 gap-7 fade-up max-[900px]:grid-cols-1">
      {/* Left: input panel */}
      <div>
        <SectionTitle>Add Knowledge Sources</SectionTitle>

        <div className="grid grid-cols-2 gap-2.5 mb-5">
          {SOURCES.map((s, i) => (
            <div
              key={i}
              className={`bg-gray-700 border rounded-sm p-3.5 cursor-pointer transition-colors flex items-center gap-3 ${
                activeSource === i
                  ? 'border-purple-500 bg-purple-500/15'
                  : 'border-white/[0.07] hover:border-purple-500'
              }`}
              onClick={() => setActiveSource(i)}
            >
              <div className="w-9 h-9 rounded-sm bg-white/[0.08] flex items-center justify-center text-lg shrink-0">{s.icon}</div>
              <div>
                <div className="text-[13px] font-medium">{s.label}</div>
                <div className="text-[11px] text-gray-400">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {activeSource === 0 && (
          <>
            <Input label="Website URL" value={url} onChange={e => setUrl(e.target.value)} />
            <Select label="Crawl Depth">
              <option>All pages (recommended)</option>
              <option>Homepage only</option>
              <option>Custom pages</option>
            </Select>
          </>
        )}

        {activeSource === 1 && (
          <div className="border-[1.5px] border-dashed border-white/15 rounded px-8 py-8 text-center cursor-pointer transition-all mb-4 hover:border-purple-400 hover:bg-purple-500/5">
            <div className="text-3xl mb-2">☁️</div>
            <div className="text-sm text-gray-300 mb-1">Drop files here or click to upload</div>
            <div className="text-xs text-gray-500">PDF, DOCX, TXT, CSV — up to 50MB each</div>
          </div>
        )}

        {activeSource === 2 && (
          <Textarea label="Paste content" rows={6} placeholder="Paste your knowledge here..." />
        )}

        {activeSource === 3 && (
          <Input label="API Endpoint or Notion URL" placeholder="https://api.notion.com/..." />
        )}

        <Textarea
          label="Custom Instructions"
          rows={4}
          value={instructions}
          onChange={e => setInstructions(e.target.value)}
        />

        <div className="flex gap-2.5 mt-4">
          <Button variant="primary" onClick={handleTrain} fullWidth>
            {trained ? '✓ Training Started!' : '⚡ Start Training'}
          </Button>
          <Button variant="ghost">Preview</Button>
        </div>
      </div>

      {/* Right: org data + knowledge base */}
      <div>
        <SectionTitle>Organization Data</SectionTitle>
        <Card>
          {orgDataLoading && (
            <div className="text-[13px] text-gray-500 py-2">Loading...</div>
          )}
          {orgDataError && (
            <div className="text-[13px] text-red-400 py-2">{orgDataError}</div>
          )}
          {orgData && !orgDataLoading && (
            <div className="flex flex-col gap-2">
              {Object.entries(orgData).map(([key, value]) => (
                <div key={key} className="flex gap-3 text-[13px]">
                  <span className="text-gray-500 capitalize shrink-0 w-32 truncate">
                    {key.replace(/_/g, ' ')}
                  </span>
                  <span className="text-gray-200 flex-1 break-all">
                    {typeof value === 'object' ? JSON.stringify(value) : String(value ?? '—')}
                  </span>
                </div>
              ))}
            </div>
          )}
          {!orgDataLoading && !orgDataError && !orgData && (
            <div className="text-[13px] text-gray-500 py-2">No organization data found.</div>
          )}
        </Card>

        <SectionTitle style={{ marginTop: '1.5rem' }}>Knowledge Base</SectionTitle>
        <div className="flex flex-col gap-2">
          {KNOWLEDGE.map(k => <KnowledgeItem key={k.name} {...k} />)}
        </div>
      </div>
    </div>
  );
}
