/*  Module to lazy load images using the intersection observer API
    - https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    Don't forget to use the polyfill if your targeting older browsers
    - https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver
    - polyfill source: https://github.com/w3c/IntersectionObserver/tree/master/polyfill
*/

class AkLazyImages {

    constructor(images, observerElement) {
        this.observerElement = observerElement || null;
        this.observer = null;
        this.images = images;
    }

    init() {
        this.createObserver();
        this.observeImages();
    }

    createObserver() {
        // Initialize intersect observer on observer element passed into constructor
        let options = {
            root: this.observerElement,
            rootMargin: '0px',
            threshold: [0.05, 0.5, 0.95]
        }
        this.observer = new IntersectionObserver(this.loadImage, options);
    }

    observeImages() {
        // observe images that were passed into constructor
        this.images.forEach(function (image) {
            this.observer.observe(image);
        }.bind(this));
    }

    loadImage(entries, observer) {

        let entry = entries[0];

        /*  Get the image src from data attribute, fade the placeholder out then fade the
            proper image back in 
        */

        // if image is not currently loading
        if (entry.target.aklazyimageloading == undefined || entry.target.aklazyimageloading === "false") {

            if (entry.isIntersecting === true) {

                let src = entry.target.dataset.img;

                // add src data to src attribute
                if (src !== undefined) {
                    // set flag that image is loading
                    entry.target.aklazyimageloading = "true";
                    entry.target.removeAttribute("data-img");
                    // fade image out
                    entry.target.classList.add("ak-lazy-img--disabled");

                    window.setTimeout(function () {
                        // wait for the transition to finish before updating src and fading back in
                        entry.target.setAttribute("src", src);
                        entry.target.onload = () => {
                            entry.target.removeAttribute("height");
                            entry.target.removeAttribute("width");
                            entry.target.classList.remove("ak-lazy-img--disabled");
                            entry.target.aklazyimageloading = "false";
                        }

                    }, 500);
                }
            }
        } // load images end
    }

}