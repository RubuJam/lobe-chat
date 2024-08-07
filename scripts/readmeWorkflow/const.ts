export interface DataItem {
  author: string;
  createdAt: string;
  homepage: string;
  identifier: string;
  meta: { avatar: string; description: string; tags: string[]; title: string };
}

export const MARKET_URL = 'https://rubuark.live/market';
export const PLGUIN_URL = 'https://rubuark.live/settings/agent';
export const AGENT_EN_URL = 'https://chat-agents.rubuark.live/index.json';
export const AGENT_CN_URL = 'https://chat-agents.rubuark.live/index.zh-CN.json';
export const AGENT_REPO = 'https://github.com/lobehub/lobe-chat-agents';
export const PLUGIN_EN_URL = 'https://chat-plugins.lobehub.com/index.json';
export const PLUGIN_CN_URL = 'https://chat-plugins.lobehub.com/index.zh-CN.json';
export const PLUGIN_REPO = 'https://github.com/lobehub/lobe-chat-plugins';

export const AGENT_SPLIT = '<!-- AGENT LIST -->';
export const PLUGIN_SPLIT = '<!-- PLUGIN LIST -->';
