class Visitor < ApplicationRecord
  DEFAULT_TIME_ZONE = "Etc/UTC"

  has_many :messages, as: :sender

  def identifier
    Digest::SHA256.hexdigest("#{Message::SALT}Visitor#{id}")
  end

  def name
    email || "Unknown visitor ##{id}"
  end
end
