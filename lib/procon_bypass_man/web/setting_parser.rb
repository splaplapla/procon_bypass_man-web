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
          def initialize(mode: )
            @table = {
              mode: mode&.to_s,
            }.compact
          end

          def flip(button, if_pressed: nil, force_neutral: nil)
            @table[:flip] ||= {}
            if if_pressed.nil? && force_neutral.nil?
              @table[:flip][button] = nil
            else
              if if_pressed
                if if_pressed.is_a?(Array)
                  ifp = if_pressed
                else
                  ifp = [if_pressed]
                end
              end
              if force_neutral
                if force_neutral.is_a?(Array)
                  fn = force_neutral
                else
                  fn = [force_neutral]
                end
              end
              @table[:flip][button] = { if_pressed: ifp, force_neutral: fn, enable: true }
            end
            self
          end

          def remap(button, to: nil)
            case to
            when Array
              @table[:remap] ||= {}
              @table[:remap][button] = { to: to }
            when String, Symbol
              @table[:remap] ||= {}
              @table[:remap][button] = { to: [to] }
            end

            self
          end

          def macro(name, if_pressed: nil)
            @table[:macro] ||= {}
            if if_pressed.nil?
              @table[:macro][name.to_s] = { if_pressed: [] }
            else
              @table[:macro][name.to_s] = { if_pressed: if_pressed }
            end
            self
          end

          def to_hash
            @table
          end
        end

        def install_macro_plugin(name)
          @installed_plugin[:macros] << name.to_s
        end

        def install_mode_plugin(name)
          @installed_plugin[:modes] << name.to_s
        end

        def initialize
          @installed_plugin = { macros: [], modes: [] }
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
          if(mode == :manual || mode == 'manual')
            mode = nil
          end

          if block_given?
            @layers[dir] = Layer.new(mode: mode).instance_eval(&block) || Layer.new(mode: mode)
          else
            @layers[dir] = Layer.new(mode: mode)
          end
        end

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

      def self.parse(text)
        new(text)
      end

      def self.parse_file(path)
        new(
          YAML.load_file(path)&.dig("setting")
        )
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
