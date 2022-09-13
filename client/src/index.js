import ReactDOM from 'react-dom';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ProviderA from './contextProvider.js';
// project imports
import * as serviceWorker from 'serviceWorker';
import App from 'App';
import { store } from 'store';

// style + assets
import 'assets/scss/style.scss';

// ==============================|| REACT DOM RENDER  ||============================== //

ReactDOM.render(
    <Provider store={store}>
        <ProviderA>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ProviderA>
    </Provider>,
    document.getElementById('root')
);


serviceWorker.unregister();
