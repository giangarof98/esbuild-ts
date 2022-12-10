import 'bulmaswatch/superhero/bulmaswatch.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { store } from './state';
import CellList from './components/cell-list';
//import TextEditor from './components/text-editor';

const App = () => {

    return (
        <Provider store={store}>
            <div>
                {/* <TextEditor /> */}
                <CellList/>
            </div>
        </Provider>
    )
};

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement);

root.render(<App/>)
