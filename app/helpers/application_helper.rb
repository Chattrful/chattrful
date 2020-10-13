module ApplicationHelper
  def markup(text)
    result = h(text)
    result = Rinku.auto_link(result, :all, 'target="_blank"')
    result.html_safe
  end
end
