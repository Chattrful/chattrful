# frozen_string_literal: true

class ApplicationController < ActionController::Base
  helper_method :current_visitor
  before_action :set_raven_context

  private

  def visitor
    @visitor ||= Visitor.find_by_id(session[:visitor_id])
  end

  def current_visitor
    @visitor
  end

  def set_raven_context
    Raven.user_context(
      visitor_id: session[:visitor_id],
      user_id: session[:user_id]
    )

    Raven.extra_context(params: params.to_unsafe_h, url: request.url)
  end
end
