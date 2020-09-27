class Conversation < ApplicationRecord
  belongs_to :account
  has_many :messages
end
