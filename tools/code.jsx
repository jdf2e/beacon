import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import marked from 'marked'
import prismjs from 'prismjs'
import { transform } from 'babel-standalone';
import Utils from './utils';
import QRCode from 'qrcode';

// import Editor from './editor'

export default class Canvas extends React.Component {
  constructor(props) {
    super(props)

    this.playerId = `${parseInt(Math.random() * 1e9).toString(36)}`
    
    this.document = this.props.children.match(/([^]*)\n?(```[^]+```)/)
    this.description = marked(this.document[1])
    // this.source = this.document[2];
    this.source = this.document[2].match(/```(.*)\n?([^]+)```/);
    this.state = {
      showBlock: true,
      client: 'PC',
      codeUrl: ''
    }
  }

  componentDidMount() {
    this.renderSource(this.source[2]);
    let urlParams = Utils.parseUrl(window.location.href);
    let hash = urlParams.hash;
    console.log(hash)
    let codeUrl = `http://${urlParams.host}${urlParams.port?':'+urlParams.port:''}/demo.html#${hash}`;
    let client = /^\/m/.test(hash)?'M':'PC';
     QRCode.toDataURL(codeUrl,{width: 150,height: 150,margin: 0})
    .then(url => {
        this.setState({
          codeUrl:url
        })
    })
    .catch(err => {
        console.error(err);
    })
    this.setState({
      client: client,
      hash: hash
    })
  }

  blockControl() {
    this.setState({
      showBlock: !this.state.showBlock
    })
  }

  

  renderSource(value) {
    let hash = Utils.parseUrl(window.location.href).hash;
    let Element;
    if(/^\/pc/.test(hash)) //PC端
    Element = require('../component/pc/index');
    if(/^\/m/.test(hash)) //M端
    Element = require('../component/m/index');
    
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
    let {hash,codeUrl,client} = this.state;
    return (
      <div className={`demo-block demo-box demo-${this.props.name}`}>
        <div className="source" id={this.playerId} style={{display: client=='M'?'none':'block'}}/>
        {client =='M' && 
          <div className="m-demo">
              <p className="demo-code-target">手机扫描二维码查看预览效果</p>
              <p className="demo-code-target"></p>
            {/*<div className="iphone">
                <iframe src={`demo.html#${hash}`} style={{border:0,width:350 + 'px',height: 622 + 'px'}}></iframe>
            </div>*/}
            
            <div className="demo-code">
              <div className="demo-img-wrap">
                <img src={codeUrl} alt=""/>
                <div className="demo-mask"><a href={`demo.html#${hash}`} className="new-target" target="_blank">新窗口打开</a></div>
              </div>
            </div>
          </div>
        }
        {
          this.state.showBlock && (
            <div className="meta">
              {
                this.description && (
                  <div
                    ref="description"
                    className="description"
                    dangerouslySetInnerHTML={{ __html: this.description }}
                  />
                )
              }
              <pre>
                <code dangerouslySetInnerHTML={{ __html: Prism.highlight(this.source[2], Prism.languages.javascript)}} className="language-jsx"/>
              </pre>
              {/*<Editor
                value={this.source[2]}
                onChange={code => this.renderSource(code)}
              />*/}
            </div>
          )
        }
        {/*<div className="demo-block-control" onClick={this.blockControl.bind(this)}>
          {
            this.state.showBlock ? (
              <span>
                <i className="el-icon-caret-top" />{this.props.locale.hide}
              </span>
            ) : (
              <span>
                <i className="el-icon-caret-bottom" />{this.props.locale.show}
              </span>
            )
          }
        </div>*/}
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
