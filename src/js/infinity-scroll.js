import { throttle } from 'lodash';
import { getImages, imagesApiService, isFetching } from '../index';

function catchScroll() {
  window.onload = () => {
    const viewportHeight = document.documentElement.clientHeight;

    window.addEventListener(
      'scroll',
      throttle(async () => {
        const scrolledY = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight;
        const scrolledToEnd = scrolledY + viewportHeight >= pageHeight - 500;

        if (isFetching) {
          return;
        }
        if (imagesApiService.shownImages >= imagesApiService.total) {
          return;
        }

        if (scrolledToEnd) {
          imagesApiService.incrementPage();
          await getImages();
        }
      }, 1000)
    );
  };
}

export { catchScroll };
