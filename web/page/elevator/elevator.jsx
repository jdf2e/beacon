import Markdown from '../../../tools/markdown';
export default class Elevator extends Markdown {
  document() {
    return require('./elevator.md');
  }
}