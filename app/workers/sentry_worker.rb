# frozen_string_literal: true

class SentryWorker < ApplicationWorker
  sidekiq_options queue: "low"

  def perform(event)
    Raven.send_event(event)
  end
end
