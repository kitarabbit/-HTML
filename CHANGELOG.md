# Changelog

## v2.0.0 - 2026-07-31

### Changed

- 調整斷點規則為 Mobile / Large Mobile / Tablet / Desktop 四段式。
- 將 README 從 `README.txt` 改為 `README.md`，並整理 GitHub 顯示格式。
- 重整 JS 架構，新增 simple / bundle 兩種使用方式。
- 調整 vendor 打包策略，避免第三方套件經 Babel / minify 後出錯。
- 補強 SCSS base reset、helper class 與 accessibility 設定。
- 更新 Prepros 設定，補上自寫 JS 入口。

### Added

- 新增 `切版斷點設計準則.md`。
- 新增 `src/js/script.simple.js`。
- 新增 `src/js/script.bundle.js`。
- 新增 `src/js/core/`、`src/js/components/`、`src/js/pages/` 結構。
- 新增 `CHANGELOG.md` 紀錄版本變更。

### Fixed

- 修正 README 目錄結構在 GitHub 上排版錯亂的問題。
- 修正 README 標題層級。
- 重新產出 `js/vendor.min.js`，避免 AOS 被壓縮成錯誤的 `(void 0).AOS`。

## v1.0.0 - 2025-04-29

### Added

- 建立初版空白 HTML 模板。
- 加入基本 HTML / SCSS / JS / Prepros 結構。
