# frozen_string_literal: true

class AjaxController < ActionController::Base
  before_action :set_raven_context

  private

  def set_raven_context
    Raven.user_context(visitor_id: session[:visitor_id])
    Raven.extra_context(params: params.to_unsafe_h, url: request.url)
  end
end
