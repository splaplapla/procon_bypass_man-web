module ProconBypassMan
  module Web
    class Db
      def self.db
        # TODO connection cache
        SQLite3::Database.new(ProconBypassMan::Web.config[:db_path])
      end

      def self.recreate!
        FileUtils.rm_rf(ProconBypassMan::Web.config[:db_path])
        SQLite3::Database.new(ProconBypassMan::Web.config[:db_path])
      end

      def self.migrate_if_pending_migration(migrations_path: File.join(ProconBypassMan::Web.root, 'lib', 'procon_bypass_man/web', 'migration', "/*.sql"))
        db.execute <<~SQL
          create table if not exists "schema_migrations" ("version" varchar not null primary key)
        SQL

        Dir.glob(migrations_path).each do |path|
          if /^(\d+)_[\w.]+$/ =~ Pathname.new(path).basename.to_s
            version = $1
            rows = db.execute("select * from schema_migrations where version = ?", version)
            if rows.size == 0
              sql = File.read(path)
              db.execute(sql)
              db.execute("insert into schema_migrations (version) values (?)", [version])
            end
          end
        end
      end
    end
  end
end
