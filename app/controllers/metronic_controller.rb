class MetronicController < ActionController::Base
  def show
    @kt_aside_toggle_state = cookies[:kt_aside_toggle_state]
  end
end
