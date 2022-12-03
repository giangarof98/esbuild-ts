import 'bulmaswatch/superhero/bulmaswatch.min.css'
import ReactDOM from "react-dom/client";
//import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';

const App = () => {

    return (
        <div>
            <TextEditor />
            {/* <CodeCell/> */}
        </div>
    )
};

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement);

root.render(<App/>)
