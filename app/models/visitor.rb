class Visitor < ApplicationRecord
  has_many :messages, as: :sender

  def identifier
    Digest::SHA256.hexdigest("#{Message::SALT}Visitor#{id}")
  end
end
