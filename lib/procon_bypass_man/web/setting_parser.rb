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
          def flip(button, if_pressed: nil, force_neutral: nil)
          end

          def remap(button, to: button)
          end

          def macro(name, if_pressed: nil)
          end
        end

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
            @layers[dir] = Layer.new
          end
        end

        def to_hash
          { prefix_keys_for_changing_layer: prefix_keys_for_changing_layer,
          }
        end

        def install_macro_plugin(name)
        end

        def install_mode_plugin(name)
        end
      end

      def self.parse(text)
        new(text)
      end

      def to_hash
        @parser.to_hash
      end

      def initialize(text)
        @parser = Core.new
        @parser.instance_eval(text)
      end
    end
  end
end
