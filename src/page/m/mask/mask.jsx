import Markdown from './../../../../tools/markdown';
export default class Mask extends Markdown {
  document() {
    return require('./mask.md');
  }
}