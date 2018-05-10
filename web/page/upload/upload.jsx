import Markdown from '../../../tools/markdown';
export default class Upload extends Markdown {
  document() {
    return require('./upload.md');
  }
}