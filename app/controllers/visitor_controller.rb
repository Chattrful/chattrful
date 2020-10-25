# frozen_string_literal: true

class VisitorController < ActionController::Base
  before_action :set_account
  before_action :set_visitor

  helper_method :current_account
  helper_method :current_visitor

  def show
  end

  private

  def set_account
    @account ||= Account.find_by_id(params[:account_id] || params[:id])
  end

  def current_account
    @account
  end

  def set_visitor
    @visitor ||= Visitor.find_by_id(session[:visitor_id])
  end

  def current_visitor
    @visitor
  end

  def set_raven_context
    Raven.user_context(
      visitor_id: session[:visitor_id]
    )

    Raven.extra_context(params: params.to_unsafe_h, url: request.url)
  end
end
