import Markdown from '../../../tools/markdown';
export default class Calendar extends Markdown {
  document() {
    return require('./calendar.md');
  }
}