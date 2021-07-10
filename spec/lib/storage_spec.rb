require "spec_helper"

describe ProconBypassMan::Web::Storage do
  describe '#root_path=, #root_path' do
    before do
      ProconBypassMan::Web::Db.recreate!
      ProconBypassMan::Web::Db.migrate_if_pending_migration
    end
    it do
      ProconBypassMan::Web::Storage.instance.root_path = "/tmp"
      expect(ProconBypassMan::Web::Storage.instance.root_path).to eq("/tmp")
    end
  end

  describe '#setting_path=, #setting_path' do
    before do
      ProconBypassMan::Web::Db.recreate!
      ProconBypassMan::Web::Db.migrate_if_pending_migration
    end
    it do
      ProconBypassMan::Web::Storage.instance.setting_path = "/tmp2"
      expect(ProconBypassMan::Web::Storage.instance.setting_path).to eq("/tmp2")
    end
  end
end
