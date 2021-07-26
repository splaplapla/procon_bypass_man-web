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
    * エクスポートしてから適用
    * モーダルのデザインを整える
    * useContextに入れているuseStateの代わりにuseReducerを使う
    * a layerのデザインを整える
        * radioboxを変更するとliが別の行になる
    * prefixボタンを設定できるようにする
    * plugin, modeを選択して、ボタンに適用できるようにする(粗い)
    * remap, flipに値が入ったままflip.enable:fasleになることがあって、エクスポート結果が不正になることがある
    * ボタンメニューのopen判定関数, 初期値の設定がややこしい
        * => layerのボタン状態をクラスのインスタンスにする
    * ボタンメニューを開いたときにデフォルトを無効にする
    * checkをつけてメニューを開いてモーダルを出した時の警告を出さないようにする
* github pageでホスティングする(generator)
