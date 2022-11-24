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

    const res = await esbuild.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [
            unpkgPathPlugin(),
            fetchPlugin(rawCode),

        ],
        define: {
            'process.env.NODE_ENV':'"production"',
            global: 'window',
        }
    }); 

    return res.outputFiles[0].text;

}

export default bundle;