import Markdown from '../../../tools/markdown';
export default class Checkbox extends Markdown {
  document() {
    return require('./checkbox.md');
  }
}