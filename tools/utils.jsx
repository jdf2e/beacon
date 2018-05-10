export  default {
    titleCase: (str) => {
        return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
    },
    parseUrl: (url) => {
        var a = document.createElement('a')
        a.href = url
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function() {
                var s, ret = {}
                var seg = a.search.replace(/^\?/, '').split('&')
                var len = seg.length
                for (var i = 0; i < len; i++) {
                    if (!seg[i]) continue
                    s = seg[i].split('=')
                    ret[s[0]] = s[1]
                }
                return ret
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/')
        }
    },
    getComponent(client) {
        let types = {
            show: '基础展示',
            dynamic: '交互功能',
            util: '工具',
            business: '业务定制'
        }
        let components = require('./../component.json');
        let dealComponents = [];
        for(let key in types) {
            let tempArr = (components.components).filter((item)=>{
                item.name = types[key];
                return (key == item.type) && (item.client.indexOf(client)>-1);
            });
            if(tempArr.length > 0){
                dealComponents.push({
                    typename: types[key],
                    list:tempArr
                })
            }
        }
        return dealComponents;
    }
}