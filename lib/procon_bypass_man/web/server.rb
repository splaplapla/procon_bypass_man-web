require 'sinatra'
require 'webrick'

module ProconBypassMan
  module Web
    class App < Sinatra::Base
      get '/pbm_path' do
        # TODO
      end
      post '/pbm_path' do
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
