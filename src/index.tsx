import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { fetchPlugin } from './plugins/fetch-plugin';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

const App = () => {
    const ref = useRef<any>()
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const startService = async() => {
        try{
            ref.current = await esbuild.initialize({
                worker: true,
                wasmURL: '/esbuild.wasm'
            })
        } catch(e){
            console.error(e)
        }
    }

    useEffect(() => {
        startService()
    }, [])

    const onClick = async () => {
        // if(!ref.current){
        //     return
        // }

        //try{
            // const res = await esbuild.transform(input, {
            //     loader: 'jsx', 
            //       target: 'es2015'
            
            // });
            const res = await esbuild.build({
                entryPoints: ['index.js'],
                bundle: true,
                write: false,
                plugins: [
                    unpkgPathPlugin(),
                    fetchPlugin(input),

                ],
                define: {
                    'process.env.NODE_ENV':'"production"',
                    global: 'window',
                }

            })

            //console.log(res)
            setCode(res.outputFiles[0].text);
        // }catch(err){
        //     console.error(err);
        // }
    
    }

    return <div>
                <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
                <div>
                    <button onClick={onClick}>Submit</button>
                </div>
                <pre>{code}</pre>
            </div>
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<App/>)
