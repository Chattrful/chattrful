class Conversation < ApplicationRecord
  belongs_to :account
  has_many :messages, -> { order(created_at: :desc) }, dependent: :destroy
  has_many :participants, -> { order(created_at: :asc) }
  belongs_to :last_message, class_name: "Message", foreign_key: "last_message_id"

  enum conversation_type: [:visitor_conversation, :team]

  scope :latest, -> do
    where.not(last_message_received_at: nil)
      .order(last_message_received_at: :desc)
  end

  before_create :assign_uuid

  def create_participant(sender:)
    return if participants.where(sender: sender).exists?

    participants.create(sender: sender)
  end

  def starter
    case conversation_type
    when "visitor_conversation"
      participants.find { |participant| participant.sender_type == "Visitor" }
    end
  end

  private

  def assign_uuid
    self.uuid = SecureRandom.uuid
  end
end
