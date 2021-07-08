require "procon_bypass_man/web/models/base_model"

module ProconBypassMan
  module Web
    class Setting < BaseModel
      TABLE_NAME = :settings
      COLUMN_NAMES = %w(
        root_path
        setting_path
      )

      attr_accessor *COLUMN_NAMES

      def initialize(row)
        COLUMN_NAMES.each.with_index(0) do |name, index|
          self.public_send("#{name}=", row[index])
        end
      end

      def self.find_or_create_by(*)
        rows = db.execute("select * from #{TABLE_NAME}")
        if rows.size.zero?
          db.execute("insert into #{TABLE_NAME} (#{COLUMN_NAMES.join(", ")}) values (?, ?)", ['', ''])
          return new(['', ''])
        else
          return new(rows.first)
        end
      end

      # @return [Numric]
      def self.count
        db.execute("select count(*) from #{TABLE_NAME}").first.first
      end

      def self.db
        ProconBypassMan::Web::Db.db
      end
    end
  end
end
