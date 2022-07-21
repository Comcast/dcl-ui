
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './assets/styles/layout.scss';
import 'vue-loading-overlay/dist/vue-loading.css';


import { createApp, reactive } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vueLib from '@starport/vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmDialog from 'primevue/confirmdialog';
import DataTable from 'primevue/datatable';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import StyleClass from 'primevue/styleclass';
import Badge from 'primevue/badge';
import Toast from 'primevue/toast';
import Tooltip from 'primevue/tooltip';
import BadgeDirective from 'primevue/badgedirective';
import Ripple from 'primevue/ripple';
import Message from 'primevue/message'
import InputText from 'primevue/inputtext'
import MultiSelect from 'primevue/multiselect'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea';
import Vue3Autocounter from 'vue3-autocounter';
import VueLoading from 'vue-loading-overlay';




router.beforeEach(function(to, from, next) {
	window.scrollTo(0, 0);
	next();
});

const app = createApp(App)
app.config.globalProperties._depsLoaded = true
app.config.globalProperties.$appState = reactive({ theme: 'lara-light-indigo', darkTheme: false });

app.use(PrimeVue, { ripple: true, inputStyle: 'outlined' });
app.use(ToastService)
app.use(ConfirmationService)
app.use(router)

app.use(store)
app.use(vueLib)
app.use(VueLoading);

app.directive('styleclass', StyleClass);
app.directive('badge', BadgeDirective);
app.directive('ripple',Ripple);
app.directive('tooltip', Tooltip);
app.component('Badge', Badge);
app.component('Toast',Toast);
app.component('DataTable', DataTable);
app.component('DataView', DataView);
app.component('DataViewLayoutOptions', DataViewLayoutOptions);
app.component('ConfirmDialog', ConfirmDialog);
app.component('InputText', InputText);
app.component('MultiSelect', MultiSelect);
app.component('Button', Button);
app.component('Textarea', Textarea);
app.component('Message', Message);
app.component('vue3-autocounter', Vue3Autocounter)

app.mount('#app')
