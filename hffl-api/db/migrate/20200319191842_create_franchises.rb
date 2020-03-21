class CreateFranchises < ActiveRecord::Migration[6.0]
  def change
    create_table :franchises do |t|
      t.string :nickname
      t.string :owners
      t.string :location

      t.timestamps
    end
  end
end
