require "spec_helper"
require 'rack/test'

describe ProconBypassMan::Web::App do
  include Rack::Test::Methods

  def app
    # Sinatra::Application
    ProconBypassMan::Web::App
  end

  describe 'GET /' do
    it do
      response = get "/"
      expect(response).to be_ok
      expect(response.body).to include("PBM Web")
    end
  end

  describe 'GET /anything' do
    it do
      response = get "/anything"
      expect(response).to be_ok
      expect(response.body).to include("PBM Web")
    end
  end

  describe 'GET /api/pbm_setting' do
    context 'settingのyamlがシンタックスエラーのとき' do
      let(:yaml) do
        yaml = <<~EOH
          a: \n3
        EOH
      end
      before do
        path = "./tmp/tmp_setting.yml"
        File.write(path, yaml)
        ProconBypassMan::Web::Storage.instance.setting_path = path
      end
      it do
        response = get "/api/pbm_setting"
        expect(response).to be_ok
        json = JSON.parse(response.body)
        expect(json["result"]).to eq("bad")
        expect(json["message"]).to eq("bad format yaml")
      end
    end
    context 'settingにyamlが存在しないとき' do
      before do
        path = "./tmp/nothing.yml"
        ProconBypassMan::Web::Storage.instance.setting_path = path
      end
      it do
        response = get "/api/pbm_setting"
        expect(response).to be_ok
        json = JSON.parse(response.body)
        expect(json["result"]).to eq("bad")
        expect(json["message"]).to eq("not found setting")
      end
    end
    context 'settingにyamlが存在するとき' do
      let(:yaml) do
        yaml = <<~EOH
        setting: |-
          1
        EOH
      end
      before do
        path = "./tmp/tmp_setting.yml"
        File.write(path, yaml)
        ProconBypassMan::Web::Storage.instance.setting_path = path
      end
      it do
        response = get "/api/pbm_setting"
        expect(response).to be_ok
        json = JSON.parse(response.body)
        expect(json["result"]).to eq("ok")
      end
    end
  end
end
