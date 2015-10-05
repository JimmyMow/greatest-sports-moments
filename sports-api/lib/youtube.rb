require 'httparty'

class Youtube
   include HTTParty
   default_options.update(verify: false)
   base_uri "https://www.googleapis.com/youtube/v3/videos"

   def initialize(id)
      @options = { query: {id: id} }
   end

   def video
      self.class.get("?part=snippet&key=AIzaSyDq6nOYI9J_AJrz4Xo9yT8teETe7KEhbjY", @options)
   end
end
