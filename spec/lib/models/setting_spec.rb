require "spec_helper"

describe ProconBypassMan::Web::Setting do
  describe '.find_or_create' do
    it do
      ProconBypassMan::Web::Db.recreate!
      ProconBypassMan::Web::Db.migrate_if_pending_migration
      expect(described_class.find_or_create).not_to be_nil
    end
  end

  describe "#update" do
    it do
      ProconBypassMan::Web::Setting.find_or_create.update!(root_path: "hoge")
      expect(ProconBypassMan::Web::Setting.find_or_create.root_path).to eq("hoge")
    end
    it do
      ProconBypassMan::Web::Setting.find_or_create.update!(root_path: "hoge", setting_path: "foo")
      expect(ProconBypassMan::Web::Setting.find_or_create.root_path).to eq("hoge")
      expect(ProconBypassMan::Web::Setting.find_or_create.setting_path).to eq("foo")
    end
  end
end
