import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mdConvert'
})
export class SimpleMDConverterPipe implements PipeTransform {
  transform(text: string) {
    let startOrderedList = false;

    const res = text
        // Decode line divider
        .split('\n').map(line => line.replace(/( ){2}$/, '<br>').trim()).join('\n')

        // Strip useless blanks
        .replace(/\n\n(\n)+/g, '\n\n')

        // Decode Table
        .split('\n').map((line, index, arr) => {
          if (/^\d+\. /.test(line.trim())) {
            if (!startOrderedList) {
              startOrderedList = true;
              return `<ol>\n<li>${line.replace(/^\d+\. /, '')}</li>`;
            } else {
              return `<li>${line.replace(/^\d+\. /, '')}</li>`;
            }
          } else {
            if (startOrderedList) {
              startOrderedList = false;
              return `</ol>\n${line}`;
            }
            return line;
          }
        }).join('\n')

        // Decode list
        .split('\n').map((line, index, arr) => {
          if (/^\d+\. /.test(line.trim())) {
            if (!startOrderedList) {
              startOrderedList = true;
              return `<ol>\n<li>${line.replace(/^\d+\. /, '')}</li>`;
            } else {
              return `<li>${line.replace(/^\d+\. /, '')}</li>`;
            }
          } else {
            if (startOrderedList) {
              startOrderedList = false;
              return `</ol>\n${line}`;
            }
            return line;
          }
        }).join('\n')

        // Decode Headline
        .split('\n').map(line => {
          if (/^#{1,6} /.test(line)) {
            let headCnt = 0;

            while (line.charAt(headCnt) === '#') {
              headCnt++;
            }

            return `<h${headCnt}>${line.replace(/^#{1,6} /, '').trim()}</h${headCnt}>`;
          } else {
            return line;
          }
        }).join('\n')

        // Decode Image
        .replace(/!\[(.*)]\((\S+)\)/g, `<img src="$2" alt="$1">`)

        // Decode link
        .replace(/\[(.*)]\((.*)\)/g, `<a href="$2" target="_blank">$1</a>`)

        // Bold text
        .replace(/\*\*(.*)\*\*/g, `<strong>$1</strong>`)

        // Convert Fontawesome
        .replace(/<!--fa-(\w+)-->/g, `<i class="fa fa-$1"></i>`)

        // Decode not-doubled-line to space
        .replace(/\n(?!\n)/g, ' ')

        // Decode all lines except wrapped by block tag
        .split('\n').map(line => {
          const excludeTags = ['ol', 'ul', 'p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'table']
            .join('|');
          const regex = new RegExp(`^<(${excludeTags})`, 'i');

          if (!regex.test(line.trim())) {
            return `<p>${line.trim()}</p>`;
          } else {
            return line.trim();
          }
        }).join('\n')
      ;

    return res;
  }
}
