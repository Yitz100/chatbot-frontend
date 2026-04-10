import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Card, SectionTitle, Input, Button, CodeBlock } from '../components/UI';
import { getConfig, saveConfig } from '../utils/api';

interface Channel {
  icon: string;
  title: string;
  desc: string;
}

interface Step {
  title: string;
  desc: string;
  done: boolean;
}

const CHANNELS: Channel[] = [
  { icon: '🌐', title: 'Website Widget', desc: 'Embed a floating chat bubble on any site with one line of code.' },
  { icon: '📄', title: 'Full Page Chat', desc: 'Host a dedicated chat page at your subdomain.' },
  { icon: '📱', title: 'WhatsApp',       desc: 'Connect your bot to WhatsApp Business API.' },
  { icon: '🔌', title: 'REST API',       desc: 'Query your bot programmatically from any app.' },
  { icon: '💬', title: 'Slack',          desc: 'Deploy inside your Slack workspace.' },
  { icon: '📧', title: 'Email',          desc: 'Auto-reply to support emails with AI.' },
];

const SNIPPET = `<!-- ScaleAway Bot Widget -->
<script
  src="https://cdn.scaleaway.io/widget.js"
  data-bot-id="bot_acme_a9f3k2"
  data-theme="purple"
  defer
></script>`;

const STEPS: Step[] = [
  { title: 'Train Complete',   desc: 'Your knowledge base has 6 sources ready.', done: true },
  { title: 'Copy the snippet', desc: 'Paste the embed code before </body> on your site.', done: true },
  { title: 'Verify domain',    desc: 'Add your domain to the allowlist below.', done: false },
  { title: 'Go live',          desc: 'Toggle your bot live from the dashboard.', done: false },
];

export default function Deploy() {
  const [selected, setSelected]   = useState(0);
  const [domains, setDomains]     = useState(['acmecorp.com', '']);
  const [saving, setSaving]       = useState(false);
  const [published, setPublished] = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    getConfig(getToken)
      .then(cfg => {
        if (cfg.deployment_channel) {
          const idx = CHANNELS.findIndex(c => c.title === cfg.deployment_channel);
          if (idx !== -1) setSelected(idx);
        }
        if (cfg.allowed_domains && cfg.allowed_domains.length > 0) {
          setDomains([...cfg.allowed_domains, '']);
        }
      })
      .catch(console.error);
  }, [getToken]);

  const updateDomain = (i: number, v: string) => {
    const d = [...domains];
    d[i] = v;
    setDomains(d);
  };

  const handlePublish = async () => {
    setSaving(true);
    setError(null);
    try {
      await saveConfig(getToken, {
        deployment_channel: CHANNELS[selected].title,
        allowed_domains: domains.filter(d => d.trim() !== ''),
      });
      setPublished(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to publish');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fade-up">
      <SectionTitle>Choose Deployment Method</SectionTitle>

      {/* Channel grid */}
      <div className="grid grid-cols-3 gap-3.5 mb-7 max-[900px]:grid-cols-2">
        {CHANNELS.map((c, i) => (
          <div
            key={i}
            className={`bg-gray-800 border rounded p-[18px] cursor-pointer transition-all ${
              selected === i
                ? 'border-blue-500 bg-blue-500/[0.08]'
                : 'border-white/[0.07] hover:border-purple-500'
            }`}
            onClick={() => setSelected(i)}
          >
            <div className="text-2xl mb-2.5">{c.icon}</div>
            <div className="text-sm font-semibold mb-1">{c.title}</div>
            <div className="text-xs text-gray-400 leading-relaxed">{c.desc}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-7 items-start max-[900px]:grid-cols-1">
        {/* Left: embed + domains */}
        <div>
          <SectionTitle>Embed Code</SectionTitle>
          <CodeBlock>{SNIPPET}</CodeBlock>

          <Card style={{ marginTop: 20 }}>
            <SectionTitle style={{ marginBottom: 4 }}>Domain Allowlist</SectionTitle>
            <p className="text-xs text-gray-400 mb-3.5">Only these domains can embed your bot</p>
            {domains.map((d, i) => (
              <Input
                key={i}
                value={d}
                placeholder="add another domain..."
                onChange={e => updateDomain(i, e.target.value)}
              />
            ))}
            <Button variant="ghost" onClick={() => setDomains([...domains, ''])}>
              + Add Domain
            </Button>
          </Card>
        </div>

        {/* Right: steps + publish */}
        <div>
          <SectionTitle>Deployment Steps</SectionTitle>
          <div className="flex flex-col">
            {STEPS.map((s, i) => (
              <div key={i} className="flex gap-3.5 pb-5 relative last:pb-0">
                {/* connector line */}
                {i < STEPS.length - 1 && (
                  <div className="absolute left-[15px] top-[34px] bottom-0 w-px bg-white/[0.08]" />
                )}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 z-[1] ${
                    s.done
                      ? 'bg-blue-500 text-white'
                      : 'bg-purple-700 text-purple-200'
                  }`}
                >
                  {s.done ? '✓' : i + 1}
                </div>
                <div className="pt-1.5">
                  <div className="text-sm font-semibold mb-1">{s.title}</div>
                  <div className="text-xs text-gray-400 leading-relaxed">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {error && (
            <div className="mt-3 text-[13px] text-red-400">{error}</div>
          )}

          <Button
            variant="blue"
            fullWidth
            style={{ marginTop: 20, padding: '14px', fontSize: 14 }}
            onClick={handlePublish}
          >
            {published ? '✓ Bot is Live!' : saving ? 'Publishing...' : '⚡ Publish Bot'}
          </Button>

          {published && (
            <div className="mt-3.5 bg-green/10 border border-green/25 rounded-sm px-3.5 py-3 text-[13px] text-green">
              🎉 Your bot is now live on <strong>{CHANNELS[selected].title}</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
