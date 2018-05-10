import Markdown from '../../../tools/markdown';

export default class Toast extends Markdown {
  document() {
    return require(`./toast.md`);
  }
}