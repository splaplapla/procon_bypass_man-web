require 'sinatra'
require 'webrick'

module ProconBypassMan
  module Web
    class App < Sinatra::Base
      get '/' do
        "do not serve html"
      end

      get '/pbm_dir_path' do
        "/dir_path/to"
      end
      get '/pbm_setting_path' do
        "/setting_path/to"
      end
      post '/pbm_dir_path' do
        # TODO
      end

      get '/pbm_stats' do
        # TODO
      end

      post '/pbm_stop' do
        # TODO
      end

      post '/pbm_start' do
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
