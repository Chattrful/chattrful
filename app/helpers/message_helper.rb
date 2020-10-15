module MessageHelper
  TIME_FORMAT = "%I:%M %p".freeze
  DEFAULT_TIMEZONE = "Asia/Kuala_Lumpur".freeze

  def message_timestamp(message)
    message.created_at.in_time_zone(message.time_zone || DEFAULT_TIMEZONE).strftime(TIME_FORMAT)
  end
end
