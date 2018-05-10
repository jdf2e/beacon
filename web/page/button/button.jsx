import Markdown from '../../../tools/markdown';
export default class Button extends Markdown {
  document() {
    return require('./button.md');
  }
}