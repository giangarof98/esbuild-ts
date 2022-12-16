import * as esbuild from 'esbuild-wasm';
import { fetchPlugin } from './plugins/fetch-plugin';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

let service: boolean = false;
const bundle =  async (rawCode: string) => {
    if(!service){
        await esbuild.initialize({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm'
        });
        service = true;

    }

    try{
        const res = await esbuild.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
            define: {
                'process.env.NODE_ENV':'"production"',
                global: 'window',
            },
            jsxFactory: '_React.createElement',
            jsxFragment: '_React.Fragment'
        }); 
        return {
            code: res.outputFiles[0].text,
            err: ''
        }

    } catch(err){
        if(err instanceof Error){
            return {
                code: '',
                err: err.message,
            }
        } else {
            throw err;
        }
    }


}

export default bundle;