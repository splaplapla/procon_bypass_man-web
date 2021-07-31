module ProconBypassMan
  module Web
    class BaseModel
      def initialize(row)
        @@column_names.each.with_index(0) do |name, index|
          self.public_send("#{name}=", row[index])
        end
      end

      # @return [Numric]
      def self.count
        db.execute("select count(*) from #{table_name}").first.first
      end

      def self.db
        ProconBypassMan::Web::Db.db
      end

      def self.column_names=(c)
        @@column_names = c
      end

      def self.column_names
        raise "need to define column_names" if not defined?(@@column_names)
       @@column_names
      end

      def self.table_name
        raise "need to define column_names" if not defined?(@@table_name)
        @@table_name
      end

      def self.table_name=(value)
        @@table_name = value
      end

      def table_name
        self.class.table_name
      end

      def update!(attributes)
        c = attributes.map {|key, _value| "'#{key}' = ?"  }.join(", ")
        self.class.db.execute("update #{table_name} set #{c}", attributes.map {|_key, value| value })
      end
    end
  end
end
