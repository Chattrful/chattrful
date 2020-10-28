class Account < ApplicationRecord
  has_many :conversations, dependent: :destroy
end
