import { t } from "../../i18n";
import { invoke } from "@tauri-apps/api/core";

export const WelcomeSection = (props: {
  greetMsg: string;
  setName: (name: string) => void;
  setGreetMsg: (msg: string) => void;
}) => {

  const greet = async () => {
    const msg = await invoke("greet", { name: props.greetMsg });
    props.setGreetMsg(msg as string);
  };

  return (
    <div class="bg-white/20 backdrop-blur-sm rounded-xl p-6 max-w-md mb-6">
      <h1 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        
        {t('welcome')}
      </h1>

      <div class="flex justify-center space-x-6 mb-6">
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src="/vite.svg" class="w-12 h-12" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank" rel="noopener noreferrer">
          <img src="/tauri.svg" class="w-12 h-12" alt="Tauri logo" />
        </a>
        <a href="https://solidjs.com" target="_blank" rel="noopener noreferrer">
          <img src="/src/assets/logo.svg" class="w-12 h-12" alt="Solid logo" />
        </a>
      </div>
      


      <form
        class="flex flex-col space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <div class="relative">
          <input
            id="greet-input"
            class="w-full px-4 py-2 pl-10 rounded-lg bg-white/90 dark:bg-gray-700/80 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            onChange={(e) => props.setName(e.currentTarget.value)}
            placeholder={t('enterName')}
          />
          
        </div>
        <button 
          type="submit"
          class="bg-teal-700 hover:bg-teal-600 dark:bg-teal-800 dark:hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
        >
          
          {t('greetButton')}
        </button>
      </form>
      
      {props.greetMsg && (
        <p class="mt-4 p-3 bg-black/20 text-white rounded-lg flex items-center gap-2">
          
          {props.greetMsg}
        </p>
      )}
    </div>
  );
};
