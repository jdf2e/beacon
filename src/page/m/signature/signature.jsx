import Markdown from './../../../../tools/markdown';
export default class Signature extends Markdown {
  document() {
    return require('./signature.md');
  }
}