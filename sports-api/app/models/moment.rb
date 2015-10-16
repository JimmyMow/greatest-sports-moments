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

      # Search google for relevant wiki page
      query = self.title + " site:wikipedia.org"
      webscraper = Webscraper.new
      wiki_url = webscraper.google_search(query)
      moment_title = self.title
      # If the original query doesn't work this while loop will trim it down until it gets results
      while wiki_url.kind_of?(Array)
         moment_title = moment_title.split(' ')
         moment_title.pop
         moment_title = moment_title.join(' ')
         moment_query = moment_title + " site:wikipedia.org"
         wiki_url = webscraper.google_search(moment_query)
      end

      wiki_title = URI.unescape(wiki_url.split('/')[-1])

      # Get first paragraph from wiki page
      page = Wikipedia.find( wiki_title )
      self.wiki = page.fullurl
      self.description = page.text.split( /\r?\n/ ).first
   end

end
