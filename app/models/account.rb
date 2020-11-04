class Account < ApplicationRecord
  has_many :conversations, dependent: :destroy
  has_many :users
end
