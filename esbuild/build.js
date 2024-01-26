import { build } from 'esbuild';
import clean from 'esbuild-plugin-clean';
import copy from 'esbuild-plugin-copy';

let msgPhaser = {
    name: 'msg-phaser',
    setup(build) {
        build.onEnd(() => {
            const line = "---------------------------------------------------------";
            const msg = `💜💜💜 Tell us about your game! - games@phaser.io 💜💜💜`;
            process.stdout.write(`${line}\n${msg}\n${line}\n`);
            
            process.stdout.write(`✨ Done ✨\n`);
        });
    },
}

const builder = async () => {
    await build({
        entryPoints: ['./src/main.js'],
        bundle: true,
        minify: true,
        sourcemap: true,
        target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
        outfile: './dist/bundle.js',
        plugins: [
            clean({
                patterns: ['./dist/*'],
            }),
            copy({
                assets: [
                    { from: './public/index.html', to: './' },
                    { from: './public/style.css', to: './' },
                    { from: './public/assets/**/*', to: './assets/' }
                ],
            }),
            msgPhaser
        ]
    });
};
builder();
