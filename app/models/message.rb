class Message < ApplicationRecord
  belongs_to :participant
  belongs_to :conversation
end
