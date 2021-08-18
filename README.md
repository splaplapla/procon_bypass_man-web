# ProconBypassMan::Web
*  https://github.com/splaplapla/procon_bypass_man のWEBインターフェイスです
    * 設定ファイルの変更・反映
* Raspberry Pi4内で起動します

## Installation
例: https://github.com/jiikko/procon_bypass_man_sample

```ruby
gem 'procon_bypass_man-web'
```

And then execute:

    $ bundle install

## Usage
実行ファイルの中で `ProconBypassMan::Web::Server.start` を呼んでください  
例: https://github.com/jiikko/procon_bypass_man_sample/blob/master/web.rb  

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
    * エクスポートした設定の妥当性をテストで確認したい
    * モーダルのデザインを整える
    * prettierでフォーマットする
    * HttpClientのエラーレスポンスにも型をつける
    * インストール可能なマクロ、になっている部分をプラグインでグルーピングする
* github pageでホスティングする(generator)
