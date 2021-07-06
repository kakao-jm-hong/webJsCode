import App from './App.js';
import { Store } from './store.js';

const store = new Store();
const app = new App('root', store);
app.render();