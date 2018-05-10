import Markdown from '../../../tools/markdown';
class Tab extends Markdown {
  document() {
    return require('./tab.md');
  }
}

export default Tab;