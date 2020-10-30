module ApplicationHelper
  TIME_FORMAT = "%I:%M %p".freeze
  DEFAULT_TIMEZONE = "Asia/Kuala_Lumpur".freeze

  def markup(text)
    result = h(text)
    result = Rinku.auto_link(result, :all, 'target="_blank"')
    result.html_safe
  end

  def message_timestamp(timestamp:, time_zone:)
    timestamp.in_time_zone(time_zone || DEFAULT_TIMEZONE).strftime(TIME_FORMAT)
  end
end
