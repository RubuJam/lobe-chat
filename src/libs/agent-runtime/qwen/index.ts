import OpenAI from 'openai';

import { ModelProvider } from '../types';
import { LobeOpenAICompatibleFactory } from '../utils/openaiCompatibleFactory';

export interface LobeQwenAIParams {
  apiKey: string;
  region?: string;
}

const getBaseURL = (region: string) => {
  switch (region) {
    case 'https://dashscope.aliyuncs.com/compatible-mode/v1': {
      return 'https://dashscope.aliyuncs.com/compatible-mode/v1';
    }
    default: {
      return 'https://dashscope-intl.aliyuncs.com/api/v1';
    }
  }
};

export const LobeQwenAI = LobeOpenAICompatibleFactory({
  baseURL: getBaseURL({ region: 'Region' }.region),
  chatCompletion: {
    handlePayload: (payload) => {
      const top_p = payload.top_p;
      return {
        ...payload,
        stream: payload.stream ?? true,
        top_p: top_p && top_p >= 1 ? 0.9999 : top_p,
      } as OpenAI.ChatCompletionCreateParamsStreaming;
    },
  },
  constructorOptions: {
    defaultHeaders: {
      'Content-Type': 'application/json',
    },
  },
  debug: {
    chatCompletion: () => process.env.DEBUG_QWEN_CHAT_COMPLETION === '1',
  },

  provider: ModelProvider.Qwen,
});
