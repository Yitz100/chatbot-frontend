import React, { useEffect, useRef } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { UserButton, useUser, useOrganization, useAuth } from '@clerk/clerk-react';
import { syncUser } from '../utils/api';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactElement;
  badge?: string;
}

interface AnalyticsItem {
  label: string;
  path: string;
  icon: React.ReactElement;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <GridIcon /> },
  { label: 'Train Bot', path: '/train',     icon: <BrainIcon />, badge: 'New' },
  { label: 'Customize', path: '/customize', icon: <SliderIcon /> },
  { label: 'Deploy',    path: '/deploy',    icon: <CubeIcon /> },
];

const ANALYTICS_ITEMS: AnalyticsItem[] = [
  { label: 'Conversations', path: '/dashboard', icon: <BarIcon /> },
  { label: 'Logs',          path: '/dashboard', icon: <ClockIcon /> },
];

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Overview',
  '/train':     'Train Your Bot',
  '/customize': 'Customize Bot',
  '/deploy':    'Deploy',
};

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const { organization, membership } = useOrganization();
  const { getToken } = useAuth();
  const title = PAGE_TITLES[location.pathname] ?? 'ScaleAway';
  const synced = useRef(false);

  useEffect(() => {
    if (!user || !organization || synced.current) return;
    synced.current = true;
    syncUser(getToken, {
      userName: user.fullName ?? user.emailAddresses[0]?.emailAddress ?? '',
      orgName: organization.name,
    }).catch(console.error);
  }, [user, organization, getToken]);

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-[var(--sidebar-w)] bg-gray-900 border-r border-white/[0.06] flex flex-col shrink-0">
        <div className="px-5 pt-6 pb-5 font-head text-xl font-extrabold tracking-tight border-b border-white/[0.06] flex items-center gap-2.5">
          <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-blue-500 rounded-[7px] flex items-center justify-center text-[13px]">⚡</div>
          Scale<span className="text-purple-300">Away</span>
        </div>

        <nav className="px-3 py-4 flex-1 overflow-y-auto">
          <p className="text-[10px] uppercase tracking-[1.5px] text-gray-500 px-2 mt-0 mb-1.5 font-medium">Platform</p>
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-2.5 py-[9px] rounded-sm text-sm font-normal cursor-pointer transition-all mb-0.5 no-underline ${
                  isActive
                    ? 'bg-purple-500/20 text-purple-300'
                    : 'text-gray-400 hover:bg-white/[0.05] hover:text-gray-200'
                }`
              }
            >
              <span className="w-4 h-4 flex items-center justify-center shrink-0 opacity-80">{item.icon}</span>
              {item.label}
              {item.badge && (
                <span className="ml-auto bg-purple-700 text-purple-200 text-[10px] px-1.5 py-px rounded-full font-medium">{item.badge}</span>
              )}
            </NavLink>
          ))}

          <p className="text-[10px] uppercase tracking-[1.5px] text-gray-500 px-2 mt-5 mb-1.5 font-medium">Analytics</p>
          {ANALYTICS_ITEMS.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 px-2.5 py-[9px] rounded-sm text-sm text-gray-400 cursor-pointer transition-all hover:bg-white/[0.05] hover:text-gray-200 mb-0.5"
              onClick={() => navigate(item.path)}
            >
              <span className="w-4 h-4 flex items-center justify-center shrink-0 opacity-80">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>

        {organization && (
          <div className="px-4 py-3 border-t border-white/[0.06]">
            <p className="text-[10px] uppercase tracking-[1.5px] text-gray-500 mb-2 font-medium">Organization</p>
            <div className="flex items-center gap-2.5">
              {organization.imageUrl ? (
                <img
                  src={organization.imageUrl}
                  alt={organization.name}
                  className="w-7 h-7 rounded-[7px] shrink-0 object-cover"
                />
              ) : (
                <div className="w-7 h-7 rounded-[7px] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold shrink-0 text-white">
                  {organization.name[0]?.toUpperCase()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-white truncate">{organization.name}</div>
                <div className="text-[11px] text-gray-500 truncate capitalize">
                  {membership?.role?.replace('org:', '') ?? 'Member'}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="px-4 py-3 border-t border-white/[0.06] flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold shrink-0 text-white">
            {user?.firstName?.[0] ?? user?.emailAddresses[0]?.emailAddress[0]?.toUpperCase() ?? '?'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium text-white truncate">
              {user?.fullName ?? user?.emailAddresses[0]?.emailAddress ?? 'User'}
            </div>
            <div className="text-[11px] text-gray-500 truncate">
              {user?.emailAddresses[0]?.emailAddress}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-white/[0.06]">
          <div className="bg-gray-800 border border-white/[0.08] rounded-sm px-3 py-2.5 cursor-pointer flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-xs shrink-0">🤖</div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-white truncate">Acme Support Bot</div>
              <div className="text-[11px] text-green flex items-center gap-1">
                <span className="w-[5px] h-[5px] rounded-full bg-green inline-block" /> Live
              </div>
            </div>
            <ChevronIcon />
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="h-[var(--topbar-h)] bg-gray-900 border-b border-white/[0.06] flex items-center px-7 gap-3 shrink-0">
          <h1 className="font-head text-lg font-bold flex-1">{title}</h1>
          <button
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm text-[13px] font-medium border border-white/10 bg-transparent text-gray-400 hover:bg-white/[0.05] hover:text-white transition-all"
            onClick={() => navigate('/train')}
          >
            + Add Knowledge
          </button>
          <button
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm text-[13px] font-medium bg-purple-600 text-white hover:bg-purple-500 transition-all"
            onClick={() => navigate('/deploy')}
          >
            ⚡ Deploy
          </button>
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-8 h-8',
                userButtonPopoverCard: 'bg-gray-800 border border-white/10 text-white',
                userButtonPopoverActionButton: 'text-gray-300 hover:text-white hover:bg-white/5',
                userButtonPopoverActionButtonText: 'text-gray-300',
                userButtonPopoverFooter: 'hidden',
              },
            }}
          />
        </div>
        <div className="flex-1 overflow-y-auto p-7">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function GridIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1.5"/><rect x="9" y="1" width="6" height="6" rx="1.5"/><rect x="1" y="9" width="6" height="6" rx="1.5"/><rect x="9" y="9" width="6" height="6" rx="1.5"/></svg>;
}
function BrainIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 2a5 5 0 110 10A5 5 0 018 3zm0 2a3 3 0 100 6 3 3 0 000-6z"/></svg>;
}
function SliderIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 5a3 3 0 100 6 3 3 0 000-6zM2.5 8a5.5 5.5 0 1111 0 5.5 5.5 0 01-11 0z"/></svg>;
}
function CubeIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l7 4v6l-7 4-7-4V5l7-4z"/></svg>;
}
function BarIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="9" width="3" height="6" rx="1"/><rect x="6" y="5" width="3" height="10" rx="1"/><rect x="11" y="1" width="3" height="14" rx="1"/></svg>;
}
function ClockIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="7"/><path d="M8 5v4l2 2" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>;
}
function ChevronIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="#8a86a8" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
