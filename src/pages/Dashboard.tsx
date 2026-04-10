import { MetricCard, Card, SectionTitle, KnowledgeItem } from '../components/UI';

interface Metric {
  label: string;
  value: string;
  change: string;
  changeUp: boolean;
  color: string;
}

interface Conversation {
  initials: string;
  name: string;
  msg: string;
  time: string;
}

interface KnowledgeEntry {
  icon: string;
  name: string;
  meta: string;
  status: 'trained' | 'pending' | 'error';
}

const METRICS: Metric[] = [
  { label: 'Total Conversations', value: '2,847', change: '↑ 18% this week',  changeUp: true,  color: 'var(--purple-300)' },
  { label: 'Resolved by AI',      value: '84%',   change: '↑ 3% vs last week', changeUp: true,  color: 'var(--blue-400)' },
  { label: 'Avg Response Time',   value: '1.2s',  change: '↑ 0.3s faster',     changeUp: true,  color: '#4ade80' },
  { label: 'Escalated',           value: '16%',   change: '↑ needs training',   changeUp: false, color: '#f87171' },
];

const CONVERSATIONS: Conversation[] = [
  { initials: 'JL', name: 'James L.',  msg: 'What are your pricing plans?',     time: '2m' },
  { initials: 'SA', name: 'Sara A.',   msg: 'Can I cancel my subscription?',    time: '8m' },
  { initials: 'MK', name: 'Mark K.',   msg: 'How do I export my data?',         time: '14m' },
  { initials: 'PR', name: 'Priya R.',  msg: 'Is there a free trial available?', time: '1h' },
];

const BAR_DATA: number[]   = [55, 70, 45, 85, 62, 90, 78];
const BAR_LABELS: string[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const KNOWLEDGE: KnowledgeEntry[] = [
  { icon: '🌐', name: 'Homepage crawl',     meta: 'acmecorp.com — 24 pages',  status: 'trained' },
  { icon: '📄', name: 'Product Handbook',   meta: '2.3 MB — uploaded 3d ago', status: 'trained' },
  { icon: '✏️', name: 'Custom FAQ',          meta: '142 manual entries',       status: 'trained' },
  { icon: '📋', name: 'Support Logs Export', meta: '500 ticket examples',      status: 'pending' },
];

export default function Dashboard() {
  return (
    <div className="fade-up">
      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6 max-[900px]:grid-cols-2">
        {METRICS.map(m => <MetricCard key={m.label} {...m} />)}
      </div>

      {/* Charts + Conversations */}
      <div className="grid grid-cols-2 gap-5 max-[900px]:grid-cols-1">
        <Card>
          <SectionTitle>Conversations (7d)</SectionTitle>
          <div className="flex items-end gap-2 h-[110px] mt-2">
            {BAR_DATA.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-t bg-gradient-to-b from-purple-500 to-purple-700 min-h-[4px]"
                  style={{ height: h }}
                />
                <span className="text-[10px] text-gray-500">{BAR_LABELS[i]}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle>Recent Conversations</SectionTitle>
          <div className="flex flex-col gap-2">
            {CONVERSATIONS.map(c => (
              <div key={c.name} className="flex items-center gap-3 px-3 py-2.5 bg-gray-700 rounded-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-[11px] font-semibold shrink-0">
                  {c.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium">{c.name}</div>
                  <div className="text-xs text-gray-400 truncate">{c.msg}</div>
                </div>
                <div className="text-[11px] text-gray-500 shrink-0">{c.time}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Knowledge health */}
      <Card style={{ marginTop: 20 }}>
        <SectionTitle>Knowledge Base Health</SectionTitle>
        <div className="grid grid-cols-2 gap-2.5 max-[900px]:grid-cols-1">
          {KNOWLEDGE.map(k => <KnowledgeItem key={k.name} {...k} />)}
        </div>
      </Card>
    </div>
  );
}
