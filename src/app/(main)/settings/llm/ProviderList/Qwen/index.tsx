import { Tongyi } from '@lobehub/icons';
import { Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { QwenProviderCard } from '@/config/modelProviders';
import { GlobalLLMProviderKey } from '@/types/user/settings';

import { KeyVaultsConfigKey } from '../../const';
import { ProviderItem } from '../../type';

const providerKey: GlobalLLMProviderKey = 'qwen';

export const useQwenProvider = (): ProviderItem => {
  const { t } = useTranslation('modelProvider');

  const chinaLabel = `${t(`${providerKey}.region.china`)}: https://dashscope.aliyuncs.com/compatible-mode/v1`;
  const globalLabel = `${t(`${providerKey}.region.global`)}: https://dashscope-intl.aliyuncs.com/api/v1`;

  return {
    ...QwenProviderCard,
    apiKeyItems: [
      {
        children: (
          <Input.Password
            autoComplete={'new-password'}
            placeholder={t(`${providerKey}.apiKey.placeholder`)}
          />
        ),
        desc: t(`${providerKey}.apiKey.desc`),
        label: t(`${providerKey}.apiKey.title`),
        name: [KeyVaultsConfigKey, providerKey, 'apiKey'],
      },
      {
        children: (
          <Select
            allowClear
            options={[
              {
                label: chinaLabel,
                value: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
              },
              {
                label: globalLabel,
                value: 'https://dashscope-intl.aliyuncs.com/api/v1',
              },
            ]}
            placeholder={globalLabel}
          />
        ),
        desc: t(`${providerKey}.region.desc`),
        label: t(`${providerKey}.region.title`),
        name: [KeyVaultsConfigKey, providerKey, 'region'],
      },
    ],
    title: (
      <Flexbox align={'center'} gap={8} horizontal>
        <Tongyi.Color size={32} />
      </Flexbox>
    ),
  };
};
