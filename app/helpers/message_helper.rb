module MessageHelper
  TIME_FORMAT = "%I:%M %p".freeze
  DEFAULT_TIMEZONE = "Asia/Kuala_Lumpur".freeze

  def message_timestamp(message:, time_zone:)
    message.created_at.in_time_zone(time_zone || DEFAULT_TIMEZONE).strftime(TIME_FORMAT)
  end
end
