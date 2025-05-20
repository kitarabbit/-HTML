/* =======================================
    loading
=========================================*/

const loadingHandler = () => {

    const removeLoading = (callback = () => {}) => {
        $(".loading").fadeOut(function () {
            $(this).remove();
            callback();
        });
    };

    // header & footer使用include
    // const loadFunc = (callback) => {
    //     const loadPromises = [
    //         new Promise((resolve) => {
    //             $("header").load("include/header.html", resolve);
    //         }),
    //         new Promise((resolve) => {
    //             $("footer").load("include/footer.html", resolve);
    //         })
    //     ];

    //     // 使用 Promise.all 同時載入所有元素
    //     Promise.all(loadPromises).then(() => {
    //         // 所有元素都載入完成後，等待圖片載入
    //         $("html, body").imagesLoaded(() => {
    //             removeLoading(() => {
    //                 callback();

    //                 // 觸發事件以確保樣式正確套用
    //                 $(window).trigger("resize");
    //                 $(window).trigger("scroll");
    //             });
    //         });
    //     });
    // };

    // header & footer無使用include
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

$(() => {
    const loading = loadingHandler();
    loading.loadFunc(mainScript);
});


/* =======================================
    function
=========================================*/

/* AOS
----------------------------------------*/
// const aosHandler = () => {
//     const init = () => {
//         AOS.init({
//             duration: 800,
//             easing: 'ease-in-out',
//             once: true,
//             offset: 0,
//         });
//     };

//     return { init };
// };



/* Lightbox
----------------------------------------*/
const lightboxHandler = () => {

    //初始化，不需要可略過
    const initLightbox = () => {
    };

    const openLightbox = (lbData) => {
        // 先清掉舊的lightbox
        $('#lightbox-container').remove();

        // 動態加一個容器
        $('body').append('<div id="lightbox-container"></div>');

        // 自動補上 lightbox_ 前綴
        const fileName = `lb-${lbData}.html`;

        // 載入lightbox HTML
        $('#lightbox-container').load(`include/lightbox/${fileName}`, function(response, status, xhr) {
            if (status === "error") {
                console.error("載入Lightbox失敗:", xhr.status, xhr.statusText);
                $('#lightbox-container').remove();
                return;
            }

            // 成功載入後進行進場動畫
            const timeline = gsap.timeline();
            timeline
                .set('.lb', { opacity: 0, zIndex: 9999 })
                .to('.lb', { duration: 0.3, opacity: 1, ease: "none" });

            // 鎖住body滾動
            $('body,html').css({
                overflow: 'hidden',
                position: ''
            });

            // 綁定關閉
            bindLightboxClose();
        });
    };

    const closeLightbox = () => {
        const timeline = gsap.timeline();
        timeline
            .to('.lb', { duration: 0.3, opacity: 0, ease: "none" })
            .set('.lb', { zIndex: -1 });

        timeline.call(() => {
            $('#lightbox-container').remove();
            $('body,html').css({
                overflow: '',
                position: ''
            });
        });
    };

    const bindEvents = () => {
        $(document).on('click', '.libtn', function(e) {
            e.preventDefault();
            const lbname = $(this).data('lb'); 
            openLightbox(lbname); 
        });
    };

    const bindLightboxClose = () => {
        $(document).on('click', '.lb .btn_x', function(e) {
            e.stopPropagation();
            closeLightbox();
        });

        $(document).on('click', '.lb', function(e) {
            if (e.target.classList.contains('lb')) {
                closeLightbox();
            }
        });

        $(document).on('keydown.lb', function(e) {
            if (e.key === "Escape") {
                closeLightbox();
                $(document).off('keydown.lb');
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
        closeLightbox
    };
};





/* =======================================
    mainScript
=========================================*/
const mainScript = () => {
    // AOS
    // const aos = aosHandler();
    // aos.init();

    // LB
    const lightbox = lightboxHandler();
    lightbox.init();
};