/* =======================================
    script.simple.js
    小案子單檔版：所有自寫 JS 可直接寫在這支。
=========================================*/

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


/* Lightbox
----------------------------------------*/
const lightboxHandler = () => {
    const initLightbox = () => {};

    const openLightbox = (lbData) => {
        $("#lightbox-container").remove();
        $("body").append('<div id="lightbox-container"></div>');

        const fileName = `lb-${lbData}.html`;

        $("#lightbox-container").load(`include/lightbox/${fileName}`, function (response, status, xhr) {
            if (status === "error") {
                console.error("Lightbox 載入失敗:", xhr.status, xhr.statusText);
                $("#lightbox-container").remove();
                return;
            }

            const timeline = gsap.timeline();
            timeline
                .set(".lb", { opacity: 0, zIndex: 9999 })
                .to(".lb", { duration: 0.3, opacity: 1, ease: "none" });

            $("body, html").css({
                overflow: "hidden",
                position: "",
            });

            bindLightboxClose();
        });
    };

    const closeLightbox = () => {
        const timeline = gsap.timeline();
        timeline
            .to(".lb", { duration: 0.3, opacity: 0, ease: "none" })
            .set(".lb", { zIndex: -1 });

        timeline.call(() => {
            $("#lightbox-container").remove();
            $("body, html").css({
                overflow: "",
                position: "",
            });
        });
    };

    const bindEvents = () => {
        $(document).on("click", ".libtn", function (e) {
            e.preventDefault();
            const lbname = $(this).data("lb");
            openLightbox(lbname);
        });
    };

    const bindLightboxClose = () => {
        $(document).on("click", ".lb .btn_x", function (e) {
            e.stopPropagation();
            closeLightbox();
        });

        $(document).on("click", ".lb", function (e) {
            if (e.target.classList.contains("lb")) {
                closeLightbox();
            }
        });

        $(document).on("keydown.lb", function (e) {
            if (e.key === "Escape") {
                closeLightbox();
                $(document).off("keydown.lb");
            }
        });
    };

    const init = () => {
        initLightbox();
        bindEvents();
    };

    return {
        init,
        openLightbox,
        closeLightbox,
    };
};


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
