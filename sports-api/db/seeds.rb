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

ytids = ["ZkfPYw7CK10", "awAq_7S08o0", "VDTKfhGYwrU"]

ytids.each do |ytid|
   puts "Creating moment: #{ytid}"
   Moment.create(ytid: ytid)
   puts "#{ytid} created"
end
