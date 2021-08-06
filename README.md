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
    * エクスポートしてから適用
    * エクスポートした設定の妥当性をテストで確認したい
    * モーダルのデザインを整える
    * a layerのデザインを整える
    * plugin, modeを選択して、ボタンに適用できるようにする(粗い)
* github pageでホスティングする(generator)
