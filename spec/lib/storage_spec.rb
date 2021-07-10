require "spec_helper"

describe ProconBypassMan::Web::Storage do
  describe '.migrate_if_pending_migration' do
    before do
      ProconBypassMan::Web::Db.recreate!
    end
    it do
      expect {
        ProconBypassMan::Web::Db.db.execute("select * from users")
      }.to raise_error(SQLite3::SQLException, "no such table: users")
      ProconBypassMan::Web::Db.migrate_if_pending_migration(migrations_path: "spec/lib/migration/*.sql")
      expect(ProconBypassMan::Web::Db.db.execute("select * from schema_migrations").size).to eq(1)
      expect(ProconBypassMan::Web::Db.db.execute("select * from users").size).to eq(0)
    end
  end

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
end
