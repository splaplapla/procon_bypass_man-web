require "json"

module ProconBypassMan
  module Web
    class SettingParser
      class Core
        class Layer
          def flip(button, if_pressed: nil, force_neutral: nil)
          end

          def remap(button, to: button)
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
