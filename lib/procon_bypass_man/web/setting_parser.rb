require "json"

# pluginの定数を握りつぶす
class Module
  def const_missing(id)
    raise(NameError, "uninitialized constant #{id}") unless self.name =~ /^ProconBypassMan/
    eval "module #{self.name}::#{id}; end", Object::TOPLEVEL_BINDING
    eval "#{self.name}::#{id}"
  end
end

module ProconBypassMan
  module Web
    class SettingParser
      class Core
        class Layer
          def initialize
            @table = {}
          end

          def flip(button, if_pressed: nil, force_neutral: nil)
            @table[:flip] ||= {}
            @table[:flip][button] = { if_pressed: if_pressed, force_neutral: force_neutral }
            self
          end

          def remap(button, to: nil)
            @table[:remap] ||= {}
            @table[:remap][button] = { to: to }
            self
          end

          def macro(name, if_pressed: nil)
            @table[:macro] ||= {}
            @table[:macro][name] = { if_pressed: if_pressed }
            self
          end

          def to_hash
            @table
          end
        end

        def install_macro_plugin(name); end
        def install_mode_plugin(name); end

        def initialize
          @layers = {}
        end

        def prefix_keys_for_changing_layer(value=nil)
          if value
            @prefix_keys_for_changing_layer = value
          else
            @prefix_keys_for_changing_layer
          end
        end

        def layer(dir, mode: nil, &block)
          if block_given?
            @layers[dir] = Layer.new.instance_eval(&block)
          else
            @layers[dir] = { mode: mode }.compact
          end
        end

        def to_hash
          h = { prefix_keys_for_changing_layer: prefix_keys_for_changing_layer,
          }
          h[:layers] ||= {}
          @layers.each do |key, layer|
            h[:layers][key] = layer&.to_hash
          end
          h
        end

        def to_hash_group_by_button
          h = { prefix_keys_for_changing_layer: prefix_keys_for_changing_layer }
          h[:layers] ||= {}
          @layers.each do |key, layer|
            h[:layers][key] ||= {}
            layer&.to_hash&.dig(:flip)&.each do |button, value|
              h[:layers][key][:flip] ||= {}
              h[:layers][key][:flip][button] ||= {}
              h[:layers][key][:flip][button].merge!(value)
            end
            if layer&.to_hash&.dig(:mode)
              h[:layers][key][:mode] = layer&.to_hash&.dig(:mode)
            end
            layer&.to_hash&.dig(:remap)&.each do |button, value|
              h[:layers][key][:remap] ||= {}
              h[:layers][key][:remap][button] ||= {}
              h[:layers][key][:remap][button].merge!(value)
            end
          end
          h
        end
      end

      def self.parse(text)
        new(text)
      end

      def to_hash
        @parser.to_hash
      end

      def to_hash_group_by_button
        @parser.to_hash_group_by_button
      end

      def initialize(text)
        @parser = Core.new
        @parser.instance_eval(text)
      end
    end
  end
end
