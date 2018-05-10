const fs = require('fs');
const readline = require('readline');
const path = require('path');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let componentParams = {};

class Utils {
    titleCase(str) {
        return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
    }
}

class CreateComponent {
    //创建组件名
    createChineseName() {
        return new Promise((resolve, reject) => {
            rl.question('组件中文名(最多8个字)：', (answer) => {
                componentParams.chinese = answer;
                resolve(answer);
            })
        });
    }

    createEnglishName() {
        return new Promise((resolve, reject) => {
            rl.question('组件英文名(驼峰式)：', (answer) => {
                componentParams.english = answer;
                resolve(answer);
            })
        });
    }

    createType() {
        return new Promise((resolve, reject) => {
            rl.question('组件类型(show/dynamic/util/business)：', (answer) => {
                componentParams.type = answer;
                resolve(answer);
            })
        });
    }

    createAuthor() {
        return new Promise((resolve, reject) => {
            rl.question('您的中文名：', (answer) => {
                componentParams.author = answer;
                resolve(answer);
            })
        });
    }

    createErp() {
        return new Promise((resolve, reject) => {
            rl.question('您的ERP：', (answer) => {
                componentParams.erp = answer;
                resolve(answer);
            })
        });
    }

    createEmail() {
        return new Promise((resolve, reject) => {
            rl.question('您的Email：', (answer) => {
                componentParams.email = answer;
                resolve(answer);
                rl.close();
            })
        });
    }

    createClient() {
        return new Promise((resolve, reject) => {
            rl.question('组件适用客户端(M/PC/M&PC)：', (answer) => {
                componentParams.client = answer;
                resolve(answer);
            })
        });
    }

    //目录创建
    createDir(dir) {
        var stat = fs.existsSync(dir);
        if (!stat) { //为true的话那么存在，如果为false不存在
            fs.mkdirSync(dir);
        }
    }

    //文件创建
    createFile(filePath, content) {
        return new Promise((resolve, reject) => {
            var stat = fs.existsSync(filePath);
            if (!stat) { //为true的话那么存在，如果为false不存在
                fs.writeFile(filePath, content, (err) => {
                    if (!err) {
                        resolve(filePath);
                    } else {
                        reject(err);
                    }
                });
            } else {
                reject(`${filePath}已存在`)
            }

        })
    }

    writeAppend(filePath, content) {
        return new Promise((resolve, reject) => {
            fs.appendFile(filePath, new Buffer(content), function() {
                resolve();
            });
        });
    }

    //写入到指定文件
    writeFile(filePath, content) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, new Buffer(content), function() {
                resolve();
            });
        });
    }

    //按照指定位置写入
    write(filePath, content, position) {
        return new Promise((resolve, reject) => {
            fs.write(_filePath, content, position, function() {
                resolve();
            });
        });
    }

}



class Tpl {
    componentJsxTpl(name) {
        let componentName = name.toLowerCase();
        let className = (new Utils).titleCase(componentName);
        let client = componentParams.client;
        return `import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './${componentName}.scss';
class ${className} extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
   	render() {
        let cls = classnames({
        })
     	return (
     		<div className={cls}>
     		</div>
 		);
  	}
}
${className}.defaultProps = {
};
${className}.propTypes = {
};

export default ${className};`
    }

    componentScssTpl(name) {
        let componentName = name.toLowerCase();
        let client = (componentParams.client).toUpperCase();
        if (client == 'M&PC') {
            return `.bui-pc-${componentName} {
}
.bui-m-${componentName} {
}
`
        } else if (client == 'M') {
            return `.bui-m-${componentName} {
}
`
        } else if (client == 'PC') {
            return `.bui-pc-${componentName} {
}
`
        }
    }

    webJsxTpl(name) {
        let componentName = name.toLowerCase();
        let className = (new Utils).titleCase(componentName);
        return `import Markdown from '../../../tools/markdown';
export default class ${className} extends Markdown {
  document() {
    return require('./${componentName}.md');
  }
}`
    }

