import React, { useState } from 'react';

interface Message {
  role: 'bot' | 'user';
  text: string | null;
}

const SAMPLE_MESSAGES: Message[] = [
  { role: 'bot',  text: null },
  { role: 'user', text: "What's your starter plan?" },
  { role: 'bot',  text: "Our Starter plan is $29/month and includes up to 1,000 conversations, 1 bot, and email support. Want me to walk you through what's included?" },
];

interface ChatPreviewProps {
  botName: string;
  greeting: string;
  avatar: string;
  color: string;
}

export default function ChatPreview({ botName, greeting, avatar, color }: ChatPreviewProps) {
  const [input, setInput] = useState('');

  const messages: Message[] = [
    { role: 'bot', text: greeting },
    ...SAMPLE_MESSAGES.slice(1),
  ];

  return (
    <div className="bg-gray-900 border border-white/[0.08] rounded-lg overflow-hidden sticky top-0">
      {/* Header */}
      <div className="px-4 py-3.5 flex items-center gap-2.5 transition-colors duration-300" style={{ background: color }}>
        <div className="w-[34px] h-[34px] rounded-full bg-white/20 flex items-center justify-center text-base">{avatar}</div>
        <div>
          <div className="text-sm font-semibold">{botName || 'Bot'}</div>
          <div className="text-[11px] text-white/65">Online · Powered by ScaleAway</div>
        </div>
      </div>

      {/* Messages */}
      <div className="p-4 flex flex-col gap-2.5 min-h-[260px]">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[82%] px-3.5 py-2.5 text-[13px] leading-relaxed ${
                m.role === 'bot'
                  ? 'bg-gray-700 rounded-[4px_14px_14px_14px]'
                  : 'text-white rounded-[14px_4px_14px_14px]'
              }`}
              style={m.role === 'user' ? { background: color } : undefined}
            >
              {m.text}
            </div>
          </div>
        ))}

        <div className="flex gap-1.5 flex-wrap">
          {['💰 Pricing', '🚀 Features', '📞 Contact'].map(c => (
            <div
              key={c}
              className="bg-gray-700 rounded-full px-3 py-[5px] text-xs cursor-pointer hover:bg-gray-600 transition-colors"
            >
              {c}
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 border-t border-white/[0.08] flex gap-2">
        <input
          className="flex-1 bg-gray-700 border border-white/[0.08] rounded-lg px-3 py-[9px] text-[13px] text-white font-body outline-none focus:border-white/20"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          className="w-9 h-9 rounded-lg border-none text-white cursor-pointer text-sm flex items-center justify-center shrink-0 hover:opacity-85 transition-opacity"
          style={{ background: color }}
        >
          ↑
        </button>
      </div>
    </div>
  );
}
