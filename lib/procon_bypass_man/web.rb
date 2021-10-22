require_relative "web/version"
require "logger"
require "procon_bypass_man/web/server"
require "procon_bypass_man/web/db"
require "procon_bypass_man/web/models/setting"
require "procon_bypass_man/web/setting_parser.rb"

module ProconBypassMan
  module Web
    class Error < StandardError; end

    def self.root
      File.expand_path('../..', File.dirname(__FILE__))
    end

    def self.config
      { db_path: ENV["DB_PATH"] ||= File.join(root, "pbm_web.db"),
      }
    end

    def self.logger
      @@logger ||= ::Logger.new($stdout)
    end
  end
end
