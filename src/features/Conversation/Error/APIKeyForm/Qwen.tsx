import { Tongyi } from '@lobehub/icons';
import { Input, Select } from 'antd';
import { useTheme } from 'antd-style';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ModelProvider } from '@/libs/agent-runtime';
import { useUserStore } from '@/store/user';
import { keyVaultsConfigSelectors } from '@/store/user/selectors';

import { FormAction } from '../style';

const QwenForm = memo(() => {
  const { t } = useTranslation('modelProvider');

  const [apiKey, region, setConfig] = useUserStore((s) => [
    keyVaultsConfigSelectors.qwenConfig(s).apiKey,
    keyVaultsConfigSelectors.qwenConfig(s).region,
    s.updateKeyVaultConfig,
  ]);

  const theme = useTheme();

  const handleChangeRegion = (value: string) => {
    setConfig(ModelProvider.Qwen, { region: value });
  };

  return (
    <FormAction
      avatar={<Tongyi.Color color={theme.colorText} size={56} />}
      description={t('qwen.unlock.description')}
      title={t('qwen.unlock.title')}
    >
      <Input.Password
        autoComplete={'new-password'}
        onChange={(e) => {
          setConfig(ModelProvider.Qwen, { apiKey: e.target.value });
        }}
        placeholder={t('qwen.apiKey.placeholder')}
        type={'block'}
        value={apiKey}
      />

      <Select
        onChange={handleChangeRegion}
        options={[
          {
            label: `${t('qwen.region.china')}: https://dashscope.aliyuncs.com/compatible-mode/v1`,
            value: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
          },
          {
            label: `${t('qwen.region.global')}: https://dashscope-intl.aliyuncs.com/api/v1`,
            value: 'https://dashscope-intl.aliyuncs.com/api/v1',
          },
        ]}
        placeholder={t('qwen.region.placeholder')}
        style={{ width: '100%' }}
        value={region}
      />
    </FormAction>
  );
});

export default QwenForm;
