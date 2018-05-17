import Markdown from './../../../../tools/markdown-demo';
export default class Test extends Markdown {
  documentDemo() {
    return require('./test.md');
  }
}