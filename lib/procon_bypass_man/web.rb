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

    extend ProconBypassMan::Web::Configuration::ClassAttributes

    def self.configure(&block)
      @@configuration = ProconBypassMan::Web::Configuration.new
      @@configuration.instance_eval(&block)
      @@configuration
    end

    def self.config
      @@configuration ||= ProconBypassMan::Web::Configuration.new
    end

    # @return [String]
    def self.gem_root
      File.expand_path('../..', __dir__).freeze
    end
  end
end
