import { createApp } from 'vue';
import App from './App.vue';
import MaterialList from './components/MaterialList.vue';

const app = createApp(App);

app.component('material-list', MaterialList);

app.mount('#app');
