# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :set_layout_variables
  before_action :set_raven_context
  helper_method :current_account
  before_action :set_account
  before_action :configure_permitted_parameters, if: :devise_controller?

  private

  def set_raven_context
    Raven.user_context(
      user_id: session[:user_id]
    )

    Raven.extra_context(params: params.to_unsafe_h, url: request.url)
  end

  def set_layout_variables
    @kt_aside_toggle_state = cookies[:kt_aside_toggle_state]
  end

  def set_account
    @account = Account.take
  end

  def current_account
    @account
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end
end
