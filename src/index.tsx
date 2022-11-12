import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { fetchPlugin } from './plugins/fetch-plugin';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

const App = () => {
    const ref = useRef<any>();
    const iframe = useRef<any>();
    const [input, setInput] = useState('');
    //const [code, setCode] = useState('');

    const startService = async() => {
        try{
            ref.current = await esbuild.initialize({
                worker: true,
                wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm'
            })
        } catch(e){
            console.error(e)
        }
    }

    useEffect(() => {
        startService()
    }, [])

    const onClick = async () => {
        if(!ref.current){
            return
        }

        iframe.current.srcdoc = html;

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

            });

            iframe.current.contentWindow.postMessage(res.outputFiles[0].text, '*');

            //setCode(res.outputFiles[0].text);

            

        // }catch(err){
        //     console.error(err);
        // }
    
    }

    const html = `

        <html>
            <head></head>
            <body>
                <div id="root"></div>
                <script>
                    window.addEventListener('message', (e) => {
                        try{
                            eval(e.data)

                        }catch(err){
                            const root = document.getElementById('root');
                            root.innerHTML = '<div style="color:red;"> <h4>RunTime Error</h4>' + err + '</div>'
                            console.error(err)
                        }
                    }, false)
                </script>
            </body>
        </html>

    `;

    return <div>
                <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
                <div>
                    <button onClick={onClick}>Submit</button>
                </div>
                {/* <pre>{code}</pre> */}
                <iframe title='preview' ref={iframe} sandbox='allow-scripts' srcDoc={html}></iframe>
            </div>
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<App/>)
