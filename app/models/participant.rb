class Participant < ApplicationRecord
  belongs_to :conversation
  belongs_to :sender, polymorphic: true

  def name
    sender.name
  end
end
