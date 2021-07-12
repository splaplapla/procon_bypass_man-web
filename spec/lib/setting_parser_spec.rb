require "spec_helper"

describe ProconBypassMan::Web::SettingParser do
  context '定数・プラグインがない' do
    let(:text) do
      <<~YAML
        prefix_keys_for_changing_layer [:zr, :r, :zl, :l]

        layer :up, mode: :manual do
          flip :zr, if_pressed: :zr, force_neutral: :zl
          flip :zl, if_pressed: [:y, :b, :zl]
          flip :down, if_pressed: :down
          remap :l, to: :zr
        end
        layer :right
        layer :left do
        end
        layer :down do
          flip :zl
        end
      YAML
    end
    describe '#to_hash' do
      it do
        h = ProconBypassMan::Web::SettingParser.parse(text).to_hash
        expect(h).to including(prefix_keys_for_changing_layer: [:zr, :r, :zl, :l])
      end
    end
  end
  xcontext '定数・プラグインがある' do
    let(:text) do
      <<~YAML
        fast_return = ProconBypassMan::Splatoon2::Macro::FastReturn
        guruguru = ProconBypassMan::Splatoon2::Mode::Guruguru

        install_macro_plugin fast_return
        install_mode_plugin guruguru

        prefix_keys_for_changing_layer [:zr, :r, :zl, :l]

        layer :up, mode: :manual do
          flip :zr, if_pressed: :zr, force_neutral: :zl
          flip :zl, if_pressed: [:y, :b, :zl]
          flip :down, if_pressed: :down
          macro fast_return.name, if_pressed: [:y, :b, :down]
          remap :l, to: :zr
        end
        layer :right, mode: guruguru.name
        layer :left do
        end
        layer :down do
          flip :zl
        end
      YAML
    end
    describe '#prefix_keys_for_changing_layer' do
      it do
        parser = ProconBypassMan::Web::SettingParser.parse(text)
        expect(parser.prefix_keys_for_changing_layer).to eq([:zr, :r, :zl, :l])
      end
    end
  end
end
