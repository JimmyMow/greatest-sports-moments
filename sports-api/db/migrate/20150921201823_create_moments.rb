class CreateMoments < ActiveRecord::Migration
  def change
    create_table :moments do |t|
      t.string :ytid
      t.string :title
      t.text :description
      t.string :wiki

      t.timestamps null: false
    end
  end
end
