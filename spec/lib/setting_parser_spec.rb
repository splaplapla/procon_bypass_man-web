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
        expect(h[:layers][:up]).to eq(
          :flip=>{:zr=>{:if_pressed=>:zr, :force_neutral=>:zl},
                  :zl=>{:if_pressed=>[:y, :b, :zl], :force_neutral=>nil},
                  :down=>{:if_pressed=>:down, :force_neutral=>nil}},
          :remap=>{:l=>{:to=>:zr}}
        )
        expect(h[:layers][:left]).to eq(nil)
        expect(h[:layers][:right]).to eq({})
        expect(h[:layers][:down]).to eq(:flip=>{:zl=>{:if_pressed=>nil, :force_neutral=>nil}})
      end
    end
  end
  context '定数・プラグインがある' do
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
          macro fast_return, if_pressed: [:y, :b, :down]
          remap :l, to: :zr
        end
        layer :right, mode: guruguru
        layer :left do
        end
        layer :down do
          flip :zl
        end
      YAML
    end
    describe '#prefix_keys_for_changing_layer' do
      it do
        h = ProconBypassMan::Web::SettingParser.parse(text).to_hash
        expect(h).to including(prefix_keys_for_changing_layer: [:zr, :r, :zl, :l])
        expect(h[:layers][:up]).to eq(
          :flip=>{:zr=>{:if_pressed=>:zr, :force_neutral=>:zl},
                  :zl=>{:if_pressed=>[:y, :b, :zl], :force_neutral=>nil},
                  :down=>{:if_pressed=>:down, :force_neutral=>nil}},
          :remap=>{:l=>{:to=>:zr}},
          :macro=>{ProconBypassMan::Splatoon2::Macro::FastReturn=>{:if_pressed=>[:y, :b, :down]}},
        )
        expect(h[:layers][:left]).to eq(nil)
        expect(h[:layers][:right]).to eq(:mode=>ProconBypassMan::Splatoon2::Mode::Guruguru)
        expect(h[:layers][:down]).to eq(:flip=>{:zl=>{:if_pressed=>nil, :force_neutral=>nil}})
      end
    end
  end
end
