## HTML 專案說明

本專案為靜態HTML開發用的模板，包含CSS/JS管理、SCSS編譯、外掛打包，
此版使用prepros為轉譯工具





## 專案目錄結構

```text
HTML/
├── css/                                  # 編譯後的CSS成品資料夾
│   ├── fonts/                            # for slick 外掛字型 (若無使用slick可一併移除)
│   ├── ajax-loader.gif                   # for slick 外掛 loading圖示 (若無使用slick可一併移除)
│   ├── main.min.css                      # 主樣式，從src/scss/main.scss編譯而來
│   ├── main.min.css.map
│   ├── plugin.css                        # 外掛相關樣式，從src/scss/plugin.scss編譯而來
│   └── plugin.css.map
│
├── fonts/                                # 額外網站用字體請放這裡 (不需要可移除)
│
├── images/
│   └── m/                                # 行動版（Mobile專用）圖片資料夾
│
├── include/                              # 共用HTML
│   ├── lightbox/
│   ├── footer.html
│   └── header.html
│
├── js/                                   # 編譯後的JS成品資料夾
│   ├── script.js                         # 自定義JS
│   └── vendor.min.js                     # 外掛合併壓縮後檔案
│
├── src/                                  # 原始開發檔案目錄 (❗ 只從這裡開發，不直接改成品)
│   ├── js/
│   │   ├── components/                    # 自寫JS元件
│   │   │   └── lightbox.js
│   │   ├── core/                          # 自寫JS核心流程
│   │   │   └── loading.js
│   │   ├── lib/                          # 外掛原始JS檔案
│   │   │   ├── aos.js
│   │   │   ├── gsap.min.js
│   │   │   ├── imagesloaded.js
│   │   │   ├── jquery-3.3.1.min.js
│   │   │   ├── lazyload.min.js
│   │   │   └── slick.min.js
│   │   ├── pages/                         # 各頁面自寫JS
│   │   │   └── index.js
│   │   ├── script.bundle.js               # 複雜案子拆檔入口
│   │   ├── script.simple.js               # 小案子單檔版
│   │   └── vendor.js                      # 外掛合併入口（使用@prepros-prepend串接lib內外掛）
│   │
│   ├── scss/                              # SCSS原始樣式開發資料夾
│   │   ├── base/                          # 全站通用設定 (基礎樣式)
│   │   │   ├── _base.scss                 # html, body等全域設定
│   │   │   ├── _font.scss                 # import font & font-face
│   │   │   ├── _functions.scss            # SCSS function
│   │   │   ├── _keyframes.scss            # keyframes
│   │   │   ├── _media.scss                # media query
│   │   │   ├── _mixins.scss               # Mixin
│   │   │   ├── _reset.scss                # Reset
│   │   │   └── _variables.scss            # SCSS變數（顏色、字級等）
│   │   │
│   │   ├── components/                    # 小型功能元件樣式
│   │   │   ├── _elements.scss              # 共用元件
│   │   │   ├── _lightbox.scss              # Lightbox樣式
│   │   │   └── _loading.scss               # Loading樣式
│   │   │
│   │   ├── layout/                         # 網站大區塊版型樣式
│   │   │   ├── _footer.scss                # Footer區塊樣式
│   │   │   ├── _header.scss                # Header區塊樣式
│   │   │   └── _layout.scss                # 全站通用容器、section設定(wrapper, container等)
│   │   │
│   │   ├── pages/                          # 各頁面專用樣式
│   │   │   └── _index.scss
│   │   │
│   │   ├── plugin/                         # 外掛樣式
│   │   │   ├── _animations.scss
│   │   │   ├── _core.scss
│   │   │   ├── _easing.scss
│   │   │   ├── aos.scss
│   │   │   ├── slick-theme.scss
│   │   │   └── slick.scss
│   │   │
│   │   ├── main.scss                       # scss主入口，匯入base、components、layout、pages等
│   │   └── plugin.scss                     # 外掛樣式入口，匯入plugin相關scss
│
├── index.html
```




## 開發流程簡述

### SCSS 編譯

- **主站樣式**：從 `src/scss/main.scss` 編譯 ➔ 輸出到 `css/main.min.css`
- **外掛樣式**：從 `src/scss/plugin.scss` 編譯 ➔ 輸出到 `css/plugin.css`


### JavaScript 打包

- **外掛管理**：
  - 原始檔放在 `src/js/lib/`
  - 外掛使用 `src/js/vendor.js`，透過 `@prepros-prepend` 指定合併順序，打包成 `/js/vendor.min.js`
  - 第三方 vendor 建議只做串接，不要再交給 Prepros 做 Babel / 壓縮，避免外掛全域物件被改壞。

- **自定義功能**：
  - 成品檔為 `js/script.js`
  - 小案子可使用 `src/js/script.simple.js`，所有自寫JS集中在單檔。
  - 複雜案子可使用 `src/js/script.bundle.js`，透過 `@prepros-prepend` 串接 `core/`、`components/`、`pages/` 內的檔案。
  - 自寫 script 可交給 Prepros concat / minify；除非需要支援很舊瀏覽器，否則通常不需要 Babel。


### JS 使用方式

這份模板提供兩種自寫 JS 管理方式，依專案大小擇一使用。

#### 小案子單檔版

使用：

`src/js/script.simple.js`

適合只有一頁、互動較少、JS 不需要拆成多個元件的案子。

Prepros 可設定這支輸出到：

`js/script.js`

#### 複雜案子拆檔版

使用：

`src/js/script.bundle.js`

這支只負責設定 Prepros prepend 順序：

```js
//@prepros-prepend core/loading.js
//@prepros-prepend components/lightbox.js
//@prepros-prepend pages/index.js
```

實際功能放在：

- `src/js/core/`
- `src/js/components/`
- `src/js/pages/`

Prepros 可設定這支輸出到：

`js/script.js`


## 切版設計準則

本模板的斷點、根字級、`rem()` / `mob()` / `tab()` 換算方式與 helper class 使用規則，請參考：

[切版斷點設計準則.md](./切版斷點設計準則.md)


## 版本紀錄

詳見 [CHANGELOG.md](./CHANGELOG.md)。




## 注意事項

- 請勿直接修改 /css/ 和 /js/vendor.min.js 成品檔案
  - SCSS、外掛請從 /src/ 原始檔修改再編譯。

- 新增SCSS元件時：
  - 放到對應的 /src/scss/components/ 或 /src/scss/pages/
  - 在 main.scss 或 plugin.scss 補上 @import

- 圖片管理：
  - 行動版專用圖片可放在 images/m/
  - 視網站規模及需求可新增資料夾加以分類
