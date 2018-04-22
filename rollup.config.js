import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2'

export default {
  entry: './src/index.ts',
  dest: './lib/bundle.js',
  format: 'es',
  plugins: [
    resolve(),
    typescript()
  ],
  external: [
    'react',
  ],
}
