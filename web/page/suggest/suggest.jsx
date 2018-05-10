import Markdown from '../../../tools/markdown';
export default class Suggest extends Markdown {
  document() {
    return require('./suggest.md');
  }
}