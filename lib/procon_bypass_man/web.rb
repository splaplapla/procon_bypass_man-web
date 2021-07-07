require_relative "web/version"
require "procon_bypass_man/web/server"

module ProconBypassMan
  module Web
    class Error < StandardError; end

    def self.root
      File.expand_path('../..', File.dirname(__FILE__))
    end

    def self.connect_db
      @@db ||= SQLite3::Database.new "pbm_web.db"
    end

    connect_db
  end
end
