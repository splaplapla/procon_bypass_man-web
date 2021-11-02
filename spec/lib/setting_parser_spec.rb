require "spec_helper"

describe ProconBypassMan::Web::SettingParser do
  context '未定義のDSLがある時' do
    let(:text) do
      <<~YAML
        hoge_set_neutral_position 1
        layer :up, mode: :manual do
          remap :l, to: :zr
          hoge_disable
        end
        layer :right
        layer :left do
        end
        layer :down do
          flip :zl
        end
      YAML
    end
    it 'エラーにはしない' do
      expect { ProconBypassMan::Web::SettingParser.parse(text).to_hash }.not_to raise_error
    end
  end

  context '定数・プラグインがない' do
    let(:text) do
      <<~YAML
        prefix_keys_for_changing_layer [:zr, :r, :zl, :l]

        layer :up, mode: :manual do
          flip :zr, if_pressed: :zr, force_neutral: :zl
          flip :zl, if_pressed: [:y, :b, :zl]
          flip :y
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
          :flip=>{:zr=>{:if_pressed=>[:zr], :force_neutral=>[:zl], enable: true},
                  :zl=>{:if_pressed=>[:y, :b, :zl], :force_neutral=>nil, enable: true},
                  :y=>nil,
                  :down=>{:if_pressed=>[:down], :force_neutral=>nil, enable: true}},
          :remap=>{:l=>{:to=>[:zr]}}
        )
        expect(h[:layers][:left]).to eq({})
        expect(h[:layers][:right]).to eq({})
        expect(h[:layers][:down]).to eq(:flip=>{:zl=>nil})
      end
    end
    describe '#to_hash_group_by_button' do
      it do
        h = ProconBypassMan::Web::SettingParser.parse(text).to_hash_group_by_button
        expect(h).to eq(
          {:prefix_keys_for_changing_layer=>[:zr, :r, :zl, :l],
           :layers=>
           {:up=>
            {:zr=>{:flip=>{:if_pressed=>[:zr], :force_neutral=>[:zl], enable: true }, open: true },
             :zl=>{:flip=>{:if_pressed=>[:y, :b, :zl], :force_neutral=>nil, enable: true }, open: true },
             :down=>{:flip=>{:if_pressed=>[:down], :force_neutral=>nil, enable: true }, open: true },
             :y=>{:flip=>{ enable: true }, open: true },
             :l=>{:remap=>{:to=>[:zr]}, open: true }},
            :right=>{},
            :left=>{},
            :down=>{:zl=>{
              :flip=>{ enable: true }, open: true }
            }}}
        )
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
        layer :left, mode: guruguru do
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
          :flip=>{:zr=>{:if_pressed=>[:zr], :force_neutral=>[:zl], enable: true},
                  :zl=>{:if_pressed=>[:y, :b, :zl], :force_neutral=>nil, enable: true},
                  :down=>{:if_pressed=>[:down], :force_neutral=>nil, enable: true}},
          :remap=>{:l=>{:to=>[:zr]}},
          :macro=>{"ProconBypassMan::Splatoon2::Macro::FastReturn"=>{:if_pressed=>[:y, :b, :down]}},
        )
        expect(h[:layers][:left]).to eq(:mode=>"ProconBypassMan::Splatoon2::Mode::Guruguru")
        expect(h[:layers][:right]).to eq(:mode=>"ProconBypassMan::Splatoon2::Mode::Guruguru")
        expect(h[:layers][:down]).to eq(:flip=>{:zl=>nil})
      end
    end
    describe '#to_hash_group_by_button' do
      it do
        h = ProconBypassMan::Web::SettingParser.parse(text).to_hash_group_by_button

        expect(h).to eq(
          {:prefix_keys_for_changing_layer=>[:zr, :r, :zl, :l],
           :installed_macros => ["ProconBypassMan::Splatoon2::Macro::FastReturn"],
           :installed_modes => ["ProconBypassMan::Splatoon2::Mode::Guruguru"],
           :layers=>
           {:up=>
            {:zr=>{:flip=>{:if_pressed=>[:zr], :force_neutral=>[:zl], enable: true}, open: true },
             :zl=>{:flip=>{:if_pressed=>[:y, :b, :zl], :force_neutral=>nil, enable: true}, open: true },
             :down=>{:flip=>{:if_pressed=>[:down], :force_neutral=>nil, enable: true}, open: true },
             :macro=> { "ProconBypassMan::Splatoon2::Macro::FastReturn" => [:y, :b, :down] },
             :l=>{:remap=>{:to=>[:zr]}, open: true } },

            :right=>{:mode=> { "ProconBypassMan::Splatoon2::Mode::Guruguru" => true } },

            :left=>{:mode=> { "ProconBypassMan::Splatoon2::Mode::Guruguru" => true } },

            :down=>{:zl=>{:flip=>{ enable: true}, open: true }}}}
        )
      end
    end
  end
end
