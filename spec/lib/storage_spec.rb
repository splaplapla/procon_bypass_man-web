require "spec_helper"

describe ProconBypassMan::Web::Storage do
  describe '#pbm_dir_path' do
    it do
      ProconBypassMan::Web::Storage.instance.pbm_dir_path
    end
  end

  describe '#pbm_setting_path' do
    it do
      ProconBypassMan::Web::Storage.instance.pbm_setting_path
    end
  end
end
