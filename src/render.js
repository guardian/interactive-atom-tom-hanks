import mainTemplate from './src/templates/main.html!text'
import Mustache from 'mustache'
import rp from 'request-promise'

export function render() {
    return rp({
        uri: 'https://interactive.guim.co.uk/docsdata-test/19aDAHOu1ir6bFeycv9HsP01-y0O2vbn-uMZGiO_WULQ.json',
        json: true
    }).then((data) => {
        var sheets = data.sheets.Sheet1[0];
        // console.log(sheets.extractCopy.split('\n').filter(Boolean));
        var ec = sheets.extractCopy.split("\n").filter(Boolean);

        var allLines = [];
        for(var i=0; i < ec.length; i++){
            var line = ec[i];
            line = line.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            if (line[0]=='<') {
                allLines.push(line);
                // console.log('dont add', line)
            } else {
                allLines.push('<p>'+line+'</p>');
                // console.log('add', line);
            }
        }
        sheets.extractCopy = allLines.join("\n");
        // sheets.extractCopy = sheets.extractCopy.replace('</p><p></p><p>', '</p><p>');
        var html = Mustache.render(mainTemplate, sheets);
        return html;
    });
}
