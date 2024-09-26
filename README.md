# Figma Non-Dev Mode Alert Chrome 拡張機能

## 概要

これは、Figma を非 Dev Mode で閲覧していると次のような警告を画面に表示する Chrome 拡張機能です。

![image](./images/banner.png)

## インストール方法

### Chrome web store

[Non-Dev Mode Alert - Chrome ウェブストア](https://chromewebstore.google.com/detail/non-dev-mode-alert/edpldihlkibendkdckeikfdnibkbejaf)

### ローカルインストール

1. リポジトリをクローンまたはダウンロードします
2. Chrome ブラウザで `chrome://extensions` を開きます
3. 右上の「デベロッパーモード」をオンにします
4. 「パッケージ化されていない拡張機能を読み込む」をクリックし、このプロジェクトのディレクトリを選択します

## 使用方法

- 拡張機能をインストールすると自動的に動作します。
- 警告メッセージが表示された場合、「非表示」ボタンをクリックして閉じることができます。

## 機能

- URL パラメータ（`?m=dev`）に基づいて開発モードを検出
- 非開発モード時に警告メッセージを表示
- ユーザーが警告を閉じる機能
