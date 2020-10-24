class VisitorAccountService
  attr_accessor :account, :conversation_id, :time_zone_offset, :visitor_id

  def initialize(account:, conversation_id:, time_zone_offset:, visitor_id:)
    @account = account
    @conversation_id = conversation_id
    @time_zone_offset = time_zone_offset.to_i
    @visitor_id = visitor_id
  end

  def visitor
    @visitor ||= find_visitor || create_visitor
  end

  def conversation
    @conversation ||= find_conversation || create_conversation
  end

  def chattrful_session
    hash = {
      conversation_id: conversation.id,
      visitor_id: visitor.id
    }

    Encryptor.encrypt(hash.to_json)
  end

  private

  def create_visitor
    visitor = Visitor.create
    set_visitor_time_zone(visitor: visitor, time_zone_offset: time_zone_offset)
    visitor
  end

  def find_visitor
    return if visitor_id.blank?

    visitor = Visitor.find_by_id(visitor_id)

    return unless visitor

    set_visitor_time_zone(visitor: visitor, time_zone_offset: time_zone_offset)
    visitor
  end

  def set_visitor_time_zone(visitor:, time_zone_offset:)
    time_zone = ActiveSupport::TimeZone[(time_zone_offset * 60).minutes]&.tzinfo&.name

    if visitor.time_zone_offset != time_zone_offset
      visitor.update_columns(
        time_zone: time_zone || Visitor::DEFAULT_TIME_ZONE,
        time_zone_offset: time_zone_offset
      )
    end
  end

  def find_conversation
    return if conversation_id.blank?

    Conversation.find_by_id(conversation_id)
  end

  def create_conversation
    Conversation.create(account: account)
  end
end
