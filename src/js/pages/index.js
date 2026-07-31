/* Main
----------------------------------------*/
const mainScript = () => {
    // AOS 範例
    // AOS.init({
    //     duration: 800,
    //     easing: "ease-in-out",
    //     once: true,
    //     offset: 0,
    // });

    const lightbox = lightboxHandler();
    lightbox.init();
};


/* Init
----------------------------------------*/
$(() => {
    const loading = loadingHandler();
    loading.loadFunc(mainScript);
});
