import Markdown from '../../../tools/markdown';
export default class Cascadar extends Markdown {
  document() {
    return require('./cascadar.md');
  }
}