    webMdTpl(name) {
        let componentName = name.toLowerCase();
        let className = (new Utils).titleCase(componentName);
        let client = componentParams.client;
        return `## ${className} ${componentParams.chinese}
### 适用终端

${client=='M&PC'?'适用M端和PC端':'仅适用'+client+'端'}

### 基本用法

文字描述基本用法。

:::demo 

\`\`\`js
constructor(props) {
  super(props);
  this.state = {
  };  
}

render() {    
  return (
    <div className="wrapper">
          <${className} />
    </div>
  );
}
\`\`\`
:::

### Attributes
| 参数        | 说明          | 类型      | 可选值       | 默认值  |  是否必填  |
|------------ |-------------- |---------- |----------- |-------- | -------- |
| —           | —           | —        | —   | — | — |

### Events
| 事件名称   | 说明    | 回调参数      |
|---------- |-------- |---------- |
| — | —| — |

`
    }

}

let create = new CreateComponent();
// create.writeFile(path.resolve(__dirname, '../component.json'), "export { default as Toast } from './toast/toast';").then(() => {
//     console.log('1111')
// });
create.createChineseName().then(() => { //组件名产生
    return create.createEnglishName();
}).then(() => {
    return create.createType();
}).then(() => {
    return create.createClient();
}).then(() => {
    return create.createAuthor();
}).then(() => {
    return create.createErp();
}).then(() => {
    return create.createEmail();
}).then(() => {
    const name = componentParams.english;
    //生成目录及生成类型文件
    const dirsFileTypes = [{
            dir: '../component',
            filetype: 'jsx',
            tpl: 'componentJsxTpl'
        },
        {
            dir: '../component',
            filetype: 'scss',
            tpl: 'componentScssTpl'
        },
        {
            dir: '../web/page',
            filetype: 'jsx',
            tpl: 'webJsxTpl'
        },
        {
            dir: '../web/page',
            filetype: 'md',
            tpl: 'webMdTpl'
        },
    ];
    var promiseArr = [];
    for (let key in dirsFileTypes) {
        promiseArr.push(createFile(dirsFileTypes[key], name));
    }
    promiseArr.push(appendToComponent(componentParams));
    promiseArr.push(appendToIndex(componentParams));
    Promise.all(promiseArr).then((values) => {
        appendToRouter().then(() => {
            process.exit();
        })

    });
});

function appendToIndex(obj) {
    let componentJson = require('./../component.json');
    let componentName = obj.english.toLowerCase();
    let className = (new Utils).titleCase(componentName);
    let create = new CreateComponent();
    return create.writeAppend(path.resolve(__dirname, '../component/index.js'), `\nexport { default as ${className} }from './${componentName}/${componentName}';`).then(() => {
        console.log('index.js修改成功')
    });
}

function appendToComponent(obj) {
    let componentJson = require('./../component.json');
    componentJson.components.push(obj);
    let create = new CreateComponent();
    return create.writeFile(path.resolve(__dirname, '../component.json'), JSON.stringify(componentJson, null, 2)).then(() => {
        console.log('component.json修改成功')
    });
}

function createFile(obj, name) {
    let componentName = name.toLowerCase();
    let filePath = path.resolve(__dirname, `${obj.dir}/${componentName}`);
    create.createDir(filePath); //创建目录
    let tpl = new Tpl();
    let tplString = tpl[`${obj.tpl}`](componentName);
    let filename = `${componentName}.${obj.filetype}`;
    return create.createFile(`${filePath}/${filename}`, tplString).then((d) => { //创建文件
        console.log(`文件${d}创建成功！`);
    });
}

function appendToRouter() {
    let importStr = '';
    let routeStr = '';
    let componentJson = require('./../component.json');
    let { components } = componentJson;
    for (let i = 0; i < components.length; i++) {
        let name = components[i].english;
        importStr += `import ${(new Utils).titleCase(name)} from './page/${name.toLowerCase()}/${name.toLowerCase()}';\n`;
    }
    for (let i = 0; i < components.length; i++) {
        let name = components[i].english;
        routeStr += `<Route path={'/${name.toLowerCase()}'} component={${(new Utils).titleCase(name)}} />\n`;
    }
    let content = `// import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route} from 'react-router-dom';
import Header from './includes/header';
import Menu from './includes/menu';
import Index from './page/index/index';
${importStr}
import './assets/index.scss';
import Utils from './../tools/utils';

ReactDOM.render((
    <HashRouter>
        <div className="wrap">
            <Header />
            <div className="content">
                <Menu />
                <div className="right">
                    <Route path={'/'} exact component={Index} />
                    ${routeStr}
                </div>
            </div>
        </div>
    </HashRouter>
    ),
    document.getElementById('app')
);
`;
    return create.writeFile(path.resolve(__dirname, '../web/index.jsx'), content).then(() => {
        console.log('index.jsx修改成功')
    });
}