# ProconBypassMan::Web
*  https://github.com/splaspla-hacker/procon_bypass_man のWEBインターフェイスです
    * 設定ファイルの変更・反映
    * procon_bypass_manの起動・停止
* Raspberry Pi4内で起動します

## Installation
使用例: https://github.com/jiikko/procon_bypass_man_sample/tree/with-web

```ruby
gem 'procon_bypass_man-web', github: 'splaspla-hacker/procon_bypass_man-web'
```

And then execute:

    $ bundle install

## Usage
実行ファイルの中で `ProconBypassMan::Web::Server.start` を呼んでください  
例: https://github.com/jiikko/procon_bypass_man_sample/blob/with-web/web.rb  

Open http://pi.local:9090

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Development
### 開発用のサーバを起動する
`bundle exec foreman s`

### frontend側のビルド方法
* `yarn run release-build` を実行してgit commit

## TODO
* server
    * procon_bypass_manとsocket通信して、recordingができたり、なにかできるようにする
* frontend
    * reduxを入れる
    * 現行設定からのリストア
    * 現在のファイルをダウンロードする
    * エクスポートしてから適用
    * モーダルのデザインを整える
    * モーダルの出現位置を整える
    * モーダル上での入力をするとcheckboxにcheckを入れる
    * a layerのデザインを整える
        * radioboxを変更するとliが別の行になる
    * prefixボタンを設定できるようにする
    * 入力と押したとき、の表現のゆらぎを直す
    * 連打する、押した時だけ、というゆらぎを直す
    * layer liのデザインを整える
        * タブにする
    * plugin, modeを選択して、ボタンに適用できるようにする(粗い)
* github pageでホスティングする(generator)
