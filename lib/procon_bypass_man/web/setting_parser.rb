require "json"
require "procon_bypass_man/web/setting_parser/top_level_layer"
require "procon_bypass_man/web/setting_parser/layer"

# pluginの定数を握りつぶす
class Module
  def const_missing(id)
    raise(NameError, "uninitialized constant #{id}") unless self.name =~ /^ProconBypassMan/
    eval "module #{self.name}::#{id}; end", Object::TOPLEVEL_BINDING
    eval "#{self.name}::#{id}"
  end
end

# PBM 0.1.8バージョンの構文に対応
module ProconBypassMan
  module Web
    class SettingParser
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
        @parser = TopLevelLayer.new
        @parser.instance_eval(text)
      end
    end
  end
end
