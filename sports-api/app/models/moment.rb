class Moment < ActiveRecord::Base
   validates :ytid, presence: true, length: {is: 11}, allow_blank: false
   before_validation(on: :create) do
      self.ytid = Rack::Utils.parse_query URI(ytid).query if attribute_present?("ytid")
   end
end
