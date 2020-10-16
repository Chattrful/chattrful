# frozen_string_literal: true

class ChatWidgetController < ActionController::Base
  before_action :set_raven_context
  before_action :set_conversation
  before_action :set_visitor
  helper_method :current_user

  private

  def set_conversation
    @account = Account.find_or_create_by({})
    @conversation = Conversation.find_or_create_by(account: @account)
    session[:conversation_id] = @conversation.id
  end

  def set_visitor
    if session[:visitor_id].present?
      @visitor = Visitor.find(session[:visitor_id])
    else
      @visitor = Visitor.create
      session[:visitor_id] = @visitor.id
    end

    cookies.encrypted[:visitor_id] = @visitor.id
  end

  def current_user
    @visitor
  end

  def set_raven_context
    Raven.user_context(visitor_id: session[:visitor_id])
    Raven.extra_context(params: params.to_unsafe_h, url: request.url)
  end
end
