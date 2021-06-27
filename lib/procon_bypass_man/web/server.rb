require 'sinatra'
require 'sinatra/reloader'
require 'webrick'
require "procon_bypass_man/web/storage"

require "pry"
module ProconBypassMan
  module Web
    class App < Sinatra::Base
      register Sinatra::Reloader

      get '/' do
        "do not serve html"
      end

      get '/api/pbm_dir_path' do
        ProconBypassMan::Web::Storage.instance.pbm_dir_path
      end

      get '/api/pbm_setting_path' do
        "/setting_path/to"
      end

      post '/api/pbm_dir_path' do
        params = JSON.parse(request.body.read)
        ProconBypassMan::Web::Storage.instance.pbm_dir_path = params["dir_path"]
        :ok
      end

      get '/api/pbm_stats' do
        # TODO
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
