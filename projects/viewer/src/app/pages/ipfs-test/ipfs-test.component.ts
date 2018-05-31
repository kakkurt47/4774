import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {APIConfig, LocalStorage} from '@muzika/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-ipfs-test',
  templateUrl: './ipfs-test.component.html',
  styleUrls: ['./ipfs-test.component.scss']
})
export class IPFSTestPageComponent {
  ipfsHash: string;
  ipfsFile: File;
  uploadedHash: string;

  constructor(private apiConfig: APIConfig,
              private localStorage: LocalStorage) {
  }

  changeFile(event: any) {
    this.ipfsFile = event.target.files[0];
  }

  submitUpload() {
    this._uploadFile(this.ipfsFile).subscribe(hash => {
      this.uploadedHash = hash;
    })
  }

  submitDownload() {
    this._downloadFile(this.ipfsHash);
  }

  /**
   * @returns {Observable<string>} returns IPFS File Hash
   * @private
   */
  private _uploadFile(file: File): Observable<string> {
    const url = '/file/ipfs';

    return this.uploadFile(file, {
      url: `${this.apiConfig.apiUrl}${url}?type=paper&auth=${this.localStorage.getItem('token')}`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.localStorage.getItem('token')}`
      }
    }).pipe(
      map(response => {
        console.log(response);

        return response;
      })
    );
  }

  private _downloadFile(hash: string): void {
    // @TODO seungwon-kang implement download logic
  }

  private uploadFile(file: File, event: any): Observable<any> {
    return new Observable<any>(observer => {
      const xhr = new XMLHttpRequest();
      let formData = new FormData();

      xhr.upload.addEventListener('error', (e: Event) => {
        observer.error(e);
        observer.complete();
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          observer.next({ status: xhr.status, data: xhr.response });
          observer.complete();
        }
      };

      xhr.open(event.method, event.url, true);
      try {
        Object.keys(event.headers).forEach(key => xhr.setRequestHeader(key, event.headers[key]));

        formData.append('file', file, file.name);

        xhr.send(formData);
      } catch (e) {
        observer.complete();
      }

      return () => {
        xhr.abort();
      };
    });
  }
}
