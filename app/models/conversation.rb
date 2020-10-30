class Conversation < ApplicationRecord
  belongs_to :account
  has_many :messages, -> { order(created_at: :desc) }, dependent: :destroy

  belongs_to :starter, polymorphic: true
  belongs_to :last_message_sender, polymorphic: true

  scope :latest, -> do
    where.not(last_message_received_at: nil)
      .order(last_message_received_at: :desc)
  end

  before_create :assign_uuid

  private

  def assign_uuid
    self.uuid = SecureRandom.uuid
  end
end
