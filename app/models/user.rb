class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable,  and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable,
    :trackable, :confirmable

  belongs_to :account

  validates :name, presence: true

  def identifier
    Digest::SHA256.hexdigest("#{Message::SALT}User#{id}")
  end

  before_create :assign_account

  def assign_account
    self.account_id = Account.first.id
  end
end
