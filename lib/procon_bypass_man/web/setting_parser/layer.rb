module ProconBypassMan
  module Web
    class SettingParser
      class Layer
        module Syntax
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

          def method_missing(name, *_args)
            ProconBypassMan::Web.logger.info("unknown layer DSL #{name}")
            self
          end
        end
        include Syntax

        def to_hash
          @table
        end
      end
    end
  end
end
