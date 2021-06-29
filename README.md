# ProconBypassMan::Web
*  https://github.com/splaspla-hacker/procon_bypass_man をwebから操作できるwebアプリケーションです
    * 設定ファイルの変更・反映
* Raspberry Pi4内で起動します

## Installation
cloneしてserviceに登録します

```ruby
gem 'procon_bypass_man-web', github: 'splaspla-hacker/procon_bypass_man-web'
```

And then execute:

    $ bundle install

## Usage
open http://pi.local:3000

* できること
  * GUIで設定ファイルの変更・反映
  * procon_bypass_manの再起動

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/[USERNAME]/procon_bypass_man-web. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/[USERNAME]/procon_bypass_man-web/blob/master/CODE_OF_CONDUCT.md).

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Development
### Hot to release
* `yarn run release` を実行してgit commit

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
