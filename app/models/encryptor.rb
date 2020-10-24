class Encryptor
  KEY = ActiveSupport::KeyGenerator.new(
    "thisismysecret"
  ).generate_key(
    "thisismysecret",
    ActiveSupport::MessageEncryptor.key_len
  ).freeze

  def self.encrypt(string)
    message_encryptor.encrypt_and_sign(string)
  end

  def self.decrypt(string)
    message_encryptor.decrypt_and_verify(string)
  end

  def self.verify_and_decrypt_session_cookie(cookie:)
    cookie = CGI.unescape(cookie)
    salt = Rails.configuration.action_dispatch.encrypted_cookie_salt
    signed_salt = Rails.configuration.action_dispatch.encrypted_signed_cookie_salt
    key_generator = ActiveSupport::KeyGenerator.new(Rails.application.secret_key_base, iterations: 1000)
    secret = key_generator.generate_key(salt)[0, 32]
    sign_secret = key_generator.generate_key(signed_salt)
    encryptor = ActiveSupport::MessageEncryptor.new(secret, sign_secret, serializer: JSON)

    encryptor.decrypt_and_verify(cookie)
  end

  private_class_method

  def self.message_encryptor
    @message_encryptor ||= ActiveSupport::MessageEncryptor.new(KEY)
  end
end
