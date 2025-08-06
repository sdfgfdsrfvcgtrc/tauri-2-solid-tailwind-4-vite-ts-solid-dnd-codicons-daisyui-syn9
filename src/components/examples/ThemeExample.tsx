// src/components/examples/ThemeExample.tsx
import { t } from "../../i18n";

export const ThemeExample = () => {
  return (
    <div class="bg-white/20 backdrop-blur-sm rounded-xl p-6">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        
        {t('themeTitle')}
      </h2>
      <p class="text-white/80 mb-6">
        {t('themeDescription')}
      </p>

     
      <div class="bg-black/20 p-4 rounded-lg text-white/90 text-sm">
        <h3 class="font-bold text-white mb-2">{t('themeTechTitle')}</h3>
        <ul class="list-disc pl-5 space-y-1 mb-4">
          <li>
            <strong>{t('themeTechStructure')}</strong> {t('themeTechStructureDesc')}
          </li>
          <li>
            <strong>{t('themeTechSwitch')}</strong> {t('themeTechSwitchDesc')}
          </li>
          <li>
            <strong>{t('themeTechVars')}</strong> {t('themeTechVarsDesc')}
          </li>
          <li>
            <strong>{t('themeTechFiles')}</strong> {t('themeTechFilesDesc')}
          </li>
        </ul>

        <h3 class="font-bold text-white mb-2">{t('themeAddTitle')}</h3>
        <ol class="list-decimal pl-5 space-y-1">
          <li>{t('themeAddStep1')}</li>
          <li>{t('themeAddStep2')}</li>
          <li>{t('themeAddStep3')}</li>
          <li>{t('themeAddStep4')}</li>
          <li>{t('themeAddStep5')}</li>
        </ol>
      </div>
    </div>
  );
};
