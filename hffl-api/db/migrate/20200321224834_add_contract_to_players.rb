class AddContractToPlayers < ActiveRecord::Migration[6.0]
  def change
    add_column :players, :contract, :string
  end
end
