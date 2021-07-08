module ProconBypassMan
  module Web
    class Db
      def self.recreate!
        FileUtils.rm_rf(ProconBypassMan::Web.config[:db_path])
        SQLite3::Database.new(ProconBypassMan::Web.config[:db_path])
      end
    end
  end
end
