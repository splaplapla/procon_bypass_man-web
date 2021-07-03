module ProconBypassMan
  module Web
    class Storage
      def self.instance
        @instance ||= new
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
