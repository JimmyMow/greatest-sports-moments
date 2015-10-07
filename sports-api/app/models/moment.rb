class Moment < ActiveRecord::Base
   require 'wikipedia'

   validates :ytid, presence: true, length: {is: 11}, allow_blank: false, uniqueness: true
   before_validation(on: :create) do
      # Find YouTube video ID
      query = Rack::Utils.parse_query URI(ytid).query if attribute_present?("ytid")
      if query['v']
         self.ytid = query['v']
      else
         errors.add(:ytid,'not a valid youtube link')
         raise "Unable to find video."
      end

      # Find YouTube video title
      youtube = Youtube.new(self.ytid)
      video = youtube.video
      self.title = video['items'][0]['snippet']['title']
      puts "title: #{title}"

      # Search google for relevant wiki page
      query = self.title + " site:wikipedia.org"
      puts "query: #{query}"
      webscraper = Webscraper.new
      wiki_url = webscraper.google_search(query)
      puts "wiki url: #{wiki_url}"
      puts "#{wiki_url.split('/')[-1]}"
      wiki_title = URI.unescape(wiki_url.split('/')[-1])

      puts "wiki title: #{wiki_title}"
      puts "wiki: #{wiki}"

      # Get first paragraph from wiki page
      page = Wikipedia.find( wiki_title )
      self.wiki = page.fullurl
      self.description = page.text.split( /\r?\n/ ).first
   end

end
