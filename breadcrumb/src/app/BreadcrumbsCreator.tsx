import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { BreadcrumbCustom } from './components/BreadcrumbCustom';

SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function(){

    const titles = document.getElementsByClassName('ms-webpart-titleText');
    if(titles) {
        const currentUrl = decodeURIComponent(window.location.href);

        for(var i = 0; i < titles.length; i++) {
            let items: {text: string, href: string}[] = [];
            const el = titles[i];
            const anchorEl = el.getElementsByTagName('a');
            if(anchorEl && anchorEl.length > 0) {
                const listUrl = decodeURIComponent(anchorEl[0].getAttribute('href'));
                const spanListTitle = anchorEl[0].getElementsByTagName('nobr')[0].getElementsByTagName('span')[0];
                const listTitle = spanListTitle.innerText ? spanListTitle.innerText : 'Root';

                const rootFolder = getQuerystringParamByName('RootFolder');
                items.push({text: listTitle, href: currentUrl.replace('RootFolder=' + rootFolder + '&', '')});
                if(rootFolder && rootFolder.indexOf(listUrl) != -1) {
                    const folders = rootFolder.replace(_spPageContextInfo.webServerRelativeUrl, '').split('/').slice(2); 
                    let rootFolderBuilder = rootFolder.replace('/' + folders.join('/'),'');
                    folders.forEach(folder => { 
                        rootFolderBuilder += ('/' + folder);
                        items.push({ text: folder, href: currentUrl.replace(rootFolder, rootFolderBuilder) });
                    });
                }

                ReactDOM.render(<Fabric><BreadcrumbCustom items={items} /></Fabric>, el);
            }
        }
    }
});

function getQuerystringParamByName(param: string) {
    const url = window.location.href;
    param = param.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + param + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
