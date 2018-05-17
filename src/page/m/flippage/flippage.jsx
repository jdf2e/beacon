import Markdown from './../../../../tools/markdown';
export default class Flippage extends Markdown {
  document() {
    return require('./flippage.md');
  }
}