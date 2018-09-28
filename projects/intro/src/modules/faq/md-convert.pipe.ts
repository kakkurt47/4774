import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mdConvert'
})
export class SimpleMDConverterPipe implements PipeTransform {
  transform(text: string) {
    let startOrderedList = false;

    const res = text
        .split('\n').map(line => line.trim()).join('\n')
        .replace(/\n\n(\n)+/g, '\n\n')
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
        .replace(/\[(.*)]\((.*)\)/g, `<a href="$2" target="_blank">$1</a>`)
        .replace(/\*\*(.*)\*\*/g, `<strong>$1</strong>`)
        .replace(/\n(?!\n)/g, ' ')
        .split('\n').map(line => {
          const excludeTags = ['ol', 'ul', 'p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
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
