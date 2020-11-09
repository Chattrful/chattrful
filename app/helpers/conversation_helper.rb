module ConversationHelper
  def conversation_latest_timestamp(timestamp:, time_zone:)
    timestamp_in_time_zone = timestamp.in_time_zone(time_zone)
    current_timestamp_in_time_zone = Time.current.in_time_zone(time_zone)

    if timestamp_in_time_zone.to_date == current_timestamp_in_time_zone.to_date
      message_timestamp(timestamp: timestamp, time_zone: time_zone)
    elsif timestamp_in_time_zone.to_date == current_timestamp_in_time_zone.yesterday.to_date
      "yesterday"
    elsif timestamp_in_time_zone.to_date.between?((current_timestamp_in_time_zone - 6.days).to_date, (current_timestamp_in_time_zone - 1.days).to_date)
      timestamp_in_time_zone.strftime("%A")
    else
      timestamp_in_time_zone.strftime("%m/%d/%Y")
    end
  end
end
