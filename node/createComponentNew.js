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
            fs.writeFile(filePath, new Buffer(content), (err) => {
                if (!err) {
                    resolve(filePath);
                } else {
                    reject(err);
                }
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
        return `import Markdown from './../../../../tools/markdown';
export default class ${className} extends Markdown {
  document() {
    return require('./${componentName}.md');
  }
}`
    }

    webJsxDemoTpl(name) {
        let componentName = name.toLowerCase();
        let className = (new Utils).titleCase(componentName);
        return `import Markdown from './../../../../tools/markdown-demo';
export default class ${className} extends Markdown {
  documentDemo() {
    return require('./${componentName}.md');
  }
}`
    }

    webMdTpl(name) {
        let componentName = name.toLowerCase();
        let className = (new Utils).titleCase(componentName);
        let client = componentParams.client;
        return `## ${className} ${componentParams.chinese}

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
    })
    .then(() => {
        let dirsFileTypes = [];
        const name = componentParams.english;
        const client = componentParams.client;

        //生成目录及生成类型文件
        if (client == 'M' || client == 'PC')
            dirsFileTypes = [
                { dir: `../component/${client.toLowerCase()}`, filetype: 'jsx', tpl: 'componentJsxTpl' },
                { dir: `../component/${client.toLowerCase()}`, filetype: 'scss', tpl: 'componentScssTpl' },
                { dir: `../web/page/${client.toLowerCase()}`, filetype: 'jsx', tpl: 'webJsxTpl' },
                { dir: `../web/page/${client.toLowerCase()}`, filetype: 'jsx', tpl: 'webJsxDemoTpl' },
                { dir: `../web/page/${client.toLowerCase()}`, filetype: 'md', tpl: 'webMdTpl' }
            ];
        if (client == 'M&PC')
            dirsFileTypes = [
                { dir: `../component/m`, filetype: 'jsx', tpl: 'componentJsxTpl' },
                { dir: `../component/m`, filetype: 'scss', tpl: 'componentScssTpl' },
                { dir: `../web/page/m`, filetype: 'jsx', tpl: 'webJsxTpl' },
                { dir: `../web/page/m`, filetype: 'md', tpl: 'webMdTpl' },
                { dir: `../web/page/m`, filetype: 'jsx', tpl: 'webJsxDemoTpl' },
                { dir: `../component/pc`, filetype: 'jsx', tpl: 'componentJsxTpl' },
                { dir: `../component/pc`, filetype: 'scss', tpl: 'componentScssTpl' },
                { dir: `../web/page/pc`, filetype: 'jsx', tpl: 'webJsxTpl' },
                { dir: `../web/page/pc`, filetype: 'md', tpl: 'webMdTpl' },
                { dir: `../web/page/pc`, filetype: 'jsx', tpl: 'webJsxDemoTpl' }
            ];
        var promiseArr = [];
        for (let key in dirsFileTypes) {
            promiseArr.push(createFile(dirsFileTypes[key], name));
        }
        promiseArr.push(appendToComponent(componentParams));
        promiseArr.push(appendToIndex(componentParams));
        Promise.all(promiseArr).then((values) => {
            let writePromiseArr = [];
            writePromiseArr.push(appendToRouter('index.jsx', indexCode()));
            writePromiseArr.push(appendToRouter('demo.jsx', demoCode()))
            Promise.all(writePromiseArr).then(() => {
                process.exit();
            })

        });
    });

function appendToIndex(obj) {
    let componentName = obj.english.toLowerCase();
    let client = obj.client;
    let className = (new Utils).titleCase(componentName);
    let create = new CreateComponent();
    if (client == 'M' || client == 'PC') {
        return create.writeAppend(path.resolve(__dirname, `../component/${client.toLowerCase()}/index.js`), `\nexport { default as ${className} }from './${componentName}/${componentName}';`).then(() => {
            console.log(`../component/${client.toLowerCase()}/index.js修改成功！`)
        });
    }
    if (client == 'M&PC') {
        create.writeAppend(path.resolve(__dirname, `../component/m/index.js`), `\nexport { default as ${className} }from './${componentName}/${componentName}';`).then(() => {
            console.log(`../component/m/index.js修改成功！`);
            return create.writeAppend(path.resolve(__dirname, `../component/pc/index.js`), `\nexport { default as ${className} }from './${componentName}/${componentName}';`).then(() => {
                console.log(`../component/pc/index.js修改成功！`);
            });
        });
    }
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
    let filename = obj.tpl == 'webJsxDemoTpl' ? `${componentName}-demo.${obj.filetype}` : `${componentName}.${obj.filetype}`;
    return create.createFile(`${filePath}/${filename}`, tplString).then((d) => { //创建文件
        console.log(`文件${d}创建成功！`);
    });
}

function appendToRouter(writefileName, writeContent) {

    return create.writeFile(path.resolve(__dirname, `../web/${writefileName}`), writeContent).then(() => {
        console.log(`${writefileName}修改成功`);
    });
}


function indexCode() {
    let componentJson = require('./../component.json');
    let { components } = componentJson;
    let importStr = '';
    let routeStr = '';
    let routeStrM = '';
    let routeStrPC = '';

    for (let i = 0; i < components.length; i++) {
        let name = components[i].english;
        let client = components[i].client;
        if (client == 'M' || client == 'PC') {
            importStr += `import ${(new Utils).titleCase(name)}${client} from './page/${client.toLowerCase()}/${name.toLowerCase()}/${name.toLowerCase()}';\n`;
        }
        if (client == 'M&PC') {
            importStr += `import ${(new Utils).titleCase(name)}M from './page/m/${name.toLowerCase()}/${name.toLowerCase()}';\n`;
            importStr += `import ${(new Utils).titleCase(name)}PC from './page/pc/${name.toLowerCase()}/${name.toLowerCase()}';\n`;
        }

    }
    for (let i = 0; i < components.length; i++) {
        let name = components[i].english;
        let client = components[i].client;
        if (client == 'M') {
            routeStrM += `<Route path={\`\$\{match.url\}/${name.toLowerCase()}\`} component={${(new Utils).titleCase(name)}M}/>\n`;
        }
        if (client == 'PC') {
            routeStrPC += `<Route path={\`\$\{match.url\}/${name.toLowerCase()}\`} component={${(new Utils).titleCase(name)}PC}/>\n`;
        }
        if (client == 'M&PC') {
            routeStrM += `<Route path={\`\$\{match.url\}/${name.toLowerCase()}\`} component={${(new Utils).titleCase(name)}M}/>\n`;
            routeStrPC += `<Route path={\`\$\{match.url\}/${name.toLowerCase()}\`} component={${(new Utils).titleCase(name)}PC}/>\n`;
        }

    }

    return `import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route} from 'react-router-dom';
import Header from './includes/header';
import Menu from './includes/menu';
import Index from './page/index/index';
${importStr}
import './assets/index.scss';
import Utils from './../tools/utils';

const Pc = ({ match }) => (
    <div className="content">
        <Menu type='PC'/>
        <div className="right">
            ${routeStrPC}
        </div>
    </div>
);

const M =  ({ match }) => (
    <div className="content">
        <Menu type='M'/>
        <div className="right">
            ${routeStrM}
        </div>
    </div>
);

ReactDOM.render((
    <HashRouter>
        <div className="wrap">
            <Header />
            <Route path={'/'} exact component={Index} />
            <Route path={'/pc'} component={Pc}/>
            <Route path={'/m'} component={M} />
        </div>
    </HashRouter>
    ),
    document.getElementById('app')
);
`
}

