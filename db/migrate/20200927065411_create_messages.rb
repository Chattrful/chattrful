class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.belongs_to :participant, foreign_key: true
      t.belongs_to :conversation, foreign_key: true
      t.text :body

      t.timestamps
    end
  end
end
