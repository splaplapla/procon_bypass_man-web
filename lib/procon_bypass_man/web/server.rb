require 'sinatra'
require 'webrick'

module ProconBypassMan
  module Web
    class App < Sinatra::Base
      get '/' do
        'Fly me to the Moon!'
      end
    end

    class Server
      def self.start
        App.run! host: 'localhost', port: 9090
      end
    end
  end
end
