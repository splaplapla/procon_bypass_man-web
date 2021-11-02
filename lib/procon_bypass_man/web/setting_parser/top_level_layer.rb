module ProconBypassMan
  module Web
    class SettingParser
      class TopLevelLayer
        module Serializer
          def to_hash
            h = { prefix_keys_for_changing_layer: prefix_keys_for_changing_layer || [] }
            h[:layers] ||= {}
            @layers.each do |key, layer|
              h[:layers][key] = layer&.to_hash
            end
            h
          end

          def to_hash_group_by_button
            h = { prefix_keys_for_changing_layer: prefix_keys_for_changing_layer || [] }
            h[:layers] ||= {}
            @layers.each do |key, layer|
              h[:layers][key] ||= {}
              next if layer.nil?

              if !@installed_plugin[:macros].empty?
                h[:installed_macros] = @installed_plugin[:macros]
              end
              if !@installed_plugin[:modes].empty?
                h[:installed_modes] = @installed_plugin[:modes]
              end

              layer.to_hash.dig(:flip)&.each do |button, value|
                h[:layers][key][button] ||= {}
                h[:layers][key][button][:open] = true
                h[:layers][key][button][:flip] ||= {}
                h[:layers][key][button][:flip][:enable] = true
                if value
                  h[:layers][key][button][:flip].merge!(value)
                end
              end

              if layer.to_hash.dig(:macro)
                h[:layers][key][:macro] = []
                if(macros = layer.to_hash.dig(:macro))
                  macros.transform_values! { |x| x[:if_pressed] }
                  h[:layers][key][:macro] = macros
                end
              end

              if layer.to_hash.dig(:mode)
                h[:layers][key][:mode] = { layer.to_hash.dig(:mode) => true }
              end

              layer.to_hash.dig(:remap)&.each do |button, value|
                h[:layers][key][button] ||= {}
                h[:layers][key][button][:remap] ||= {}
                h[:layers][key][button][:open] = true
                if value
                  h[:layers][key][button][:remap].merge!(value)
                end
              end
            end
            h
          end
        end

        module Syntax
          def initialize
            @installed_plugin = { macros: [], modes: [] }
            @layers = {}
          end

          def install_macro_plugin(name)
            @installed_plugin[:macros] << name.to_s
          end

          def install_mode_plugin(name)
            @installed_plugin[:modes] << name.to_s
          end

          def prefix_keys_for_changing_layer(value=nil)
            if value
              @prefix_keys_for_changing_layer = value
            else
              @prefix_keys_for_changing_layer
            end
          end

          def layer(dir, mode: nil, &block)
            if(mode == :manual || mode == 'manual')
              mode = nil
            end

            if block_given?
              @layers[dir] = Layer.new(mode: mode).instance_eval(&block) || Layer.new(mode: mode)
            else
              @layers[dir] = Layer.new(mode: mode)
            end
          end

          def method_missing(name, *_args)
            ProconBypassMan::Web.logger.info("unknown toplevel DSL #{name}")
            self
          end
        end

        include Syntax
        include Serializer
      end
    end
  end
end
