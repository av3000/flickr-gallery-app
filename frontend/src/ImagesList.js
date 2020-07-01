import { ImageItem } from './ImageItem';

export class ImagesList {
    constructor(imagesBlockSelector, loadMoreBtnSelector, loadingElementSelector){
        this.imagesBlock    = document.querySelector(imagesBlockSelector);
        this.loadMoreBtn    = document.querySelector(loadMoreBtnSelector);
        this.loadingElement = document.querySelector(loadingElementSelector);
        this.appContext = {};
        this.startLoading();
    };

    appInit(){
        this.fetchImages().then(res => {
            return res.photos
                    .map(image => {
                        console.log("title: "+image.title._content);
                        console.log("visibility: ", image.visibility);
                        console.log("safety:"+image.safety_level);
                        let url = 
                            'http://farm'
                            +image.farm+
                            '.staticflickr.com/'
                            +image.server+'/'+
                            image.id+'_'+image.secret+'.jpg';
                        return ImageItem(image.title._content, url)
                    })
                    .join('')
        })
        .then(images => {
            this.imagesBlock.innerHTML = images;
            this.stopLoading();
        })
        .catch(error => {
            console.log(error);
        });
    }

    fetchImages(){
       console.log("getImages");
       return new Promise((resolve, reject) => {
        return fetch(`http://localhost:8081/api/photos`, {
            method: 'GET',
        })
            .then(res => {
                return res.json();     
            })
            .then(res => {
                this.appContext = res;
                return resolve(res);
            })
            .catch(error => {
                console.log(error);
                return reject();
            });
    
      });
        
    }

    startLoading() {
        this.loadingElement.classList.add('loading');
    }

    stopLoading() {
        this.loadingElement.classList.remove('loading');
    }
}