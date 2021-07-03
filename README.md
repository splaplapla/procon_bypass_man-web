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
WEBインターフェイスの起動方法

```shell
sudo bundle exec pbm_server
```

Open http://pi.local:9090

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Development
### 開発用のサーバを起動する
`bundle exec foreman s`

### SPA側のリリース方法
* `yarn run release-build` を実行してgit commit

## TODO
* server
    * procon_bypass_manとsocket通信する
* frontend
    * httpから起動・停止ができる
    * layerを切り替えれるようにする
    * reduxを入れる
    * 現行設定からのリストア
    * エクスポート
    * エクスポートしてから適用
    * buttonsモーダル
        * モーダルの入力を親コンポーネントに還元する感じにする
