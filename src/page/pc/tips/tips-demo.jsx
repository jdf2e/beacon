import Markdown from './../../../../tools/markdown-demo';
export default class Tips extends Markdown {
  documentDemo() {
    return require('./tips.md');
  }
}