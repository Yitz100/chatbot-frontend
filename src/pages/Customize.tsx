import { useState } from 'react';
import { Card, SectionTitle, Input, Textarea, Toggle } from '../components/UI';
import ChatPreview from '../components/ChatPreview';

const COLORS: string[] = ['#7c27cc', '#1a6cff', '#059669', '#dc2626', '#d97706', '#db2777', '#1e293b'];
const EMOJIS: string[] = ['🤖', '💬', '⚡', '🎯', '🚀', '✨'];
const POSITIONS: string[] = ['Bottom Right', 'Bottom Left', 'Full Page'];

interface ToggleConfig {
  key: keyof TogglesState;
  label: string;
  sub: string;
}

interface TogglesState {
  typing: boolean;
  email: boolean;
  handoff: boolean;
  history: boolean;
  suggested: boolean;
}

const TOGGLES: ToggleConfig[] = [
  { key: 'typing',    label: 'Show typing indicator',    sub: 'Animate when bot is thinking' },
  { key: 'email',     label: 'Collect email before chat', sub: 'Ask for email as first message' },
  { key: 'handoff',   label: 'Human handoff',             sub: 'Allow users to request a human' },
  { key: 'history',   label: 'Chat history',              sub: 'Remember conversation context' },
  { key: 'suggested', label: 'Suggested prompts',         sub: 'Show quick-reply chips' },
];

export default function Customize() {
  const [botName, setBotName]   = useState('Acme Assistant');
  const [greeting, setGreeting] = useState("Hi there! 👋 I'm Acme's AI assistant. I can help you with pricing, features, and support. What would you like to know?");
  const [avatar, setAvatar]     = useState('🤖');
  const [color, setColor]       = useState('#7c27cc');
  const [position, setPosition] = useState(0);
  const [toggles, setToggles]   = useState<TogglesState>({ typing: true, email: false, handoff: true, history: true, suggested: true });

  const flip = (key: keyof TogglesState) => setToggles(t => ({ ...t, [key]: !t[key] }));

  return (
    <div className="grid grid-cols-[1fr_380px] gap-7 items-start fade-up max-[1000px]:grid-cols-1">
      {/* Settings */}
      <div>
        <Card className="mb-5">
          <SectionTitle>Identity</SectionTitle>
          <Input label="Bot Name" value={botName} onChange={e => setBotName(e.target.value)} />
          <Textarea label="Greeting Message" rows={3} value={greeting} onChange={e => setGreeting(e.target.value)} />
          <div>
            <label className="block text-[11px] uppercase tracking-[0.7px] text-gray-400 mb-2">Avatar Emoji</label>
            <div className="flex gap-2 flex-wrap">
              {EMOJIS.map(e => (
                <div
                  key={e}
                  className={`text-xl w-10 h-10 flex items-center justify-center bg-gray-700 rounded-sm cursor-pointer border-[1.5px] transition-all hover:bg-gray-600 ${
                    avatar === e ? 'border-purple-500 bg-purple-500/20' : 'border-transparent'
                  }`}
                  onClick={() => setAvatar(e)}
                >
                  {e}
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="mb-5">
          <SectionTitle>Appearance</SectionTitle>
          <label className="block text-[11px] uppercase tracking-[0.7px] text-gray-400 mb-2">Primary Color</label>
          <div className="flex gap-2.5 flex-wrap mb-3.5">
            {COLORS.map(c => (
              <div
                key={c}
                className={`w-8 h-8 rounded-full cursor-pointer border-[2.5px] transition-all hover:scale-110 ${
                  color === c ? 'outline outline-[2.5px] outline-white outline-offset-2 scale-110' : 'border-transparent'
                }`}
                style={{ background: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
          <label className="block text-[11px] uppercase tracking-[0.7px] text-gray-400 mb-2 mt-3.5">Widget Position</label>
          <div className="flex gap-2.5">
            {POSITIONS.map((p, i) => (
              <div
                key={p}
                className={`flex-1 text-center px-2.5 py-2.5 bg-gray-700 border rounded-sm text-xs cursor-pointer transition-all ${
                  position === i
                    ? 'border-blue-500 bg-blue-500/10 text-white'
                    : 'border-white/[0.07] text-gray-400 hover:border-purple-400 hover:text-white'
                }`}
                onClick={() => setPosition(i)}
              >
                {p}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle style={{ marginBottom: 4 }}>Behavior</SectionTitle>
          {TOGGLES.map(t => (
            <div key={t.key} className="flex items-center justify-between py-3 border-b border-white/[0.06] last:border-b-0 last:pb-0">
              <div>
                <div className="text-[13px] text-gray-200">{t.label}</div>
                <div className="text-[11px] text-gray-500 mt-0.5">{t.sub}</div>
              </div>
              <Toggle on={toggles[t.key]} onToggle={() => flip(t.key)} />
            </div>
          ))}
        </Card>
      </div>

      {/* Live Preview */}
      <div>
        <SectionTitle>Live Preview</SectionTitle>
        <ChatPreview botName={botName} greeting={greeting} avatar={avatar} color={color} />
      </div>
    </div>
  );
}
