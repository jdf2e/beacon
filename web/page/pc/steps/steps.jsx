import Markdown from './../../../../tools/markdown';
export default class Steps extends Markdown {
  document() {
    return require('./steps.md');
  }
}