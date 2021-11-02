require "procon_bypass_man/web/models/base_model"

module ProconBypassMan
  module Web
    class Setting < BaseModel
      self.column_names = %w(root_path setting_path)
      self.table_name = :settings

      attr_accessor(*column_names)

      def self.find_or_create(*)
        rows = db.execute("select * from #{table_name}")
        if rows.size.zero?
          db.execute("insert into #{table_name} (#{column_names.join(", ")}) values (?, ?)", ['', ''])
          return new(['', ''])
        else
          return new(rows.first)
        end
      end
    end
  end
end
