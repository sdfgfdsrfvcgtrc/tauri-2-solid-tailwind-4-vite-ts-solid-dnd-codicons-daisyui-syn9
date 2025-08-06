import { t } from "../../i18n";

export const DaisyUIExample = (props: { 
  daisyChecked: boolean;
  setDaisyChecked: (checked: boolean) => void;
}) => {
  return (
    <div class="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
      <h2 class="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
       
        {t('daisyUITitle')}
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div class="flex flex-col items-center justify-center p-4 bg-gray-800/30 rounded-xl">
          <button class="btn btn-primary flex items-center gap-2">
            <i class="codicon codicon-check"></i>
            {t('daisyButton')}
          </button>
          <p class="text-white/80 mt-2 text-sm">{t('componentButton')}</p>
        </div>
        
       
        <div class="flex flex-col items-center justify-center p-4 bg-gray-800/30 rounded-xl">
          <div class="alert alert-info flex items-center gap-2">
            <i class="codicon codicon-info"></i>
            <span>{t('daisyAlert')}</span>
          </div>
          <p class="text-white/80 mt-2 text-sm">{t('componentAlert')}</p>
        </div>
        
        
        <div class="flex flex-col items-center justify-center p-4 bg-gray-800/30 rounded-xl">
          <label class="label cursor-pointer gap-2">
            <div class="relative">
              <input 
                type="checkbox" 
                class="checkbox checkbox-primary w-6 h-6" 
                checked={props.daisyChecked}
                onChange={(e) => props.setDaisyChecked(e.currentTarget.checked)}
              />
              
              {props.daisyChecked && (
                <svg 
                  class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  stroke-width="2"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span class="label-text text-white">{t('daisyCheckbox')}</span>
          </label>
          <p class="text-white/80 mt-2 text-sm">{t('componentCheckbox')}</p>
          <p class="text-white/60 text-sm mt-1">
            {props.daisyChecked ? t('checked') : t('unchecked')}
          </p>
        </div>
      </div>
      
      <p class="text-white/80 text-center mt-6 flex items-center justify-center gap-1">
        
        {t('daisyUIStyled')}
      </p>
    </div>
  );
};
