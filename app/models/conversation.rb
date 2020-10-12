class Conversation < ApplicationRecord
  belongs_to :account
  has_many :messages, dependent: :destroy
  before_create :assign_uuid

  private

  def assign_uuid
    self.uuid = SecureRandom.uuid
  end
end
