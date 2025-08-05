# 404 Page Handler Plugin
# This ensures 404 pages work properly in development

Jekyll::Hooks.register :site, :post_write do |site|
  # Copy 404.html to various locations for better coverage
  source = File.join(site.dest, '404.html')
  if File.exist?(source)
    # Create 404 pages in subdirectories
    site.collections.each do |name, collection|
      dest_dir = File.join(site.dest, name)
      if Dir.exist?(dest_dir)
        FileUtils.cp(source, File.join(dest_dir, '404.html'))
      end
    end
  end
end