module ProconBypassMan
  module Web
    class Configuration
      # @return [Logger]
      def logger
        if defined?(@logger) && @logger.is_a?(Logger)
          @logger
        else
          Logger.new(nil)
        end
      end

      def logger=(logger)
        @logger = logger
      end

      def root
        if defined?(@root)
          @root
        else
          File.expand_path('../..', __dir__).freeze
        end
      end

      def root=(path)
        @root = path
      end

      def db_path
        ENV["DB_PATH"] ||= File.join(root, "pbm_web.db")
      end
    end
  end
end
