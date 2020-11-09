module UserHelper
  def user_initials(user:)
    user.name[0].upcase
  end

  def user_avatar(user:)
    "<span class='symbol symbol-lg-35 symbol-25 symbol-light-success symbol-circle'>
      <span class='symbol-label font-size-h5 font-weight-bold'>
        #{user_initials(user: user)}
      </span>
    </span>".html_safe
  end
end
