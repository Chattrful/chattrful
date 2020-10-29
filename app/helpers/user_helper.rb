module UserHelper
  def user_initials(user:)
    user.name[0].upcase
  end
end
