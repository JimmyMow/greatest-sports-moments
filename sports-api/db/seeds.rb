# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
puts "Destroying all moments"
Moment.destroy_all
puts "Moments destroyed"

ytids = ["ZkfPYw7CK10", "VDTKfhGYwrU", "mfebpLfAt8g", "awAq_7S08o0", "gCb9FcHBIYE", "_vKDygyOxH0", "vyL0FxS-F6E", "4fW3tX-UinQ", "ADvWhMnDgEE", "riMTb36G84A", "UT0r8wBL4QU", "4CR9kKGeE5Q", "U157X0jy5iw", "gUK9lG-7HTc", "GMuUBZ_DAeM", "qYscemhnf88", "XMrPjl-927Q", "1f20D9HRiDE", "cvGfV6qCiOI", "_Z-QfDiV2XA", "b7eZmKWW9s4", "xbdddwVP7X4", "nLhTCwor1YQ", "QEhNDUwksvU", "4SbJ4Xf-t5E", "PRkeahelZHM"]

ytids.each do |ytid|
   url = "https://www.youtube.com/watch?v=#{ytid}"
   puts "Creating moment: #{ytid}..."
   Moment.create(ytid: url)
   puts "#{ytid} created"
end
