import Markdown from './../../../../tools/markdown';
export default class Tab extends Markdown {
  document() {
    return require('./tab.md');
  }
}