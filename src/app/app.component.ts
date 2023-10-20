import { Component, ElementRef, ViewChild } from '@angular/core';
import { UploadService } from './upload.service';
import { finalize } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('file', { static: true }) fileInput: ElementRef;
  fileToUpload: File;
  uploaded = false;
  original: File;
  url: SafeUrl;

  constructor(
    private uploadService: UploadService,
    private sanitizer: DomSanitizer
  ) {
    this.upload = this.upload.bind(this);
  }

  handleFileInput(event) {
    const fileList: FileList = event.target.files;
    console.log(fileList);
    if (fileList.length > 0) {
      const file: File = fileList[0];
      console.log('file', file);

      this.fileToUpload = file;
      if (!this.uploaded) {
        this.uploaded = true;
        this.original = file;
        console.log('original', this.original);
      }
    }

    const file = event.target.files[0];

    if (file) {
      // Create a FileReader for reading data URL
      const dataURLReader = new FileReader();

      dataURLReader.onload = (_event) => {
        const sanitizedURL: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(
          dataURLReader.result as string
        );

        // Assign the sanitized URL to your component property
        this.url = sanitizedURL;
      };

      dataURLReader.readAsDataURL(file);

      // Create a separate FileReader for reading ArrayBuffer
      const arrayBufferReader = new FileReader();

      arrayBufferReader.onload = (_event) => {
        const byteArray = new Uint8Array(
          arrayBufferReader.result as ArrayBuffer
        );
        console.log('byteArray:', byteArray);
      };

      arrayBufferReader.readAsArrayBuffer(file);
    }
  }

  public upload() {
    this.setBlobs();

    // return this.uploadService
    //   .upload(this.fileToUpload)
    //   .pipe(
    //     finalize(() => {
    //       console.log(this.original);

    //       // this.fileInput.nativeElement.value = this.original;
    //       this.setBlobs();
    //     })
    //   )
    //   .subscribe(() => {});
  }

  setBlobs() {
    let fileInputElement = document.getElementById('file') as HTMLInputElement;
    let container = new DataTransfer();
    // Here load or generate data
    let data = new Blob();
    let file = new File([this.original], this.original.name, {
      type: this.original.type,
      lastModified: new Date().getTime(),
    });
    container.items.add(file);

    fileInputElement.files = container.files;

    if (file) {
      // Create a FileReader for reading data URL
      const dataURLReader = new FileReader();

      dataURLReader.onload = (_event) => {
        const sanitizedURL: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(
          dataURLReader.result as string
        );

        // Assign the sanitized URL to your component property
        this.url = sanitizedURL;
        console.log('filereader', this.url);
      };

      dataURLReader.readAsDataURL(file);
    }
  }
}
