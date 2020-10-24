Raven.configure do |config|
  config.async = lambda do |event|
    SentryWorker.perform_async(event)
  end

  config.breadcrumbs_logger = [:sentry_logger, :active_support_logger]
  config.dsn = "https://a1e56d8f699842e5ab86393c5562de43@o462444.ingest.sentry.io/5465856"
  config.environments = %w[production]
  config.processors -= [Raven::Processor::PostData]
  config.sanitize_fields = Rails.application.config.filter_parameters.map(&:to_s)
end