function demoCode() {
    let componentJson = require('./../component.json');
    let { components } = componentJson;
    let importStr = '';
    let routeStr = '';
    let routeStrM = '';
    let routeStrPC = '';

    for (let i = 0; i < components.length; i++) {
        let name = components[i].english;
        let client = components[i].client;
        if (client == 'M' || client == 'PC') {
            importStr += `import ${(new Utils).titleCase(name)}${client} from './page/${client.toLowerCase()}/${name.toLowerCase()}/${name.toLowerCase()}-demo';\n`;
        }
        if (client == 'M&PC') {
            importStr += `import ${(new Utils).titleCase(name)}M from './page/m/${name.toLowerCase()}/${name.toLowerCase()}-demo';\n`;
            importStr += `import ${(new Utils).titleCase(name)}PC from './page/pc/${name.toLowerCase()}/${name.toLowerCase()}-demo';\n`;
        }

    }
    for (let i = 0; i < components.length; i++) {
        let name = components[i].english;
        let client = components[i].client;
        if (client == 'M') {
            routeStrM += `<Route path={\`\$\{match.url\}/${name.toLowerCase()}\`} component={${(new Utils).titleCase(name)}M}/>\n`;
        }
        if (client == 'PC') {
            routeStrPC += `<Route path={\`\$\{match.url\}/${name.toLowerCase()}\`} component={${(new Utils).titleCase(name)}PC}/>\n`;
        }
        if (client == 'M&PC') {
            routeStrM += `<Route path={\`\$\{match.url\}/${name.toLowerCase()}\`} component={${(new Utils).titleCase(name)}M}/>\n`;
            routeStrPC += `<Route path={\`\$\{match.url\}/${name.toLowerCase()}\`} component={${(new Utils).titleCase(name)}PC}/>\n`;
        }

    }

    return `import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route} from 'react-router-dom';
import List from './page/list-m';
${importStr}
import './assets/demo.scss';
import Utils from './../tools/utils';

const Pc = ({ match }) => (
    <div className="content-pc">
            ${routeStrPC}
    </div>
);

const M =  ({ match }) => (
    <div className="content-m">
        ${routeStrM}
    </div>
);

ReactDOM.render((
    <HashRouter>
        <div className="wrap-m">
            <Route path={'/'} exact component={List} />
            <Route path={'/m'} component={M} />
            <Route path={'/pc'} component={Pc} />
        </div>
    </HashRouter>
    ),
    document.getElementById('app')
);
`

}