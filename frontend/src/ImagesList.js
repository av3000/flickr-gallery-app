import { ImageItem } from './ImageItem';

export class ImagesList {
    constructor(imagesBlockSelector, loadMoreBtnSelector, loadingElementSelector){
        this.imagesBlock    = document.querySelector(imagesBlockSelector);
        this.loadMoreBtn    = document.querySelector(loadMoreBtnSelector);
        this.loadingElement = document.querySelector(loadingElementSelector);
        this.url = 'http://localhost:8081/api/photos?';
        this.appContext = {};
        this.appContext.page = 1;
        this.appContext.perpage = 10;
        this.appContext.keyword = "";
        this.appContext.photos = [];
        this.startLoading();
        window.addEventListener('scroll', () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            
            if(clientHeight + scrollTop >= scrollHeight - 5) {
                    this.loadMore(this.appContext.page, this.appContext.perpage).then(res => {
                    
                    return this.generatePhotosToDom(res.photos);
                })
                .then(images => {
                    this.imagesBlock.innerHTML += images;
                    this.stopLoading();
                })
                .catch(error => {
                    console.log(error);
                    this.stopLoading();
                });
            }

        });
    };

    generatePhotosToDom(photos) {
       
        return photos
            .map(image => {
                let url = 
                    'http://farm'
                    +image.farm+
                    '.staticflickr.com/'
                    +image.server+'/'+
                    image.id+'_'+image.secret+'.jpg';

                return ImageItem(image.title, url)
            })
            .join('')
    }

    loadMore(page, perpage){
        let params = { page: page, perpage: perpage }
        const urlParams = new URLSearchParams(Object.entries(params));

        this.startLoading();

        return new Promise((resolve, reject) => {
         return fetch(this.url + urlParams)
             .then(res => {
                 return res.json();     
             })
             .then(res => {
                //  this.appContext = res;
                 this.appContext.photos += res.photos;
                 this.appContext.page = res.page;
                 this.appContext.perpage = res.perpage;
                 return resolve(res);
             })
             .catch(error => {
                 console.log(error);
                 return reject();
             });
       });
    }

    appInit(){
        this.fetchImages(this.appContext.page, this.appContext.perpage).then(res => {
            return this.generatePhotosToDom(res.photos);
        })
        .then(images => {
            this.imagesBlock.innerHTML = images;
            this.stopLoading();
        })
        .catch(error => {
            console.log(error);
        });
    }

    fetchImages(page, perpage){
        let params = { page: page, perpage: perpage }
        const urlParams = new URLSearchParams(Object.entries(params));

        return new Promise((resolve, reject) => {
          return fetch(this.url + urlParams)
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