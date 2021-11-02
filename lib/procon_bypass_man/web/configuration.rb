module ProconBypassMan
  module Web
    class Configuration
      module ClassAttributes
        # @return [Logger]
        def logger
          config.logger
        end

        # @return [String]
        def root
          config.root
        end
      end

      # @return [Logger]
      def logger
        @logger || Logger.new(nil)
      end

      def logger=(logger)
        @logger = logger
      end

      # @return [String]
      def root
        @root || File.expand_path('../..', __dir__).freeze
      end

      def root=(path)
        @root = path
      end

      # @return [String]
      def db_path
        @db_path ||= ENV["DB_PATH"] || File.join(root, "pbm_web.db")
      end
    end
  end
end
