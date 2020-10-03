class Conversation < ApplicationRecord
  belongs_to :account
  has_many :messages, dependent: :destroy

  KEY = ActiveSupport::KeyGenerator.new(
    Rails.application.secrets.secret_key_base
  ).generate_key(
    Rails.application.secrets.secret_key_base,
    ActiveSupport::MessageEncryptor.key_len
  ).freeze

  def self.encryptor
    ActiveSupport::MessageEncryptor.new(KEY) # => #<ActiveSupport::MessageEncryptor ...>
  end

  def self.decrypt_conversation_id(encrypted_conversation_id)
    encryptor.decrypt_and_verify(encrypted_conversation_id)
  end

  def encrypted_id
    Conversation.encryptor.encrypt_and_sign(id)
  end
end
