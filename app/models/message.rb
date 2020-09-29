class Message < ApplicationRecord
  belongs_to :sender, polymorphic: true
  belongs_to :conversation

  validates :content, presence: true

  after_commit :broadcast_message

  private

  def broadcast_message
    ActionCable.server.broadcast "conversation_channel_#{conversation.id}", message: content
  end
end
