/* Loading
----------------------------------------*/
const loadingHandler = () => {
    const removeLoading = (callback = () => {}) => {
        $(".loading").fadeOut(function () {
            $(this).remove();
            callback();
        });
    };

    // 如果需要載入共用 header / footer，可改用下方 include 版本。
    // const loadFunc = (callback) => {
    //     const loadPromises = [
    //         new Promise((resolve) => {
    //             $("header").load("include/header.html", resolve);
    //         }),
    //         new Promise((resolve) => {
    //             $("footer").load("include/footer.html", resolve);
    //         })
    //     ];

    //     Promise.all(loadPromises).then(() => {
    //         $("html, body").imagesLoaded(() => {
    //             removeLoading(() => {
    //                 callback();
    //                 $(window).trigger("resize");
    //                 $(window).trigger("scroll");
    //             });
    //         });
    //     });
    // };

    // 預設不載入 include，等所有圖片載入後移除 loading。
    const loadFunc = (callback) => {
        $("html, body").imagesLoaded(() => {
            removeLoading(() => {
                callback();
                $(window).trigger("resize");
                $(window).trigger("scroll");
            });
        });
    };

    return {
        loadFunc,
    };
};
