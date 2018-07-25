import Markdown from './../../../../tools/markdown';
export default class Tree extends Markdown {
  document() {
    return require('./tree.md');
  }
}