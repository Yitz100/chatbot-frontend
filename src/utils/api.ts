export interface BotConfig {
  id?: number;
  org_id?: number;
  bot_name?: string | null;
  greeting?: string | null;
  avatar?: string | null;
  primary_color?: string | null;
  widget_position?: string | null;
  show_typing_indicator?: boolean | null;
  collect_email?: boolean | null;
  human_handoff?: boolean | null;
  chat_history?: boolean | null;
  suggested_prompts?: boolean | null;
  train_url?: string | null;
  crawl_depth?: string | null;
  instructions?: string | null;
  deployment_channel?: string | null;
  allowed_domains?: string[] | null;
}

const BASE_URL = import.meta.env.VITE_API_URL as string;

async function authHeaders(getToken: () => Promise<string | null>) {
  const token = await getToken();
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

export async function getConfig(getToken: () => Promise<string | null>): Promise<BotConfig> {
  const res = await fetch(`${BASE_URL}/api/config`, {
    headers: await authHeaders(getToken),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function saveConfig(
  getToken: () => Promise<string | null>,
  partial: Partial<BotConfig>
): Promise<BotConfig> {
  const res = await fetch(`${BASE_URL}/api/config`, {
    method: "POST",
    headers: await authHeaders(getToken),
    body: JSON.stringify(partial),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function syncUser(
  getToken: () => Promise<string | null>,
  payload: { userName: string; orgName: string }
): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/user/sync`, {
    method: "POST",
    headers: await authHeaders(getToken),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
}
