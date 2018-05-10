import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import Canvas from './code-demo';

export default class Markdown extends React.Component {
  constructor(props) {
    super(props);
    this.components = new Map;
  }

  componentDidMount() {
    this.renderDOM();
  }

  componentDidUpdate() {
    this.renderDOM();
  }

  renderDOM() {
    for (const [id, component] of this.components) {
      const div = document.getElementById(id);
      if (div instanceof HTMLElement) {
        ReactDOM.render(component, div);
      }
    }
  }

  render() {
    const documentDemo = this.documentDemo();
    const jsCode = documentDemo.match(/```(.*)\n?([^]+)```/);
    this.components.clear();
    const id = 'code-demo';
    this.components.set(id, React.createElement(Canvas, Object.assign({
      name: this.constructor.name.toLowerCase()
    }, this.props), jsCode[2]));

    return (
      <div id={id}></div>
    )
  }
}
