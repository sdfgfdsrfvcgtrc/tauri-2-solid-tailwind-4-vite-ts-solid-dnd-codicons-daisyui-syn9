// src/components/examples/LanguageExample.tsx
import { t } from "../../i18n";

export const LanguageExample = () => {
  return (
    <div class="bg-white/20 backdrop-blur-sm rounded-xl p-6">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">

        {t('languageTitle')}
      </h2>
      <p class="text-white/80 mb-6">
        {t('languageDescription')}
      </p>

      
      <div class="bg-black/20 p-4 rounded-lg text-white/90 text-sm">
        <h3 class="font-bold text-white mb-2">{t('languageTechTitle')}</h3>
        <ul class="list-disc pl-5 space-y-1 mb-4">
          <li><strong>{t('languageTechStructure')}</strong> {t('languageTechStructureDesc')}</li>
          <li><strong>{t('languageTechSwitch')}</strong> {t('languageTechSwitchDesc')}</li>
          <li><strong>{t('languageTechUI')}</strong> {t('languageTechUIDesc')}</li>
        </ul>

        <h3 class="font-bold text-white mb-2">{t('languageAddTitle')}</h3>
        <ol class="list-decimal pl-5 space-y-1">
          <li>{t('languageAddStep1')}</li>
          <li>{t('languageAddStep2')}</li>
          <li>{t('languageAddStep3')}</li>
          <li>{t('languageAddStep4')}</li>
        </ol>
      </div>
    </div>
  );
};
