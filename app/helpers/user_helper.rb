module UserHelper
  def user_initials(user:)
    user.name[0].upcase
  end

  def user_avatar(user:)
    "<span class='avatar avatar--style-1'>
      #{user_initials(user: user)}
    </span>".html_safe
    # "<span class='avatar'>
    #   #{image_tag("devise/login.png")}
    # </span>".html_safe
  end
end
