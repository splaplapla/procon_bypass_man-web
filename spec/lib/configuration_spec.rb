require "spec_helper"

describe ProconBypassMan::Web::Configuration do
  describe '.configure' do
    it do
      ProconBypassMan::Web.configure do |config|
        config.root = File.expand_path('../..', __dir__).freeze
        config.logger = Logger.new("#{ProconBypassMan::Web.root}/web.log", 1, 1024 * 1024 * 10)
      end
      expect(ProconBypassMan::Web.config.root).to eq("/Users/koji/src/procon_bypass_man-web")
      expect(ProconBypassMan::Web.config.logger).to eq(ProconBypassMan::Web.logger)
      expect(ProconBypassMan::Web.logger).to be_a(Logger)
    end
  end
end

