import ReactDOM from 'react-dom/client';

import { Root } from '@/components/Root';

// Uncomment this import in case, you would like to develop the application even outside
// the Telegram application, just in your browser.
import './mockEnv.ts';

//import '@telegram-apps/telegram-ui/dist/styles.css';
import './index.css';
//import 'animate.css';
import 'amfe-flexible/index.js';
ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
