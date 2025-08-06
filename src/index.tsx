import { render } from 'solid-js/web';
import './index.css';
import App from './App';
import { language } from './i18n';


document.documentElement.lang = language();

render(() => <App />, document.getElementById('root') as HTMLElement);
