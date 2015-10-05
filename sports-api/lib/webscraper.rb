class Webscraper
   require 'open-uri'
   require 'open_uri_redirections'

   def google_search(query)
      agent = Mechanize.new
      page = agent.get('http://www.google.com/')

      google_form = page.form('f')
      google_form.q = query

      page = agent.submit(google_form, google_form.buttons.first)

      page.links.each do |link|
          if link.href.to_s =~/url.q/
              puts "link: #{link}"
              str=link.href.to_s
              puts "str: #{str}"
              strList=str.split(%r{=|&})
              puts "strList: #{strList}"
              url=strList[1]
              puts "url: #{url}"
              return url
          end
      end
   end
end

