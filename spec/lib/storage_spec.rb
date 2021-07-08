require "spec_helper"

describe ProconBypassMan::Web::Storage do
  describe '.migrate_if_pending_migration' do
    before do
      # TODO envで指定できるようにする
      FileUtils.rm_rf "pbm_web.db"
    end
    it do
      ProconBypassMan::Web::Storage.migrate_if_pending_migration(migrations_path: "spec/lib/migration/*.sql")
      expect(ProconBypassMan::Web::Storage.db.execute("select * from schema_migrations").size).to eq(1)
      expect(ProconBypassMan::Web::Storage.db.execute("select * from  users").size).to eq(0)
    end
  end

  describe '#pbm_dir_path' do
    xit do
      ProconBypassMan::Web::Storage.instance.pbm_dir_path
    end
  end

  describe '#pbm_setting_path' do
    xit do
      ProconBypassMan::Web::Storage.instance.pbm_setting_path
    end
  end
end
