require_relative "web/version"
require "logger"
require "procon_bypass_man/web/configuration"
require "procon_bypass_man/web/server"
require "procon_bypass_man/web/db"
require "procon_bypass_man/web/models/setting"
require "procon_bypass_man/web/setting_parser.rb"

module ProconBypassMan
  module Web
    class Error < StandardError; end

    def self.configure(&block)
      @@configuration = ProconBypassMan::Web::Configuration.new
      @@configuration.instance_eval(&block)
      @@configuration
    end

    def self.config
      @@configuration ||= ProconBypassMan::Web::Configuration.new
    end

    # @return [Logger]
    def self.logger
      config.logger
    end

    def self.root
      config.root
    end

    def self.gem_root
      File.expand_path('../..', __dir__).freeze
    end
  end
end
