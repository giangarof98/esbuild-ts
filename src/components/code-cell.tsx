import { useState, useEffect } from "react";

import CodeEditor from '../components/code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from "./resizable";

const CodeCell = () => {
    const [code, setCode] = useState('');
    const [err, setError] = useState('');
    const [input, setInput] = useState('');

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundle(input)
            setCode(output.code);
            setError(output.err)  

        }, 750);
        return () => {
            clearTimeout(timer)
        }
    }, [input])

    return (
        <Resizable direction="vertical">

            <div style={{height:'100%', display:'flex', flexDirection:'row'}}>
                <Resizable direction="horizontal">
                    <CodeEditor 
                        initialValue='const a = 1'
                        onChange={(value) => setInput(value)}
                    />

                </Resizable>
                {/* <div>
                    <button onClick={onClick}>Submit</button>
                </div> */}
                <Preview code={code} err={err} />
            </div>
            
        </Resizable>
    )
};

export default CodeCell;