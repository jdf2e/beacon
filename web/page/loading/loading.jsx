import Markdown from '../../../tools/markdown';
export default class Loading extends Markdown {
  document() {
    return require('./loading.md');
  }
}