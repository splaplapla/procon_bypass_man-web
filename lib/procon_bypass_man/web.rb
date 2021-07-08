require_relative "web/version"
require "procon_bypass_man/web/server"

module ProconBypassMan
  module Web
    class Error < StandardError; end

    def self.root
      File.expand_path('../..', File.dirname(__FILE__))
    end
  end
end
