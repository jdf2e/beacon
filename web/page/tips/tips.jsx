import Markdown from '../../../tools/markdown';
export default class Tips extends Markdown {
  document() {
    return require('./tips.md');
  }
}