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
    context 'settingのyamlが存在しないとき' do
      let(:setting_path) { "#{ProconBypassMan::Web.root}/tmp/nothing.yml" }
      before do
        FileUtils.rm_rf(setting_path)
        ProconBypassMan::Web::Storage.instance.setting_path = setting_path
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
      let(:setting_path) { "#{ProconBypassMan::Web.root}/tmp/tmp_setting.yml" }
      let(:yaml) do
        yaml = <<~EOH
        setting: |-
          1
        EOH
      end
      before do
        File.write(setting_path, yaml)
        ProconBypassMan::Web::Storage.instance.setting_path = setting_path
      end
      it do
        response = get "/api/pbm_setting"
        expect(response).to be_ok
        json = JSON.parse(response.body)
        expect(json["result"]).to eq("ok")
      end
    end
  end

  describe 'POST /api/pbm_setting' do
    context 'request settingのyamlがシンタックスエラーのとき' do
    end
    context 'settingのyamlが存在しないとき' do
      let(:setting_path) { "#{ProconBypassMan::Web.root}/tmp/nothing.yml" }
      before do
        FileUtils.rm_rf(setting_path)
        ProconBypassMan::Web::Storage.instance.setting_path = setting_path
      end
      it do
        expected_yaml = <<~EOH
          setting: |-
            2
        EOH
        response = post "/api/pbm_setting", { setting_yaml: expected_yaml }.to_json, { 'CONTENT_TYPE' => 'application/json'}
        json = JSON.parse(response.body)
        expect(json).to eq("result"=>"bad", "message"=>"setting path is not found")
      end
    end
    context 'settingにyamlが存在するとき' do
      let(:setting_path) { "#{ProconBypassMan::Web.root}/tmp/tmp_setting.yml" }
      let(:yaml) do
        yaml = <<~EOH
        setting: |-
          1
        EOH
      end
      before do
        File.write(setting_path, yaml)
        ProconBypassMan::Web::Storage.instance.setting_path = setting_path
      end
      it do
        expected_yaml = <<~EOH
          setting: |-
            2
        EOH
        response = post "/api/pbm_setting", { setting_yaml: expected_yaml }.to_json, { 'CONTENT_TYPE' => 'application/json'}
        json = JSON.parse(response.body)
        expect(response).to be_ok
        expect(json["result"]).to eq("ok")
        expect(File.read(setting_path)).to eq(expected_yaml)
      end
    end
  end

  describe '/api/pbm_setting_digest' do
    context 'digestファイルが存在するとき' do
      let(:path) { "#{ProconBypassMan::Web.root}/tmp/.digest" }
      before do
        ProconBypassMan::Web::Storage.instance.root_path = path
        File.write(path, nil)
      end
      it do
        response = get "/api/pbm_setting_digest"
        expect(response).to be_ok
      end
    end
    context 'digestファイルが存在しないとき' do
      let(:path) { "#{ProconBypassMan::Web.root}/tmp/nothing.yml" }
      before do
        ProconBypassMan::Web::Storage.instance.root_path = path
        FileUtils.rm_rf(path)
      end
      it do
        response = get "/api/pbm_setting_digest"
        expect(response).to be_not_found
      end
    end
  end
end
