require 'sinatra'
begin
  require 'sinatra/reloader'
rescue LoadError
end
require 'webrick'
require "procon_bypass_man/web/storage"

require "pry"
module ProconBypassMan
  module Web
    class App < Sinatra::Base
      register Sinatra::Reloader

      get '/' do
        send_file File.join(ProconBypassMan::Web.root, 'lib/procon_bypass_man/web', 'public', 'index.html')
      end

      get '/api/pbm_dir_path' do
        { dir_path: ProconBypassMan::Web::Storage.instance.pbm_dir_path,
          result: :ok,
        }.to_json
      end

      get '/api/pbm_setting_path' do
        { setting_path: ProconBypassMan::Web::Storage.instance.pbm_setting_path,
          result: :ok,
        }.to_json
      end

      post '/api/pbm_setting_path' do
        params = JSON.parse(request.body.read)
        ProconBypassMan::Web::Storage.instance.pbm_setting_path = params["setting_path"]
        { result: :ok }.to_json
      end

      post '/api/pbm_dir_path' do
        params = JSON.parse(request.body.read)
        ProconBypassMan::Web::Storage.instance.pbm_dir_path = params["dir_path"]
        { result: :ok }.to_json
      end

      get '/api/pbm_stats' do
        begin
          pid = File.read("#{ProconBypassMan::Web::Storage.instance.pbm_dir_path}/pbm_pid").chomp
          if /\A\d+\z/ =~ pid
            return { stats: "running" }.to_json
          else
            return { stats: "stopped" }.to_json
          end
        rescue Errno::ENOENT
          return { stats: "stopped" }.to_json
        end
      end

      post '/api/pbm_stop' do
        # TODO
      end

      post '/api/pbm_start' do
        # TODO
      end
    end

    class Server
      def self.start
        App.run! host: 'localhost', port: 9090
      end
    end
  end
end
