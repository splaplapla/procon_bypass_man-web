module ProconBypassMan
  module Web
    class Storage
      def self.instance
        new
      end

      def root_path
        ProconBypassMan::Web::Setting.find_or_create&.root_path
      end

      def root_path=(value)
        ProconBypassMan::Web::Setting.find_or_create&.update!(root_path: value)
      end

      def setting_path
        ProconBypassMan::Web::Setting.find_or_create&.setting_path
      end

      def setting_path=(value)
        ProconBypassMan::Web::Setting.find_or_create&.update!(setting_path: value)
      end
    end
  end
end
