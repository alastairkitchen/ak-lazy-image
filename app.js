//import akLazyImages from 'utilities/ak-lazy-image.js';

// load images
(function loadImages() {
    let imageElements = document.querySelectorAll('.ak-lazy-img');
    let images = [];
    
    // spread operator used as fix for safari foreach is not a function error
    [...imageElements].forEach(function(image){
      images.push(image);
    });
  
    let akLazyImages = new AkLazyImages(images);
    akLazyImages.init();
    
}());