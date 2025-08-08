// src/components/ui/AboutModal.tsx
import { Component, createSignal, onMount } from 'solid-js';
import { getVersion } from '@tauri-apps/api/app';
import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';
// import { ask, message } from '@tauri-apps/plugin-dialog';

type AboutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  t: (key: string, params?: Record<string, any>) => string;
};

export const AboutModal: Component<AboutModalProps> = (props) => {
  const [appVersion, setAppVersion] = createSignal<string>(props.t('loading'));
  const [updateStatus, setUpdateStatus] = createSignal<string>('');
  const [updateAvailable, setUpdateAvailable] = createSignal<boolean>(false);
  const [updateInfo, setUpdateInfo] = createSignal<any>(null);

  onMount(async () => {
    try {
      const version = await getVersion();
      setAppVersion(version);
    } catch (err) {
      console.error('Error when receiving the version:', err);
      setAppVersion(props.t('unknown'));
    }
  });

  const handleCheckForUpdates = async () => {
    setUpdateStatus(props.t('checkingForUpdates'));
    setUpdateAvailable(false);
    setUpdateInfo(null);

    try {
      const updateResult = await check();

      if (updateResult?.available) {
        setUpdateInfo(updateResult);
        setUpdateAvailable(true);
        setUpdateStatus(`${props.t('updateAvailable')}: ${updateResult.version}`);
        
      } else {
        setUpdateStatus(props.t('noUpdatesAvailable'));
      }
    } catch (err: any) {
      console.error('Error checking for updates:', err);
      if (err.message && (err.message.includes('network') || err.message.includes('fetch') || err.message.includes('internet'))) {
         setUpdateStatus(props.t('noInternetConnection'));
      } else if (err.message && (err.message.includes('signature') || err.message.includes('verify'))) {
        setUpdateStatus(props.t('signatureVerificationFailed'));
        console.warn(props.t('signatureWarning'));
      } else {
         setUpdateStatus(`${props.t('updateCheckError')}: ${err.message || err}`);
      }
    }
  };

  const handleInstallUpdate = async () => {
    const updateToInstall = updateInfo();
    if (!updateToInstall) {
      setUpdateStatus(props.t('noUpdateToInstall'));
      return;
    }

    try {
      setUpdateStatus(props.t('downloadingInstalling'));
      await updateToInstall.downloadAndInstall((event: any) => {
         switch (event.event) {
           case 'Started':
             console.log(`${props.t('downloadStarted')} ${event.data.contentLength} bytes`);
             break;
           case 'Progress':

             break;
           case 'Finished':
             console.log(props.t('downloadFinished'));
             setUpdateStatus(props.t('downloadFinishedInstalling'));
             break;
         }
       });
      setUpdateStatus(props.t('updateInstalledRestarting'));
      await relaunch();
    } catch (err: any) {
      console.error('Error when installing the update:', err);
      if (err.message && (err.message.includes('signature') || err.message.includes('verify'))) {
        setUpdateStatus(props.t('signatureVerificationFailedInstall'));
        console.error(props.t('criticalSignatureError'));
      } else {
         setUpdateStatus(`${props.t('updateInstallError')}: ${err.message || err}`);
      }
    }
  };

  return (
    <div
      class={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity ${props.isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={props.onClose}
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-96 max-w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-white">{props.t('aboutSyn9')}</h2>

        <div class="mb-4">
          <p class="text-gray-600 dark:text-gray-300">
            <strong>{props.t('version')}:</strong> {appVersion()}
          </p>
        </div>

        {updateStatus() && (
          <div class="mb-4 p-2 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm">
            {updateStatus()}
          </div>
        )}

        <div class="flex flex-col sm:flex-row sm:justify-between gap-2">
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
            onClick={handleCheckForUpdates}
            disabled={updateStatus() === props.t('checkingForUpdates')}
          >
            {props.t('checkForUpdates')}
          </button>

          {updateAvailable() && (
            <button
              class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              onClick={handleInstallUpdate}
            >
              {props.t('updateNow')}
            </button>
          )}

          <button
            class="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
            onClick={props.onClose}
          >
            {props.t('close')}
          </button>
        </div>
      </div>
    </div>
  );
};
