class RenameParticipantToSender < ActiveRecord::Migration[6.0]
  def change
    rename_column :participants, :participant_type, :sender_type
    rename_column :participants, :participant_id, :sender_id

    Conversation.all.each do |conversation|
      conversation.messages.each do |message|
        conversation.create_participant(sender: message.sender)
      end
    end
  end
end
