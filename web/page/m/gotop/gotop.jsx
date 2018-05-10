import Markdown from '../../../../tools/markdown';
export default class Gotop extends Markdown {
  document() {
    return require('./gotop.md');
  }
}