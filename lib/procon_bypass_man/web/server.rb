require 'sinatra'
require 'webrick'
require 'sqlite3'
begin
  require 'sinatra/reloader'
  require "pry"
rescue LoadError
  ProconBypassMan.logger.debug("sinatra/reloaderのrequireに失敗しました")
end

require "procon_bypass_man"
require "procon_bypass_man/web/storage"

module ProconBypassMan
  module Web
    class App < Sinatra::Base
      register Sinatra::Reloader if defined?(Sinatra::Reloader)
      set :bind, '0.0.0.0'

      get '/api/pbm_root_path' do
        { root_path: ProconBypassMan::Web::Storage.instance.root_path,
          result: :ok,
        }.to_json
      end

      get '/api/pbm_setting_path' do
        { setting_path: ProconBypassMan::Web::Storage.instance.setting_path,
          result: :ok,
        }.to_json
      end

      post '/api/pbm_setting_path' do
        params = JSON.parse(request.body.read)
        ProconBypassMan::Web::Storage.instance.setting_path = params["setting_path"]
        { result: :ok }.to_json
      end

      post '/api/pbm_root_path' do
        params = JSON.parse(request.body.read)
        ProconBypassMan::Web::Storage.instance.root_path = params["root_path"]
        { result: :ok }.to_json
      end

      get '/api/pbm_stats' do
        begin
          pid = File.read("#{ProconBypassMan::Web::Storage.instance.root_path}/pbm_pid").chomp
          if /\A\d+\z/ =~ pid
            return { result: :ok, stats: "running", pid: pid }.to_json
          else
            return { result: :ok, stats: "stopped", pid: nil }.to_json
          end
        rescue Errno::ENOENT
          return { result: :error, stats: "stopped", pid: nil }.to_json
        end
      end

      post '/api/start_pbm' do
        if system "yes | systemctl start pbm.service"
          { result: :ok }.to_json
        else
          { result: :bad }.to_json
        end
      end

      post '/api/stop_pbm' do
        if system "yes | systemctl stop pbm.service"
          { result: :ok }.to_json
        else
          { result: :bad }.to_json
        end
      end

      get '/api/pbm_setting' do
        require "yaml"
        begin
          setting_path = ProconBypassMan::Web::Storage.instance.setting_path
          parsed_setting = ProconBypassMan::Web::SettingParser.parse_file(setting_path)
          { result: :ok,
            setting: parsed_setting.to_hash,
            setting_group_by_button: parsed_setting.to_hash_group_by_button,
          }.to_json
        rescue Psych::SyntaxError
          { result: :bad, message: "bad format yaml" }.to_json
        rescue Errno::ENOENT
          { result: :bad, message: "not found setting" }.to_json
        end
      end

      get '/' do
        send_file File.join(ProconBypassMan::Web.root, 'lib/procon_bypass_man/web', 'public', 'index.html')
      end

      # サーバでパスとして解釈されないように、全部 `/`として受け付けるため
      get '/:none' do
        send_file File.join(ProconBypassMan::Web.root, 'lib/procon_bypass_man/web', 'public', 'index.html')
      end
    end

    class Server
      def self.start
        ProconBypassMan::Web::Db.migrate_if_pending_migration
        App.run! port: 9090
      end
    end
  end
end
