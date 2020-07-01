console.log("app is connected.");
import { ImagesList } from './ImagesList';

const imagesList = new ImagesList('#images-app', '#load-more', '.loading-element');
imagesList.appInit();
// ImagesList.configureInfiniteLoadListener();