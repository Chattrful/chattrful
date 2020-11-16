class CreateParticipants < ActiveRecord::Migration[6.0]
  def change
    create_table :participants do |t|
      t.belongs_to :conversation, foreign_key: true
      t.bigint :participant_id
      t.string :participant_type

      t.timestamps
    end

    add_index :participants, :participant_id
    add_index :participants, :participant_type
  end
end
