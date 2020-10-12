class Encryptor
  KEY = ActiveSupport::KeyGenerator.new(
    Rails.application.secrets.secret_key_base
  ).generate_key(
    Rails.application.secrets.secret_key_base,
    ActiveSupport::MessageEncryptor.key_len
  ).freeze

  def self.encrypt(string)
    message_encryptor.encrypt_and_sign(string)
  end

  def self.decrypt(string)
    message_encryptor.decrypt_and_verify(string)
  end

  private_class_method

  def self.message_encryptor
    @message_encryptor ||= ActiveSupport::MessageEncryptor.new(KEY)
  end
end
