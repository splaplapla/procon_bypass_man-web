require "spec_helper"

describe ProconBypassMan::Web::Setting do
  describe '.find_or_create_by' do
    it do
      ProconBypassMan::Web::Db.recreate!
      ProconBypassMan::Web::Db.migrate_if_pending_migration
      expect {
        described_class.find_or_create_by
      }.to change { described_class.count }.from(0).to(1)
    end
  end
end
