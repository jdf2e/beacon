import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import marked from 'marked'
import prismjs from 'prismjs'
import { transform } from 'babel-standalone'

// import Editor from './editor'

export default class Canvas extends React.Component {
  constructor(props) {
    super(props)

    this.playerId = `${parseInt(Math.random() * 1e9).toString(36)}`;
    this.state = {
      showBlock: true
    }
  }

  componentDidMount() {
    this.renderSource(this.props.children)
  }

  blockControl() {
    this.setState({
      showBlock: !this.state.showBlock
    })
  }

  renderSource(value) {
    let Element = require('../component/m/index');
      const args = ['context', 'React', 'ReactDOM']
      const argv = [this, React, ReactDOM]

      for (const key in Element) {
        args.push(key)
        argv.push(Element[key])
      }

      const code = transform(`
        class Demo extends React.Component {
          ${value}
        }

        ReactDOM.render(<Demo {...context.props} />, document.getElementById('${this.playerId}'))
      `, {
        presets: ['es2015', 'react']
      }).code

      args.push(code)

      new Function(...args).apply(null, argv)

      // this.source[2] = Prism.highlight(value, Prism.languages.javascript);
  }

  render() {
    return (
      <div className={`demo-block demo-box demo-${this.props.name}`}>
        <div className="source" id={this.playerId} />
      </div>
    )
  }
}

Canvas.propTypes = {
  locale: PropTypes.object
}

Canvas.defaultProps = {
  locale: {}
}
