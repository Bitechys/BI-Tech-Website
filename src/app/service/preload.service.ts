import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreloadService {
  private assets: string[] = [
    'assets/image/newhome.jpg',
    'assets/image/about.png',
    'assets/image/collage.png',
    'assets/image/trans.png',
    'assets/image/unsplash1.jpg',
    'assets/image/home.png',
    'assets/image/logo.jpg',
    // 'assets/image/menu/m1.webp',
    // 'assets/image/menu/m2.webp',
    // 'assets/image/menu/m3.webp',
    // 'assets/image/menu/m4.webp',
    // 'assets/image/menu/m5.webp',
    // 'assets/image/menu/m6.webp',

    'assets/font/Roboto-Regular.ttf',
    'assets/font/Roboto-Bold.ttf',

    // Add more image paths as needed
  ];

  // preloadImages(): Promise<void[]> {
  //   const promises: Promise<void>[] = [];

  //   for (const imagePath of this.images) {
  //     const promise = this.preloadImage(imagePath);
  //     promises.push(promise);
  //   }

  //   return Promise.all(promises);
  // }

  // private preloadImage(imagePath: string): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     const image = new Image();
  //     image.onload = () => resolve();
  //     image.onerror = () => reject();
  //     image.src = imagePath;
  //   });
  // }

  preloadAssets(): Promise<void[]> {
    const promises: Promise<void>[] = this.assets.map((assetPath) =>
      this.preloadAsset(assetPath)
    );

    return Promise.all(promises);
  }
  private preloadAsset(assetPath: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (assetPath.endsWith('.ttf')) {
        // Preload font
        const style = document.createElement('style');
        // style.textContent = `
        //   @font-face {
        //     font-family: 'Flaticon';
        //     src: url('${assetPath}') format('woff2');
        //     /* Add additional formats if needed */
        //     font-weight: normal;
        //     font-style: normal;
        //   }
        // `;

        style.onload = () => {
          console.log(`Font loaded successfully: ${assetPath}`);
          resolve();
        };

        style.onerror = (errorEvent) => {
          console.error(`Error loading font: ${assetPath}`, errorEvent);
          reject(errorEvent);
        };

        document.head.appendChild(style);
      } else {
        // Preload image
        const asset = new Image();
        asset.onload = () => {
          console.log(`Asset loaded successfully: ${assetPath}`);
          resolve();
        };

        asset.onerror = (errorEvent) => {
          console.error(`Error loading asset: ${assetPath}`, errorEvent);
          reject(errorEvent);
        };

        asset.src = assetPath;
      }
    });
  }

  // private preloadAsset(assetPath: string): Promise<void> {
  //   return new Promise<void>((resolve, reject) => {
  //     const asset = new Image();
  //     asset.onload = () => {
  //       console.log(`Asset loaded successfully: ${assetPath}`);
  //       resolve();
  //     };
  //     asset.onerror = (errorEvent) => {
  //       console.error(`Error loading asset: ${assetPath}`, errorEvent);
  //       reject(errorEvent);
  //     };
  //     asset.src = assetPath;
  //   });
  // }

  // constructor(private http: HttpClient) {}

  // preloadAssets(): Observable<void[]> {
  //   const requests: Observable<void>[] = this.assets.map((assetPath) =>
  //     this.http.get(assetPath, { responseType: 'blob' }).pipe(
  //       map(() => {})
  //     )
  //   );

  //   return forkJoin(requests);
  // }

}
