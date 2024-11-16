import { ModelProvider } from '@/libs/agent-runtime';

import { genUserLLMConfig } from '@/utils/genUserLLMConfig'

export const DEFAULT_LLM_CONFIG = genUserLLMConfig({
  ollama: {
    enabled: true,
    fetchOnClient: true,
  },
  openai: {
    enabled: true,
  },
});

export const DEFAULT_MODEL = 'mixtral-8x7b-32768';
export const DEFAULT_EMBEDDING_MODEL = 'text-embedding-3-small';

export const DEFAULT_PROVIDER = ModelProvider.Groq;
