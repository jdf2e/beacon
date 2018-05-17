import Markdown from './../../../../tools/markdown';
export default class Test extends Markdown {
  document() {
    return require('./test.md');
  }
}