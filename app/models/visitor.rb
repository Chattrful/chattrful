class Visitor < ApplicationRecord
  has_many :messages, as: :sender
end
