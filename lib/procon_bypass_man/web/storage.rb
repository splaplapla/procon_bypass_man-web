module ProconBypassMan
  module Web
    class Storage
      def self.db
        @@db ||= SQLite3::Database.new "pbm_web.db"
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

      def pbm_dir_path
        read(:pbm_dir_path)
      end

      def pbm_dir_path=(value)
        write(:pbm_dir_path, value)
      end

      def pbm_setting_path
        read(:pbm_setting_path)
      end

      def pbm_setting_path=(value)
        write(:pbm_setting_path, value)
      end

      private

      def read(key)
        data = Marshal.load(File.binread(file_path))
        data[key]
      end

      # @return [void]
      def write(key, value)
        data = Marshal.load(File.binread(file_path))
        data[key] = value
        File.binwrite "#{ProconBypassMan.root}/metadata", Marshal.dump(data)
        puts "#{key}に#{value}を書き込みました"
      end

      # @return [String]
      def file_path
        path = "#{ProconBypassMan.root}/metadata"
        File.open(path)
        path
      rescue Errno::ENOENT
        File.binwrite(path, Marshal.dump({}))
        retry
      end
    end
  end
end
