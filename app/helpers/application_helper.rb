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

  def meta_tags
    [
      "<meta charset='utf-8'>",
      "<meta name='google' content='notranslate'>",
      "<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no'>",
      csrf_meta_tags,
      csp_meta_tag,
      action_cable_meta_tag
    ].join.html_safe
  end

  def favicon_tags
    [
      "<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png'>",
      "<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png'>",
      "<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png'>",
      "<link rel='manifest' href='/site.webmanifest'>",
      "<link rel='shortcut icon' href='/favicon.ico'>"
    ].join.html_safe
  end
end
