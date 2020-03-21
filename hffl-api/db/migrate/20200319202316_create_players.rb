class CreatePlayers < ActiveRecord::Migration[6.0]
  def change
    create_table :players do |t|
      t.string :name
      t.string :nfl_team
      t.string :salary
      t.references :franchise, null: false, foreign_key: true

      t.timestamps
    end
  end
end
